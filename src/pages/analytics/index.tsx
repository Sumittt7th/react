import React from 'react';
import { Typography, Box } from '@mui/material';

const Analytics: React.FC = () => {
  // Sample analytics data
  const analyticsData = {
    totalUsers: 100,
    totalVideos: 50,
    viewsPerVideo: [10, 20, 30], // Add more analytics as needed
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Analytics
      </Typography>
      <Typography variant="body1">
        Total Users: {analyticsData.totalUsers}
      </Typography>
      <Typography variant="body1">
        Total Videos: {analyticsData.totalVideos}
      </Typography>
      <Typography variant="body1">
        Views per Video: {analyticsData.viewsPerVideo.join(', ')}
      </Typography>
    </Box>
  );
};

export default Analytics;
