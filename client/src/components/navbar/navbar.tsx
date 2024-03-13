import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ButtonLink from './ButtonLink';
import LogoutModal from './LogoutModal';
import { Tooltip } from "@material-tailwind/react";

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

	const getButtonClass = (path: any) => {
		return location.pathname.startsWith(path) ? "bg-white text-red-500 hover:bg-none" : "bg-none text-white hover:bg-light-gray";
		// return location.pathname === path ? "bg-dark-gray" : "bg-mid-gray";
	};
	const handleLogout = async () => {
		try {
		  const response = await fetch('http://localhost:8080/api/signout', {
			method: 'POST',
		
		  });
	  
		  if (response.ok) {
			console.log("logout ok")
			// Sign-out successful
			setLogoutModalOpen(false);
			navigate("/");
		  } else {
			// Handle sign-out failure
			const errorData = await response.json();
			console.error('Failed to sign out:', errorData.error);
		  }
		} catch (error) {
		  console.error('Error logging out:', error);
		}
	  };
	  
	return (
		<nav
			id="SideBar"
			className="flex flex-col fixed h-full w-[149px] bg-gradient-to-b from-[#ED1B23] via-[#F16233] via-70% to-[#ffffff] text-white z-50"
		>
			<div className="flex justify-center items-center py-[9px]">
				<Link to="/home">
					<img
						src="/images/yuanter.jpg"
						alt="Yuanter Image"
						className="w-[136px] h-[130px] object-cover"
					/>
				</Link>
			</div>
			<div id="Sidebar-menu">
			<Tooltip content="Material Tailwind" placement="top">

					<ButtonLink to="/home" activeClass={getButtonClass("/home")} tooltipContent="Home page">
						<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 24 24"><path fill="currentColor" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" />
						</svg>
					</ButtonLink>
				</Tooltip>
				<ButtonLink to="/Records" activeClass={getButtonClass("/Records")} tooltipContent="RFID Records">
					<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-3.45 0-6.012-2.287T3.05 13H5.1q.35 2.6 2.313 4.3T12 19q2.925 0 4.963-2.037T19 12q0-2.925-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924q1.212 1.213 1.925 2.85T21 12q0 1.875-.712 3.513t-1.925 2.85q-1.213 1.212-2.85 1.925T12 21m2.8-4.8L11 12.4V7h2v4.6l3.2 3.2z" /></svg>
				</ButtonLink>
				<ButtonLink to="/footage" activeClass={getButtonClass("/footage")} tooltipContent="Anomaly Footage">
					<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 24 24"><path fill="currentColor" d="M18.618 7.462L6.403 2.085a1.007 1.007 0 0 0-.77-.016a1.002 1.002 0 0 0-.552.537l-3 7a1 1 0 0 0 .525 1.313L9.563 13.9L8.323 17H4v-3H2v8h2v-3h4.323c.823 0 1.552-.494 1.856-1.258l1.222-3.054l3.419 1.465a1 1 0 0 0 1.311-.518l3-6.857a1 1 0 0 0-.513-1.316m1.312 8.91l-1.858-.742l1.998-5l1.858.741z" /></svg>
				</ButtonLink>
			</div>
			<div id="Sidebar-personalinfo" className="flex flex-col justify-end grow">
				<div className="">
					<ButtonLink to={location.pathname} activeClass="group " onClick={() => setLogoutModalOpen(true)} className="mt-2" tooltipContent="Sign out">
					<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 24 24" className='group-hover:text-red-600 transition-colors duration-200'><path fill="currentColor" d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"/></svg>
						{/* <ArrowLeftEndOnRectangleIcon className="text-white w-[60px] h-60 group-hover:text-red-600 transition-colors duration-200" /> */}
					</ButtonLink>
					<LogoutModal showModal={isLogoutModalOpen} closeModal={() => setLogoutModalOpen(false)} handleLogout={handleLogout} />
				</div>
			</div>



		</nav>
	);
}; export default Navbar;
