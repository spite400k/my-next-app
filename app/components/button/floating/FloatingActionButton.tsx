import React from 'react';

type FloatingActionButtonProps = {
  onClick: () => void;
  icon: JSX.Element;
};

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className="
        fixed 
        bottom-24
        right-3 
        w-16 
        h-16 
        bg-blue-500 
        hover:bg-blue-600 
        text-white 
        rounded-full 
        shadow-lg 
        flex 
        items-center 
        justify-center
        transition-transform 
        transform 
        hover:scale-110
        focus:outline-none
      "
    >
      {icon}
    </button>
  );
};

export default FloatingActionButton;
