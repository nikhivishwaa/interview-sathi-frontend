import React, { useState } from 'react';
import Ragistration from '../components/Ragistration';
import UserLogin from '../components/UserLogin';
import LoginRagistrationImage from '../assets/react.svg';


const TabPanel = ({ children, value, index }) => {
  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

const LoginReg = () => {
  const [value, setValue] = useState(0);

  return (
    <>
    {/* <div 
        className="flex flex-col justify-between min-h-screen bg-cover bg-center" 
        
      ></div> */}
      <div className='flex flex-col  justify-between bg-gradient-to-r from-gray-300 to-gray-200' >
        <div className='flex flex-wrap w-full min-h-[670px]'>
          {/* Left Side - Image */}

          <div className='w-full md:w-1/2 flex justify-center  p-6 rounded-r-lg shadow-lg'>
            <div className='w-full max-w-md'>
              {/* Tabs */}
              <div className='flex justify-center mb-4'>
                <button
                  className={`w-1/2 py-2 text-lg font-semibold ${value === 0 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                  onClick={() => setValue(0)}>
                  Registration
                </button>
                <button
                  className={`w-1/2 py-2 text-lg font-semibold ${value === 1 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                  onClick={() => setValue(1)}>
                  Login
                </button>
              </div>

              {/* Tab Content */}
              <TabPanel value={value} index={0}>
                <Ragistration />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <UserLogin />
              </TabPanel>
            </div>
          </div>

          {/* Right Side - Login & Registration */}
          {/* 
          <div className='hidden md:block md:w-1/2 bg-cover bg-center rounded-l-lg'
            style={{ backgroundImage: `url(${LoginRagistrationImage})` }}>
          </div> */}

          <div className="hidden md:flex md:w-1/2 pt-24 justify-center bg-gray-100 rounded-l-lg">
            <img
              src={LoginRagistrationImage}
              alt="Login Registration"
              className="w-90 h-90 animate-spin-slow"
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default LoginReg;
