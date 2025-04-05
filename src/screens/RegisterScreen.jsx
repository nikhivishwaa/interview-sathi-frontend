import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-sathi-primary">Interview Sathi</h1>
        <p className="mt-2 text-gray-600">Create your account to get started</p>
      </div>
      
      <div className="mx-auto w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterScreen;