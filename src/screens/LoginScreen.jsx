
import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import DemoLogin from '../components/DemoLogin';

const LoginScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-sathi-primary">Interview Sathi</h1>
        <p className="mt-2 text-gray-600">Practice interviews with AI</p>
      </div>
      
      <div className="mx-auto w-full max-w-md">
        <LoginForm />
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or</span>
            </div>
          </div>
          
          <div className="mt-6">
            <DemoLogin />
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-sathi-primary hover:underline">Terms of Service</a> and{' '}
            <a href="/privacy" className="text-sathi-primary hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;