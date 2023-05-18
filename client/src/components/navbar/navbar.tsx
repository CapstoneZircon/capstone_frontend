import React , {useContext , useState , useEffect} from 'react'
import {
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Avatar,
	Typography,
  } from "@material-tailwind/react";
  import {
	Cog6ToothIcon,
	PowerIcon,
	UserCircleIcon,
	LifebuoyIcon,
  } from "@heroicons/react/24/outline";
import {ProfileIcon} from '../Icon/profile'
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import {doc , getDoc , onSnapshot } from 'firebase/firestore'
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';


export const Navbar = () => {
    const {currentUser} = useContext(AuthContext);
    const [currentData , setCurrentData] = useState<any>([])

    useEffect(() => {
        const getData = () => {
            const unsub = onSnapshot(doc(db , "users" , currentUser.uid) , (doc)=>{
                setCurrentData(doc.data())
            });

            return ()=> {
                unsub();
            };
        };

        getData();
        
    }, [currentUser.id]);

    console.log(Object.entries(currentData))
    return(
        
				<Menu>
					<MenuHandler>
						<button className="rounded-lg w-auto h-auto flex justify-center items-center mx-3 my-5">
							<ProfileIcon />
						</button>
					</MenuHandler>
					<MenuList>
						<MenuItem className="flex items-center gap-2">
							<UserCircleIcon strokeWidth={2} className="h-4 w-4" />
									<Typography variant="small" className="font-normal">
											{currentUser.email}
									</Typography>
						
						</MenuItem>
						
						<MenuItem className="flex items-center gap-2">
							<Cog6ToothIcon strokeWidth={2} className="h-4 w-4" />
							<Typography variant="small" className="font-normal">
								Edit Profile
							</Typography>
						</MenuItem>
						<Link to = "/signup">
							<MenuItem className="flex items-center gap-2">
									<LifebuoyIcon strokeWidth={2} className="h-4 w-4" />
									<Typography variant="small" className="font-normal">
										Request account
									</Typography>
							</MenuItem>
						</Link>

							<hr className="my-2 border-blue-gray-50" />
						<MenuItem className="flex items-center gap-2 ">
							<PowerIcon strokeWidth={2} className="h-4 w-4" />
							<Typography variant="small" className="font-normal" onClick = { () => signOut(auth)}>
								Sign Out
							</Typography>
						</MenuItem>
					</MenuList>
				</Menu>
			
    )
}