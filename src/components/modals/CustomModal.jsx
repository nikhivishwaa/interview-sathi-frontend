import React from "react";

function CustomModal({children, isOpen, setIsOpen, selectedResume}) {
  return (
    <div className="fixed inset-0 bg-[#d1d5dcf2] bg-opacity-75 transition-opacity z-50 overflow-y-scroll py-5">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
