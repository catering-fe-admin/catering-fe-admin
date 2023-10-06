import Link from 'next/link';

import CoursesTable from 'components/course/table/CoursesTable';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

const Course = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="品目カテゴリーマスター"
            action={
              <Link href="/courses/create">
                <Button variant="contained" color="info">
                  コース追加
                </Button>
              </Link>
            }
          />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <CoursesTable />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Course;
