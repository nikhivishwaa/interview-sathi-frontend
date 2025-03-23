import React from 'react';
import instagrame from '../assets/instagram.png';
import linkedin from '../assets/linkedin.png';
import twitter from '../assets/twitter.png';
import github from '../assets/github.png';

const Footer = () => {
  return (
    <div className="h-full bg-gradient-to-r from-blue-950 to-gray-800 px-6 sm:px-8 md:px-20 py-12 md:py-20 border-t border-[#F7F7F821] text-center md:text-left font-plusJakartaSans text-white">
      <div className="md:flex md:justify-between md:items-start">
        {/* Left Section */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h4 className="text-2xl font-bold font-allertaStencil">AI-Interviewer </h4>
          <p className="text-sm text-[#E0DFFF] w-full md:w-4/5 my-6 text-justify md:text-left">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium atque quia modi. Beatae quos eveniet, excepturi asperiores at architecto 
          </p>
          {/* Social Media Icons */}
          <div className="flex gap-4 justify-center md:justify-start items-center">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img width={40} src={instagrame} alt="Instagram" className="cursor-pointer transform hover:scale-110 transition duration-300" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <img width={40} src={github} alt="GitHub" className="cursor-pointer transform hover:scale-110 transition duration-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img width={40} src={twitter} alt="Twitter" className="cursor-pointer transform hover:scale-110 transition duration-300" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img width={40} src={linkedin} alt="LinkedIn" className="cursor-pointer transform hover:scale-110 transition duration-300" />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-around w-full md:w-1/2 text-sm text-[#E0DFFF]">
          {/* Company Links */}
          <div>
            <h5 className="mb-4 md:mb-8 font-bold text-lg">Company</h5>
            <div className="flex flex-col leading-8 cursor-pointer">
              <a className="hover:text-gray-300 transition duration-300 text-black font-bold" href="/">Home</a>
              <a className="hover:text-gray-300 transition duration-300 text-black font-bold" href="/">About</a>
              <a className="hover:text-gray-300 transition duration-300 text-black font-bold" href="/">Product</a>
            </div>
          </div>
          {/* Contact Links */}
          <div>
            <h5 className="mb-4 md:mb-8 font-bold text-lg">Contact</h5>
            <div className="flex flex-col leading-8 cursor-pointer">
              <a className="hover:text-gray-300 transition duration-300 text-black font-bold" href="/contact-us">Email Us</a>
              <a className="hover:text-gray-300 transition duration-300 text-black font-bold" href="#">Support</a>
            </div>
          </div>
          {/* Product Links */}
          <div>
            <h5 className="mb-4 md:mb-8 font-bold text-lg">Product</h5>
            <div className="flex flex-col leading-8 cursor-pointer">
              <a className="hover:text-gray-300 transition duration-300 text-black font-bold" href="/">Pricing</a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-white mt-10 pt-6 text-sm text-[#E0DFFF] flex justify-center items-center md:justify-between">
        <p className="mb-2 md:mb-0">© {new Date().getFullYear()} AI-Interviewerm. All rights reserved.</p>
        <p className="text-sm">
          Designed with <span className="text-red-400">♥</span> by AI-Interviewer Team
        </p>
      </div>
    </div>
  );
};

export default Footer;
