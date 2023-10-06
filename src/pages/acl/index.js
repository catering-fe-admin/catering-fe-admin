// ** React Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
// ** MUI Imports
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const ACLPage = () => {
  // ** Hooks

  return (
    <Grid container spacing={6}>
      <Grid item md={6} xs={12}>
        <Card>
          <CardHeader title="Common" />
          <CardContent>
            <Typography sx={{ mb: 4 }}>
              No ability is required to view this card
            </Typography>
            <Typography sx={{ color: 'primary.main' }}></Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
ACLPage.acl = {
  action: 'read',
  subject: 'acl-page'
};

export default ACLPage;
