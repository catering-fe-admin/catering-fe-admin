import { useState } from 'react';
import DatePicker from 'react-datepicker';

import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import Icon from 'src/@core/components/icon';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { statusList, statusLocale } from 'src/@core/utils/helper';
import queries from 'src/consts/queries';
import {
  useEditAdminBulletins,
  usePostAdminBulletins
} from 'src/hooks/api/useAdminBulletins';

import CustomTextField from 'components/mui/text-field';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import CustomDateInput from './CustomDateInput';
import FileFieldInput from './FileFieldInput';
import { getFormattedFile } from './helper';

const BulletinsDetail = ({ id, defaultValue, docs }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [values, setValues] = useState(
    defaultValue ?? {
      status: 'PRIVATE'
    }
  );

  const { mutate: postBulletins } = usePostAdminBulletins();

  const { mutate: editBulletins } = useEditAdminBulletins(id);

  const handleChange = (prop) => (event) => {
    const listEvent = {
      date: event,
      file1: event?.target?.files?.[0],
      file2: event?.target?.files?.[0],
      file3: event?.target?.files?.[0]
    };

    const eventValue = [...Object.keys(listEvent)].find((e) =>
      prop.includes(e)
    );
    const value = eventValue ? listEvent[prop] : event?.target?.value;

    setValues({ ...values, [prop]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { subject, content, date, status, file1, file2, file3 } = values;

    const formattedDocs = [
      getFormattedFile('file1', file1, docs),
      getFormattedFile('file2', file2, docs),
      getFormattedFile('file3', file3, docs)
    ]?.filter((e) => e);

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('content', content);
    formData.append('date', dayjs(date).format('YYYY-MM-DD'));
    formData.append('status', status);
    formattedDocs.forEach((item, index) => {
      item.id && formData.append(`docs[${index}].id`, item.id);
      item.position &&
        formData.append(`docs[${index}].position`, item.position);
      item.file && formData.append(`docs[${index}].file`, item.file);
    });

    const mutateFn = id ? editBulletins : postBulletins;

    mutateFn(formData, {
      onSuccess: () => {
        queryClient.removeQueries(queries.adminBulletins._def);
        router.push('/bulletins');
      }
    });
  };

  return (
    <Card>
      <CardHeader title="掲示板管理/詳細画面" />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={5}>
            {/* Status */}
            <Grid item xs={12}>
              <FormGroup
                row
                value={values?.status}
                aria-label="status"
                name="status"
                onChange={handleChange('status')}
              >
                {statusList?.map((status, idx) => (
                  <FormControlLabel
                    key={idx}
                    label={statusLocale[status]}
                    value={status}
                    control={<Checkbox checked={status == values?.status} />}
                  />
                ))}
              </FormGroup>
            </Grid>

            {/* Date */}
            <Grid item xs={3}>
              <DatePickerWrapper>
                <DatePicker
                  isClearable
                  selected={values?.date}
                  showYearDropdown
                  showMonthDropdown
                  dateFormat="yyyy/MM/dd"
                  placeholderText="YYYY/MM/DD"
                  customInput={<CustomDateInput fullWidth />}
                  id="date"
                  onChange={handleChange('date')}
                  clearIcon={
                    <IconButton edge="end" onClick={handleChange('date')}>
                      <Icon fontSize="1.25rem" icon="ic:baseline-clear" />
                    </IconButton>
                  }
                />
              </DatePickerWrapper>
            </Grid>

            {/* Subject */}
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                type="text"
                label="タイトル"
                value={values?.subject}
                id="subject"
                onChange={handleChange('subject')}
              />
            </Grid>

            {/* Content */}
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                rows={9}
                multiline
                label="本文"
                value={values?.content}
                id="content"
                onChange={handleChange('content')}
              />
            </Grid>

            {/* File Field Input */}
            <FileFieldInput
              fileId="file1"
              label="ファイル1"
              value={values?.file1}
              onChange={handleChange('file1')}
            />
            <FileFieldInput
              fileId="file2"
              label="ファイル2"
              value={values?.file2}
              onChange={handleChange('file2')}
            />
            <FileFieldInput
              fileId="file3"
              label="ファイル3"
              value={values?.file3}
              onChange={handleChange('file3')}
            />

            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                保存
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default BulletinsDetail;
