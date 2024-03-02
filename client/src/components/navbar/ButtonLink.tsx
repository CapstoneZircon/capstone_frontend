// ButtonLink.jsx
import React, { ReactNode,useState } from 'react';
import { Link } from 'react-router-dom';

interface ButtonLinkProps {
  to: string;
  onClick?: () => void;
  activeClass?: string;
  className?: string;
  children?: ReactNode;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ to, onClick, children, activeClass, className}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={to} onClick={onClick}>
      <button
        className={`flex justify-center items-center w-[149px] h-[129px] ${activeClass || ''}  hover:bg-opacity-50 transition-colors duration-100 ${className || ''}`}>
      {children}
      </button>
    </Link>
  );
};

export default ButtonLink;
