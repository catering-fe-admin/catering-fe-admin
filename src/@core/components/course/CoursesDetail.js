import { useState } from 'react';

import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';

import queries from 'src/consts/queries';
import {
  useEditAdminCourses,
  usePostAdminCourses
} from 'src/hooks/api/useAdminCourses';

import CustomTextField from 'components/mui/text-field';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

import DropdownKindCourses from '../dropdown/DropdownKindCourses';

const CoursesDetail = ({ isEditPage, id, name = '', type = '' }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [values, setValues] = useState({
    name,
    type: {
      value: type
    }
  });

  const { mutate: createCourses } = usePostAdminCourses();
  const { mutate: editCourses } = useEditAdminCourses(id);
  const [disabled, setDisabled] = useState(false);

  const handleChange = (prop) => (event) => {
    const value = event.target.value ?? event;

    setValues({ ...values, [prop]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      ...values,
      type: values?.type?.value
    };

    const mutateFn = isEditPage ? editCourses : createCourses;

    setDisabled(true);
    mutateFn(body, {
      onSuccess: () => {
        setDisabled(false);
        queryClient.removeQueries(queries.adminCourses._def);
        router.push('/courses');
      }
    });
  };

  return (
    <Card>
      <CardHeader title="コース府県/詳細画面" />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={5}>
            {/* Name */}
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                type="text"
                label="コース"
                value={values?.name}
                id="name"
                onChange={handleChange('name')}
              />
            </Grid>

            {/* type */}
            <Grid item xs={12}>
              <DropdownKindCourses
                defaultValue={values?.type}
                value={values?.type}
                onChange={handleChange('type')}
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

export default CoursesDetail;
