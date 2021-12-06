import { Bar } from 'react-chartjs-2';
import { useContext, useState } from 'react';
import axios from 'axios';
import {
  Avatar,
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CarIcon from '@material-ui/icons/DriveEta';

const RealTimeMonitoring = ({
  vehicleWaiting,
  setVehicleWaiting,
  licensePlate,
  setLastVehicle
}) => {
  const theme = useTheme();

  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);
  const [formData, setFormData] = useState({
    plate: '',
    color: '',
    brand: '',
    model: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    text: '',
    severity: 'success'
  });

  const handleRegister = async ({ plate, color, brand, model }) => {
    const vehicle = await axios.post(
      'https://smart-access-api.herokuapp.com/vehicles',
      {
        plate,
        color,
        brand,
        model
      }
    );

    setRegistrationComplete(true);
    if (vehicle.status === 200) {
      setRegisterForm(false);
      setSnackbar({
        open: true,
        text: 'Vehicle registered, you can now grant access',
        severity: 'success'
      });
    } else {
      setSnackbar({
        open: true,
        text: 'Something went wrong, please try again later',
        severity: 'error'
      });
    }
  };

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [18, 5, 19, 27, 29, 19, 20],
        label: 'This year',
        maxBarThickness: 10
      },
      {
        backgroundColor: colors.grey[200],
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [11, 20, 12, 29, 30, 25, 13],
        label: 'Last year',
        maxBarThickness: 10
      }
    ],
    labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug']
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card>
      <CardHeader title="Real Time Monitoring" />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.text}
        </Alert>
      </Snackbar>
      <Dialog open={registerForm} onClose={() => setRegisterForm(false)}>
        <DialogTitle>Register Vehicle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="plate"
            label="License Plate"
            fullWidth
            variant="standard"
            value={licensePlate}
            disabled="true"
          />
          <TextField
            autoFocus
            margin="dense"
            id="color"
            label="Color"
            fullWidth
            variant="standard"
            onInput={(e) => {
              setFormData({ ...formData, color: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="brand"
            label="Brand"
            fullWidth
            variant="standard"
            onInput={(e) => {
              setFormData({ ...formData, brand: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="model"
            label="Model"
            fullWidth
            variant="standard"
            onInput={(e) => {
              setFormData({ ...formData, model: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRegisterForm(false)}>Cancel</Button>
          <Button
            onClick={() => handleRegister({ ...formData, plate: licensePlate })}
          >
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {vehicleWaiting ? (
            <Grid
              container
              spacing={3}
              sx={{
                justifyContent: 'space-around'
              }}
            >
              <Grid item md={12} sx={{ textAlign: 'center' }}>
                <Typography color="#39e991" gutterBottom variant="h3">
                  Unknown vehicle waiting to access
                </Typography>
              </Grid>
              <Grid item md={12} />
              <Grid item md={12} />
              <Grid item md={12} />
              <Grid item md={3}>
                <Typography color="textSecondary" gutterBottom variant="h6">
                  LICENSE PLATE:
                </Typography>
                <Typography color="textPrimary" variant="h1">
                  {licensePlate}
                </Typography>
              </Grid>
              <Grid item md={1}>
                <Avatar
                  sx={{
                    backgroundColor: '#39e991',
                    height: 86,
                    width: 86
                  }}
                >
                  <CarIcon />
                </Avatar>
              </Grid>
              <Grid item md={12} />
              <Grid item md={12} />

              <Grid item md={4} />
              {!registrationComplete ? (
                <>
                  <Grid item md={2}>
                    <Button
                      size="large"
                      sx={{ backgroundColor: '#e53935' }}
                      variant="contained"
                      onClick={() => setVehicleWaiting(false)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item md={2}>
                    <Button
                      size="large"
                      sx={{ backgroundColor: '#39e991' }}
                      variant="contained"
                      onClick={() => setRegisterForm(true)}
                    >
                      Start Register
                    </Button>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item md={1} />
                  <Grid item md={2}>
                    <Button
                      size="large"
                      sx={{ backgroundColor: '#39e991' }}
                      variant="contained"
                      onClick={async () => {
                        setVehicleWaiting(false);
                        setRegistrationComplete(false);
                        setSnackbar({
                          open: true,
                          severity: 'success',
                          text: 'Access Granted!'
                        });
                        await axios.post(
                          'https://smart-access-api.herokuapp.com/access',
                          {
                            plate: licensePlate
                          }
                        );
                      }}
                    >
                      Grant Access
                    </Button>
                  </Grid>
                  <Grid item md={1} />
                </>
              )}
              <Grid item md={4} />
            </Grid>
          ) : (
            <Typography
              align="center"
              color="textSecondary"
              gutterBottom
              variant="h2"
            >
              No vehicles waiting
            </Typography>
          )}
        </Box>
      </CardContent>
      {/* <Divider /> */}
    </Card>
  );
};

export default RealTimeMonitoring;
