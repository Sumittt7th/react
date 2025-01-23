import React from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const AllUsers: React.FC = () => {
  // Sample data for users
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // Add more users as needed
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        All Users
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
     
    </Box>
  );
};

export default AllUsers;
