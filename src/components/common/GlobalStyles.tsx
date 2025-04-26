import React from 'react';

const GlobalStyles: React.FC = () => {
  return (
    <style jsx global>{`
      /* Custom scrollbar styles */
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(99, 102, 241, 0.1);
        border-radius: 4px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(99, 102, 241, 0.5);
        border-radius: 4px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(99, 102, 241, 0.7);
      }

      /* Custom input styles */
      .custom-input {
        background-color: rgba(30, 27, 75, 0.3);
        border: 1px solid rgba(99, 102, 241, 0.2);
        transition: all 0.2s ease;
      }
      
      .custom-input:focus {
        border-color: rgba(99, 102, 241, 0.5);
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
      }
      
      /* Animations */
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes slideUp {
        from {
          transform: translateY(10px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-in-out;
      }
      
      .animate-slideUp {
        animation: slideUp 0.3s ease-in-out;
      }
    `}</style>
  );
};

export default GlobalStyles; 