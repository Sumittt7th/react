import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';

const AdminDashboard: React.FC = () => {
  // Example data that could be fetched from an API
  const userCount = 1200;
  const videoCount = 350;
  const activeUsers = 850;
  const totalRevenue = "$10,500";

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
        Welcome to the Admin Dashboard
      </Typography>

      <Typography variant="h6" paragraph>
        As an admin, you can manage the platform's users, view analytics, and upload videos. Below are some key statistics:
      </Typography>

      {/* Dashboard Stats Grid */}
      <Grid container spacing={3}>
        {/* User Count */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4" color="primary">{userCount}</Typography>
          </Paper>
        </Grid>

        {/* Video Count */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Videos</Typography>
            <Typography variant="h4" color="primary">{videoCount}</Typography>
          </Paper>
        </Grid>

        {/* Active Users */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Active Users</Typography>
            <Typography variant="h4" color="primary">{activeUsers}</Typography>
          </Paper>
        </Grid>

        {/* Revenue */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4" color="primary">{totalRevenue}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ marginTop: 4 }}>
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
          Manage Users
        </Button>
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
          Upload Video
        </Button>
        <Button variant="contained" color="primary">
          View Analytics
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
