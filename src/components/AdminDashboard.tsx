import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../layouts/sidebar';

const AdminDashboard: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role="ADMIN" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          padding: 3,
          marginTop: '64px',
          marginLeft: '250px',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
