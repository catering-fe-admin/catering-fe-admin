// ** React Imports
import { useState } from 'react';
import toast from 'react-hot-toast';

import Image from 'next/image';

// ** Icon Imports
import Icon from 'src/@core/components/icon';
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field';
// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout';
// ** Configs
import themeConfig from 'src/configs/themeConfig';
// ** Hooks
import { useAuth } from 'src/hooks/useAuth';
import AuthIllustrationV1Wrapper from 'src/views/pages/auth/AuthIllustrationV1Wrapper';

import Box from '@mui/material/Box';
// ** MUI Components
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const LoginPage = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false
  });

  // ** Hooks
  const auth = useAuth();
  const theme = useTheme();

  // ** Vars

  const onSubmit = (e) => {
    e.preventDefault();

    auth.login({ username: values.username, password: values.password }, () => {
      toast.error('Invalid username or password');
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Box className="content-center">
      <AuthIllustrationV1Wrapper>
        <Card>
          <CardContent
            sx={{ p: (theme) => `${theme.spacing(10.5, 8, 8)} !important` }}
          >
            <Box
              sx={{
                mb: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Image src="/images/logo.jpg" alt="me" width={184} height={62} />
              <Typography variant="h3" sx={{ ml: 2.5, fontWeight: 700 }}>
                {themeConfig.templateName}
              </Typography>
            </Box>

            <form noValidate autoComplete="off" onSubmit={onSubmit}>
              <CustomTextField
                autoFocus
                fullWidth
                id="username"
                label="ログインID"
                sx={{ mb: 4 }}
                placeholder="000000"
                onChange={handleChange('username')}
              />
              <CustomTextField
                fullWidth
                sx={{ mb: 1.5 }}
                label="パスワード"
                value={values.password}
                id="auth-login-password"
                placeholder="············"
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClickShowPassword}
                        onMouseDown={(e) => e.preventDefault()}
                        aria-label="toggle password visibility"
                      >
                        <Icon
                          fontSize="1.25rem"
                          icon={
                            values.showPassword
                              ? 'tabler:eye'
                              : 'tabler:eye-off'
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 4 }}
              >
                ログイン
              </Button>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationV1Wrapper>
    </Box>
  );
};
LoginPage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
LoginPage.guestGuard = true;

export default LoginPage;
