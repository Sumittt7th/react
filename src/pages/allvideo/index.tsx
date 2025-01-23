import React from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const AllVideos: React.FC = () => {
  // Sample data for videos
  const videos = [
    { id: 1, title: 'Introduction to React', url: 'http://example.com/video1' },
    { id: 2, title: 'Advanced TypeScript', url: 'http://example.com/video2' },
    // Add more videos as needed
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        All Videos
      </Typography>
      <List>
        {videos.map((video) => (
          <ListItem key={video.id}>
            <ListItemText primary={video.title} secondary={video.url} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AllVideos;
