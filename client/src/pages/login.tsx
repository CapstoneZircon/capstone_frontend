import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@material-tailwind/react";
import { auth, db_firestore } from "../firebase";
import { signInWithEmailAndPassword,getAuth, signOut } from "firebase/auth";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    IconButton,
    Checkbox,

} from "@material-tailwind/react";


const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
    // const LoginPage = () => {
    const admin = process.env.REACT_APP_ADMIN;
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [errCode, setErrorCode] = useState("");
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3002/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const data = await response.json();
                const user = data.user;
                if (user) {
                    // console.log("User signed in:", user.email);
                    if (user.email === admin) {
                        // Set isAdmin state or perform other actions if needed
                    }
                    // Call the onLogin function passed as prop from App component
                    onLogin();
                    navigate("/home");
                } else {
                    // console.log("No user is signed in");
                }
            } else {
                const errorData = await response.json();
                console.error('Failed to sign in:', errorData.error);
                setError(true);
                setErrorCode(errorData.error);
            }
        } catch (error) {
            console.error('Error signing in user:', error);
        }
    };

    return (

        <div className="min-h-screen flex flex-row justify-center items-center bg-gradient-to-b from-[#ED1B23] via-[#F16233] via-10% to-[#ffffff] to-85%">
            <div className="basis-2/4 flex justify justify-center">
                <div className="my-5" >
                    <Card className="w-96  text-center">
                        <CardHeader className="pb-3 mb-3">
                            <Typography> <span className="text-2xl font-bold"> WareHouse  Department </span> </Typography>
                        </CardHeader>
                        <CardBody>
                            <img src="/images/yuanter.jpg" />
                        </CardBody>
                        <CardFooter>
                            <div className="flex flex-row items-center justify-center ">
                                <div className="mx-5 mt-7 ">
                                    <Typography> <span className="font-bold text-xl"> By: </span> </Typography>
                                </div>
                                <div>
                                    <div className="flex item-center justify-center text-center">
                                        <img className="w-48 h-full" src="/images/Zircon_logo.png" />
                                    </div>
                                </div>
                            </div>
                        </CardFooter>

                    </Card>

                </div>

            </div>
            <div className="basis-1/3  my-auto">
                <Card className="w-[420px]">
                    {/* <CardHeader
                        variant="gradient"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" className="text-[#e66f34]">
                            Login Page
                        </Typography>
                    </CardHeader> */}
                    <CardBody className="flex flex-col gap-4">
                    <Typography variant="h3" className="text-black py-1">
                    Log in to your Account
                        </Typography>
                        <form className=" py-5 flex flex-col gap-y-3" onSubmit={submitHandler}>
                            <Input className="col" name="email" value={userData.email} onChange={changeHandler} label="Email" size="lg" type="text" />
                                <Input className="col mr-16" name="password" type={showPassword ? "text" : "password"}
                                    icon={<IconButton onClick={() => setShowPassword(!showPassword)} className="-my-1" variant="text" size="sm">{showPassword ? <FaEye /> : <FaEyeSlash />}</IconButton>}
                                    value={userData.password} onChange={changeHandler} label="Password" size="lg" />
                            <Button className="col mt-3" type="submit" variant="gradient" color='gray' fullWidth>
                                Sign In
                            </Button>
                            {error && <span className="text-red-400 text-md font-normal"> {errCode} </span>}
                        </form>

                    </CardBody>



                </Card>

            </div>



        </div>


    )

}; export default LoginPage;