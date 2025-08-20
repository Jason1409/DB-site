// src/components/Modal.jsx
import React from "react";

const Modal = ({ children, onClose, maxWidth = "max-w-3xl" }) => {
  return (
    <div className="fixed inset-0 z-50 bg-teal-200 bg-opacity-70 flex items-center justify-center">
      <div
        className={`bg-amber-500 dark:bg-slate-500 bg-opacity-80 p-6 rounded-lg w-full overflow-y-auto max-h-[90vh] relative ${maxWidth}`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 font-bold text-xl"
        >
          X
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
