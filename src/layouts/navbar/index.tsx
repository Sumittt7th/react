import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Link } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/store'; 
import { resetTokens } from '../../store/reducers/authReducer'; 
import { clearTokens } from '../../utils/auth'; 
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../services/auth.api'; 
import { toast } from 'react-toastify'; 

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth); 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation(); 

  const handleLogout = async () => {
    try {
     
      await logout().unwrap();

     
      dispatch(resetTokens());

      
      clearTokens();
      toast.success("Logout SucessFully")
      
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" component="div">
              <Link href="/" color="inherit" underline="none">
                MyWebsite
              </Link>
            </Typography>
          </Grid>

          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button color="inherit" href="/">Home</Button>
              </Grid>
              <Grid item>
                <Button color="inherit" href="/about">About</Button>
              </Grid>
              <Grid item>
                <Button color="inherit" href="/contact">Contact</Button>
              </Grid>
              <Grid item>
                {isAuthenticated ? (
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <Button color="inherit" href="/login">
                    Login
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
