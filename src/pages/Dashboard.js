import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { SocketContext } from 'src/context/socket';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Snackbar,
  Alert,
  AlertTitle
} from '@material-ui/core';
import Budget from '../components/dashboard/Budget';
import LastVehicle from '../components/dashboard/LastVehicle';
import LatestOrders from '../components/dashboard/LatestOrders';
// import LatestProducts from '../components/dashboard/LatestProducts';
import RealTimeMonitoring from '../components/dashboard/RealTimeMonitoring';
// import TasksProgress from '../components/dashboard/TasksProgress';
// import TotalCustomers from '../components/dashboard/TotalCustomers';
// import TotalProfit from '../components/dashboard/TotalProfit';
import TrafficByDevice from '../components/dashboard/TrafficByDevice';

export const unknownVehicleContext = createContext({
  setVehicleWaiting: () => {}
});

const Dashboard = () => {
  const socket = useContext(SocketContext);

  const [vehicleWaiting, setVehicleWaiting] = useState(false);
  const [licensePlate, setlicensePlate] = useState('');
  const [lastVehicle, setLastVehicle] = useState({
    plate: 'Loading...',
    model: 'Loading...'
  });
  const [accessNotification, setAccessNotification] = useState({
    show: false,
    plate: '',
    model: ''
  });

  useEffect(() => {
    axios.get('https://smart-access-api.herokuapp.com/access?last=true');
  }, []);
  useEffect(() => {
    socket.on('UNKNOWN_VEHICLE', (data) => {
      setVehicleWaiting(true);
      setlicensePlate(data);
    });

    socket.on('LAST_VEHICLE', (data) => {
      setLastVehicle(data);
      setAccessNotification({
        show: true,
        plate: data.plate,
        model: data.model
      });
    });
  });
  return (
    <>
      <Helmet>
        <title>Dashboard | Material Kit</title>
      </Helmet>
      <Snackbar
        open={accessNotification.show}
        autoHideDuration={5000}
        onClose={() => {
          setAccessNotification({ show: false });
        }}
        TransitionComponent="Fade"
        key="access-notification"
      >
        <Alert severity="info">
          <AlertTitle>Known vehicle accessed:</AlertTitle>
          License Plate: {accessNotification.plate} Model:
          {accessNotification.model}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            {/* <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget />
          </Grid> */}
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <LastVehicle
                licensePlate={lastVehicle.plate}
                vehicleModel={lastVehicle.model}
              />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              {/* <TasksProgrereact/prop-types
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            {/* <TotalProfit sx={{ height: '100%' }} /> */}
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <RealTimeMonitoring
                sx={{ height: '100%' }}
                vehicleWaiting={vehicleWaiting}
                licensePlate={licensePlate}
                setVehicleWaiting={setVehicleWaiting}
                setLastVehicle={setLastVehicle}
              />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <TrafficByDevice sx={{ height: '100%' }} />
            </Grid>
            {/* <Grid item lg={4} md={6} xl={3} xs={12}> */}
            {/* <LatestProducts sx={{ height: '100%' }} /> */}
            {/* </Grid> */}
            <Grid item lg={8} md={12} xl={9} xs={12}>
              {/* <LatestOrders /> */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
