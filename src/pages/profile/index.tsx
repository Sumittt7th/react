import React from 'react';
import { Typography, Box } from '@mui/material';

const Profile: React.FC = () => {
  // Sample user profile data
  const userProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'ADMIN',
    // Add more profile details as needed
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1">
        Name: {userProfile.name}
      </Typography>
      <Typography variant="body1">
        Email: {userProfile.email}
      </Typography>
      <Typography variant="body1">
        Role: {userProfile.role}
      </Typography>
    </Box>
  );
};

export default Profile;
