import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';

const UserDashboard: React.FC = () => {
  // Example data for a user dashboard
  const videoCount = 45;
  const activeStatus = "Active";
  const subscriptionStatus = "Premium";
  const totalWatchTime = "150 hours";

  return (
    <Box
      component="main"
      sx={{
        padding: 3,
        marginTop: '64px',
        bgcolor: 'background.default',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to the User Dashboard
      </Typography>

      <Typography variant="h6" paragraph>
        As a user, you can view your videos, track your watch time, and manage your account. Below are some key details about your account:
      </Typography>

      {/* User Stats Grid */}
      <Grid container spacing={3}>
        {/* Video Count */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Videos</Typography>
            <Typography variant="h4" color="primary">{videoCount}</Typography>
          </Paper>
        </Grid>

        {/* Active Status */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Account Status</Typography>
            <Typography variant="h4" color="primary">{activeStatus}</Typography>
          </Paper>
        </Grid>

        {/* Subscription Status */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Subscription</Typography>
            <Typography variant="h4" color="primary">{subscriptionStatus}</Typography>
          </Paper>
        </Grid>

        {/* Total Watch Time */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Watch Time</Typography>
            <Typography variant="h4" color="primary">{totalWatchTime}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ marginTop: 4 }}>
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
          View My Videos
        </Button>
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
          Manage Profile
        </Button>
        <Button variant="contained" color="primary">
          View Subscription Details
        </Button>
      </Box>
    </Box>
  );
};

export default UserDashboard;
