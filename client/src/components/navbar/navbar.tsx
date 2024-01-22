import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import ButtonLink from './ButtonLink';
import LogoutModal from './LogoutModal';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
	const location = useLocation();
	const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

	const getButtonClass = (path: any) => {
		return location.pathname.startsWith(path)? "bg-dark-gray" : "bg-mid-gray";
		// return location.pathname === path ? "bg-dark-gray" : "bg-mid-gray";
	};
	const auth = getAuth();

	const handleLogout = async () => {
		try {
			await signOut(auth);
			setLogoutModalOpen(false);
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};
	return (
		<nav
			id="SideBar"
			className="flex flex-col fixed h-full w-[149px] bg-mid-gray  text-white"
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
				<ButtonLink to="/home" activeClass={getButtonClass("/home")}><img src="/images/home-icon.jpg" alt="Home" className="w-[60px] h-[60px]" /></ButtonLink>
				<ButtonLink to="/Records" activeClass={getButtonClass("/Records")}><img src="/images/home-icon.jpg" alt="Home" className="w-[60px] h-[60px]" /></ButtonLink>
				<ButtonLink to="/footage" activeClass={getButtonClass("/footage")}><img src="/images/home-icon.jpg" alt="Home" className="w-[60px] h-[60px]" /></ButtonLink>
			</div>
			<div id="Sidebar-personalinfo" className="flex flex-col justify-end grow">
				<div className="bg-mid-gray">
					<ButtonLink to={location.pathname} activeClass="group hover:bg-mid-gray" onClick={() => setLogoutModalOpen(true)} className="mt-2">
						<ArrowLeftEndOnRectangleIcon className="text-white w-[60px] h-60 group-hover:text-red-600"/>
					</ButtonLink>
					<LogoutModal showModal={isLogoutModalOpen} closeModal={() => setLogoutModalOpen(false)} handleLogout={handleLogout} />
				</div>
			</div>



		</nav>
	);
}; export default Navbar;
