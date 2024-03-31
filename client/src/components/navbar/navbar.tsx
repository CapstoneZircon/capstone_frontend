import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ButtonLink from './ButtonLink';
import LogoutModal from './LogoutModal';
import encryptedPath from './encryptPath';

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

	const getButtonClass = (path: any) => {
		return location.pathname.startsWith(encryptedPath(path)) ? "bg-white text-red-500 hover:bg-none" : "bg-none text-white hover:bg-light-gray";
		// return location.pathname === path ? "bg-dark-gray" : "bg-mid-gray";
	};
	const handleLogout = async () => {
		try {
			const response = await fetch('http://localhost:3002/api/signout', {
				method: 'POST',

			});

			if (response.ok) {
				// console.log("logout ok")
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
				<Link to={encryptedPath("/home")}>
					<img
						src="/images/yuanter.jpg"
						alt="Yuanter Image"
						className="w-[136px] h-[130px] object-cover"
					/>
				</Link>
			</div>
			<div id="Sidebar-menu">
				<ButtonLink to="/home" activeClass={getButtonClass("/home")} tooltipContent="หน้าหลัก">
					<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 24 24"><path fill="currentColor" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" />
					</svg>
				</ButtonLink>
				<ButtonLink to="/Records" activeClass={getButtonClass("/Records")} tooltipContent="บันทึกข้อมูล RFID">
					<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-3.45 0-6.012-2.287T3.05 13H5.1q.35 2.6 2.313 4.3T12 19q2.925 0 4.963-2.037T19 12q0-2.925-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924q1.212 1.213 1.925 2.85T21 12q0 1.875-.712 3.513t-1.925 2.85q-1.213 1.212-2.85 1.925T12 21m2.8-4.8L11 12.4V7h2v4.6l3.2 3.2z" /></svg>
				</ButtonLink>
				<ButtonLink to="/scans" activeClass={getButtonClass("/scans")} tooltipContent="รายชื่อผู้ไม่ออกจากระบบ">
					<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 24 24"><path fill="currentColor" d="M4.615 21q-.69 0-1.152-.462Q3 20.075 3 19.385V16h1v3.385q0 .23.192.423q.193.192.423.192H8v1zM3 8V4.615q0-.69.463-1.152Q3.925 3 4.615 3H8v1H4.615q-.23 0-.423.192Q4 4.385 4 4.615V8zm13 13v-1h3.385q.23 0 .423-.192q.192-.193.192-.423V16h1v3.385q0 .69-.462 1.152q-.463.463-1.153.463zm4-13V4.615q0-.23-.192-.423Q19.615 4 19.385 4H16V3h3.385q.69 0 1.152.463q.463.462.463 1.152V8zm-8 3.885q-1.044 0-1.772-.728T9.5 9.385q0-1.02.728-1.76T12 6.885q1.02 0 1.76.74t.74 1.76q0 1.044-.74 1.772t-1.76.728m-5.5 5.23v-1.4q0-.41.205-.756q.205-.347.558-.565q1.074-.636 2.278-.957q1.205-.322 2.459-.322t2.459.322q1.204.32 2.278.957q.353.218.558.565q.205.347.205.756v1.4z" /></svg>
				</ButtonLink>
				<ButtonLink to="/footage" activeClass={getButtonClass("/footage")} tooltipContent="ฟุตเทจของเหตุการณ์ผิดปกติ">
					<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 24 24"><path fill="currentColor" d="M18.618 7.462L6.403 2.085a1.007 1.007 0 0 0-.77-.016a1.002 1.002 0 0 0-.552.537l-3 7a1 1 0 0 0 .525 1.313L9.563 13.9L8.323 17H4v-3H2v8h2v-3h4.323c.823 0 1.552-.494 1.856-1.258l1.222-3.054l3.419 1.465a1 1 0 0 0 1.311-.518l3-6.857a1 1 0 0 0-.513-1.316m1.312 8.91l-1.858-.742l1.998-5l1.858.741z" /></svg>
				</ButtonLink>
			</div>
			<div id="Sidebar-personalinfo" className="flex flex-col justify-end grow">
				<div className="">
					<ButtonLink to={location.pathname} activeClass="group " onClick={() => setLogoutModalOpen(true)} className="mt-2" tooltipContent="ออกจากระบบ">
						<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 24 24" className='group-hover:text-red-600 transition-colors duration-200'><path fill="currentColor" d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z" /></svg>
						{/* <ArrowLeftEndOnRectangleIcon className="text-white w-[60px] h-60 group-hover:text-red-600 transition-colors duration-200" /> */}
					</ButtonLink>
					<LogoutModal showModal={isLogoutModalOpen} closeModal={() => setLogoutModalOpen(false)} handleLogout={handleLogout} />
				</div>
			</div>



		</nav>
	);
}; export default Navbar;
