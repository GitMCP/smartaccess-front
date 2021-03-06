import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert
} from '@material-ui/core';
import { loginContext } from '../App';

const Login = () => {
  const navigate = useNavigate();

  const { isLogged, setIsLogged } = useContext(loginContext);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const submitLogin = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const loginRequest = await axios.post(
        'https://smart-access-api.herokuapp.com/login',
        {
          email,
          password
        }
      );

      if (loginRequest.status === 200) {
        setIsLogged(true);
        localStorage.setItem('isLogged', true);
      }
    } catch (err) {
      setLoginError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setLoginError(false)}
        open={loginError}
        message="I love snacks"
        key="topcenter"
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Invalid credentials!
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
              submitLogin(values);
              setSubmitting(false);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
