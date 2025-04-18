import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const API = import.meta.env.VITE_BACKEND || 'http://localhost:8000';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = secureLocalStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(undefined);
    try {
      const response = await axios.post(`${API}/users/login/`, { email, password });
      const { access, refresh, user } = response.data.data;
      secureLocalStorage.setItem('token', access);
      secureLocalStorage.setItem('refresh_token', refresh);

      // const userResponse = await axios.get(`${API}/users/profile/`, {
      //   headers: { Authorization: `Bearer ${access}` },
      // });

      // const userData = userResponse.data.d;
      // setUser(userData);
      setUser(user);
      secureLocalStorage.setItem('user', JSON.stringify(user));
      toast.success(`Welcome back, ${user.first_name}!`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials. Please try again.');
      toast.error('Invalid credentials. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginDemo = async () => {
    try {
      setLoading(true);
      setError(undefined);
      
      const { DEMO_USER } = await import('../utils/demoAccount');

      const demoUser = {
        id: DEMO_USER.id,
        email: DEMO_USER.email,
        firstName: DEMO_USER.first_name,
        lastName: 'User',
        phone: DEMO_USER.phone,
        college: DEMO_USER.college
      };

      await new Promise(resolve => setTimeout(resolve, 1000));

      setUser(demoUser);
      secureLocalStorage.setItem('user', JSON.stringify(demoUser));
      secureLocalStorage.setItem('token', 'demo-token');
      toast.success(`Welcome, ${demoUser.firstName}!`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Demo login error:', error);
      setError('Failed to login with demo account.');
      toast.error('Failed to login with demo account.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(undefined);
    try {
      await axios.post(`${API}/users/signup/`, userData);
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please check your information.');
      toast.error('Registration failed. Please check your information.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    secureLocalStorage.removeItem('user');
    secureLocalStorage.removeItem('token');
    secureLocalStorage.removeItem('refresh_token');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    setError(undefined);
    try {
      await axios.post(`${API}/users/password/reset/`, { email });
      toast.success('Password reset email sent!');
    } catch (error) {
      console.error('Forgot password error:', error);
      setError('Failed to send reset email.');
      toast.error('Failed to send reset email.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, password) => {
    setLoading(true);
    setError(undefined);
    try {
      await axios.post(`${API}/users/password/reset/confirm/`, { token, password });
      toast.success('Password reset successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Reset password error:', error);
      setError('Failed to reset password.');
      toast.error('Failed to reset password.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    loginDemo,
    register,
    logout,
    forgotPassword,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
