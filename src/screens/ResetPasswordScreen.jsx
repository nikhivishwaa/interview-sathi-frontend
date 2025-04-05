import React from 'react';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';

const ResetPasswordScreen= () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-sathi-primary">Interview Sathi</h1>
        <p className="mt-2 text-gray-600">Set your new password</p>
      </div>
      
      <div className="mx-auto w-full max-w-md">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordScreen;