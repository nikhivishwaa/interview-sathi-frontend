import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <>
      <div className="bg-[#f5f7fa]">
        <div className="flex justify-center items-center min-h-screen p-4">
          
          <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-5xl">
          <h1 className="text-2xl ">Here, Drop Your Message </h1>
          <hr className='mb-6'/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              

              {/* Contact Form */}
              <div>
                <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-8">
                  We are deeply committed to delivering unparalleled service and unwavering support to ensure your experience exceeds expectations.
                </p>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 text-sm">First Name <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="First Name" className="w-full p-2 border border-gray-300 rounded mt-1 text-sm" />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm">Last Name <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Last Name" className="w-full p-2 border border-gray-300 rounded mt-1 text-sm" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm">Email <span className="text-red-500">*</span></label>
                    <input type="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded mt-1 text-sm" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm">Description <span className="text-red-500">*</span></label>
                    <textarea placeholder="Message" className="w-full p-2 border border-gray-300 rounded mt-1 text-sm"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300 text-sm">
                    Submit
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                <div className="bg-blue-600 text-white p-3 rounded-lg flex items-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xl mr-3" />
                  <div className="text-sm px-2">
                    <h3 className="font-bold text-xl">Address</h3>
                    <p>3680 Schamberger Pass, North Catalina 01984-8381</p>
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg flex items-center">
                  <FontAwesomeIcon icon={faPhoneAlt} className="text-xl text-blue-600 mr-3" />
                  <div className="text-sm px-2">
                    <h3 className="font-bold text-xl">Contact</h3>
                    <p>Talk to us and see how we can work<br />1800-14-0147</p>
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg flex items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="text-xl text-blue-600 mr-3" />
                  <div className="text-sm px-2">
                    <h3 className="font-bold text-xl">Email</h3>
                    <p>We're usually replying within 24 hours<br />pagedone1234@gmail.com</p>
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg flex items-center">
                  <FontAwesomeIcon icon={faClock} className="text-xl text-blue-600 mr-3" />
                  <div className="text-sm px-2">
                    <h3 className="font-bold text-xl">Working Hours</h3>
                    <p>Mon To Sat - 10 am to 7 pm<br />Sunday - 11 am To 5 pm</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Contact;
