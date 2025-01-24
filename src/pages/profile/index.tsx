import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"; // Adjust to your store file's path
import { useGetUserByIdQuery } from "../../services/auth.api";
import { Container, Typography, Paper, Box,Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  // Retrieve the user ID from the Redux store
  const { _id: userId, role } = useSelector(
    (state: RootState) => state.auth.user
  );

   if (!userId) {
     return <Typography>Error: User ID is missing.</Typography>;
   }

  // Fetch user details using the ID
  const { data, isLoading, isError } = useGetUserByIdQuery(userId);
   const navigate = useNavigate();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError || !data)
    return <Typography>Error fetching user details!</Typography>;

  const user = data.data; // Access the `data` field inside the response

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box mb={2}>
          <Typography variant="h6">Name:</Typography>
          <Typography>{user.name}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Email:</Typography>
          <Typography>{user.email}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Role:</Typography>
          <Typography>{user.role}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Account Status:</Typography>
          <Typography>{user.active ? "Active" : "Inactive"}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Subscription Status:</Typography>
          <Typography>{user.subscription ? "Active" : "Inactive"}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Created At:</Typography>
          <Typography>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">Updated At:</Typography>
          <Typography>
            {new Date(user.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate(`/${role.toLowerCase()}/editUser`)}
        >
          Edit Profile
        </Button>
      </Paper>
    </Container>
  );
};

export default UserProfile;
