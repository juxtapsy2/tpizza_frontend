import React from "react";

const LoadingEffect = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-green-950 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
        <div className="w-16 h-16 border-4 border-t-green-600 border-r-green-600 border-transparent rounded-full animate-spin-and-scale shadow-xl"></div>
      </div>

      <style>
        {`
          @keyframes spin-and-scale {
            0% {
              transform: rotate(0deg) scale(1);
              border-width: 3px;
            }
            50% {
              transform: rotate(180deg) scale(1.2);
              border-width: 1px;
            }
            100% {
              transform: rotate(360deg) scale(1);
              border-width: 3px;
            }
          }

          .animate-spin-and-scale {
            animation: spin-and-scale 1s ease-in-out infinite;
          }
        `}
      </style>
    </>
  );
};

export default LoadingEffect;
