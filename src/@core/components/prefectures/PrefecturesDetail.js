import { useState } from 'react';

import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';

import queries from 'src/consts/queries';
import {
  useEditAdminPrefectures,
  usePostAdminPrefectures
} from 'src/hooks/api/useAdminPrefectures';

import CustomTextField from 'components/mui/text-field';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

const PrefecturesDetail = ({ isEditPage, id, name = '', prefix = '' }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [values, setValues] = useState({
    name,
    prefix
  });

  const { mutate: createPrefectures } = usePostAdminPrefectures();
  const { mutate: editPrefectures } = useEditAdminPrefectures(id);
  const [disabled, setDisabled] = useState(false);

  const handleChange = (prop) => (event) => {
    const value = event.target.value;

    setValues({ ...values, [prop]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const body = { ...values };

    const mutateFn = isEditPage ? editPrefectures : createPrefectures;

    setDisabled(true);
    mutateFn(body, {
      onSuccess: () => {
        setDisabled(false);
        queryClient.removeQueries(queries.adminPrefectures._def);
        router.push('/prefectures');
      }
    });
  };

  return (
    <Card>
      <CardHeader title="都道府県/詳細画面" />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={5}>
            {/* Name */}
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                type="text"
                label="タイトル"
                value={values?.name}
                id="name"
                onChange={handleChange('name')}
              />
            </Grid>

            {/* Prefix */}
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                type="text"
                label="接頭"
                value={values?.prefix}
                id="prefix"
                onChange={handleChange('prefix')}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" disabled={disabled}>
                保存
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default PrefecturesDetail;
