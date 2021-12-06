import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CarIcon from '@material-ui/icons/DriveEta';
import { red } from '@material-ui/core/colors';

const LastVehicle = ({ licensePlate, vehicleModel }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            LAST VEHICLE
          </Typography>
          <Typography color="textPrimary" variant="h3">
            {licensePlate}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: red[600],
              height: 56,
              width: 56
            }}
          >
            <CarIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          Model:
        </Typography>
        <Typography color="textSecondary" variant="caption">
          {vehicleModel}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default LastVehicle;
