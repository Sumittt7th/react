import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Typography, Paper } from "@mui/material";
import { useLoginMutation, useSignUpMutation } from "../../services/auth.api";
import { useAppDispatch } from "../../store/store";
import { setTokens } from "../../store/reducers/authReducer";
import { saveTokens } from "../../utils/auth";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
  name?: string; // Used for signup
}

const AuthPage: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'login' | 'signup'>('login');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormData>();

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [signup, { isLoading: signupLoading }] = useSignUpMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (activeForm === 'login') {
      try {
        const response = await login({ email: data.email, password: data.password }).unwrap();
        dispatch(setTokens(response.data));
        saveTokens(response.data.accessToken, response.data.refreshToken, response.data.role);

        toast.success("Login Successfully");

        // Navigate based on role
        if (response.data.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Login failed. Please try again.");
      }
    } else if (activeForm === 'signup') {
      try {
        await signup({ name: data.name!, email: data.email, password: data.password }).unwrap();
        toast.success("Signup Successful. Please login.");
        setActiveForm('login'); // Switch to login form after successful signup
      } catch (error) {
        console.error("Signup failed:", error);
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '2rem', maxWidth: 400, margin: '2rem auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        {activeForm === 'login' ? 'Login' : 'Sign Up'}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {activeForm === 'signup' && (
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            {...register("name")}
          />
        )}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email")}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password")}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          {activeForm === 'login' ? 'Login' : 'Sign Up'}
        </Button>
      </form>

      <Typography align="center" style={{ marginTop: '1rem' }}>
        {activeForm === 'login' ? (
          <span>
            Don't have an account?{" "}
            <button onClick={() => setActiveForm('signup')}>Sign Up</button>
          </span>
        ) : (
          <span>
            Already have an account?{" "}
            <button onClick={() => setActiveForm('login')}>Login</button>
          </span>
        )}
      </Typography>
    </Paper>
  );
};

export default AuthPage;
