import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-tailwind/react'; // Import Tooltip from material-tailwind

interface ButtonLinkProps {
  to: string;
  onClick?: () => void;
  activeClass?: string;
  className?: string;
  children?: ReactNode;
  tooltipContent?: string; // Add a new prop for tooltip content
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  to,
  onClick,
  children,
  activeClass,
  className,
  tooltipContent, // Destructure tooltipContent
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tooltip content={tooltipContent || ''} placement="right" className='bg-opacity-80'>
      <Link to={to} onClick={onClick}>
        <button
          className={`flex justify-center items-center w-[149px] h-[129px] ${activeClass || ''} hover:bg-light-gray hover:bg-opacity-50 transition-colors duration-200 ${className || ''}`}>
          {children}
        </button>
      </Link>
    </Tooltip>
  );
};

export default ButtonLink;
