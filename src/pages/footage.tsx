import React from "react";
import { Button } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import { Card,CardBody,CardFooter, } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { Clock } from "../components/Icon/clock";


const Footage =() =>{
    return (
        
        // <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>
        <div className="px-5 py-5 bg-backg-gray ">
            <div className="border-purple-700 border-4 px-2 py-2 bg-feedHome-bg">

                <nav id="FootageNavbar" className="flex flex-row">
                    <Link to='/home'>    
                        <div className="col basis-1/12 py-3 px-6">  
                    
                            <a className="text-4xl text-black font-thin">
                                <p>&#60;</p>
                            </a>
                    
                        </div> 
                    </Link>

                    <div className="col basis-5/12 py-3 px-6 text-xl">
                        <Typography>
                            <span className="text-4xl">
                                Footage
                            </span>
                        </Typography>
                    </div>

                </nav>
        
                <div id="FootageBody" className="flex flex-row">

                    <div className="col basis-9/12 border-gray-700 border-2 flex flex-row justify-center">

                        <div className="border-purple-600 border-4 justify-center flex">
                            <img src="/images/CCTV1.jpg" alt="CCTV1"/>
                        </div>

                        

                    </div>

                    <div className="col basis-3/12 border-gray-900 border-4">
                        <div className="flex flex-col ">
                            <div className="basis-3/12 border-yellow-600 border-4">
                                <img src="/images/CCTV2.jpg" alt="CCTV2"/>
                            </div>

                            <div className="basis-1/12 text-center border-yellow-900 border-4">
                                <Typography>
                                    <span className="text-xl">
                                        Camera 2
                                    </span>
                                </Typography>
                            </div>

                            <div className="basis-8/12 border-yellow-400 border-4">
                                <Card className="rounded-3xl">

                                    <CardBody>
                                        <div className="flex flex-row">
                                            <div className="col basis-4/12 border-red-500 border-2">
                                                
                                                <img src="/images/Employee-resize.jpg" className="object-cover object-top h-eqw rounded-full border-blue-500 border-4" alt="Employee"/>
                                                
                                            </div>

                                            <div className="col basis-8/12 border-red-700 border-2 text-right">
                                                <div className="flex flex-col">

                                                    <div className="basis-1/3 border-yellow-800 border-2">
                                                        <Typography>
                                                            <span className="text-3xl font-bold">
                                                                Atichai K.
                                                            </span>
                                                        </Typography>
                                                        
                                                    </div>

                                                    <div className="basis-2/3 border-black border-2">

                                                        <div className="flex flex-row-reverse grid-flow-col gap-0">

                                                            <div className="flex justify-end border-blue-500 border-2">
                                                                
                                                                <div className="pt-3 border-red-300 border-2">
                                                                    <Clock />
                                                                </div>

                                                                <div className="flex flex-col">

                                                                    <div className="basis-1/2 pt-1 border-black border-2">
                                                                        <Typography>
                                                                            <span className="text-lg">
                                                                                17:46 - 19:55 
                                                                            </span>
                                                                        </Typography>
                                                                    </div>

                                                                    <div className="basis-1/2 text-center border-yellow-500 border-2">
                                                                    <Typography>
                                                                        <span className="text-lg">
                                                                            &#40;2 hr 9 min&#41;
                                                                        </span>
                                                                    </Typography>
                                                                    </div>

                                                                </div>

                                                                
                                                            </div>

                                                        </div>

                                                    </div>


                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row">

                                            <div className="basis-4/12 text-center box-border h-6 border-white border-b-2">
                                                <Typography>
                                                    <span className="text-md">
                                                        HISTORY
                                                    </span>
                                                </Typography>
                                            </div>

                                            <div className="basis-8/12 box-border h-6 border-black border-b-2 flex justify-end">
                                                
                                                <div className="basis-1/12 text-center">
                                                    <a className="text-md text-black font-thin">
                                                        <p>&#60;</p>
                                                    </a>
                                                </div>
                                                
                                                <div className="basis-7/12 text-center">
                                                    <Typography>
                                                        <span className="text-md">
                                                            SEPTEMBER 2023
                                                        </span>
                                                    </Typography>
                                                </div>

                                                <div className="basis-1/12 text-center">
                                                    <a className="text-md text-black font-thin">
                                                        <p>&#62;</p>
                                                    </a>
                                                </div>
                                                
                                            </div>

                                        </div>
                                        
                                        <div className="">
                                            <div className="pt-3 flex justify-around">

                                                <div className=" border-blue-500 border-2">
                                                    <div className="h-10 w-10 rounded-full border-gray-400 border-2">
                                                        <div className="grid grid-row-2 gap-0 place-items-center w-5 h-5">
                                                            <div className=" row-start-1 border-purple-900 border-2">
                                                                <Typography>
                                                                    <span className="text-lg">
                                                                        9
                                                                    </span>
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="text-center pt-1">
                                                        <Typography>
                                                            <span className="text-lg">
                                                                THU
                                                            </span>
                                                        </Typography>
                                                    </div>
                                                </div>

                                                <div className="">
                                                    <div className=" rounded-full border-gray-600 border-2">
                                                        10
                                                    </div>

                                                    <div className="text-center pt-1">
                                                        <Typography>
                                                            <span className="text-lg">
                                                                FRI
                                                            </span>
                                                        </Typography>
                                                    </div>
                                                </div>

                                                <div className="">
                                                    <div className=" rounded-full border-gray-800 border-2">
                                                        11
                                                    </div>

                                                    <div className="text-center pt-1">
                                                        <Typography>
                                                            <span className="text-lg">
                                                                MON
                                                            </span>
                                                        </Typography>
                                                    </div>
                                                </div>

                                                <div className="">
                                                    <div className=" rounded-full border-black border-2">
                                                        12
                                                    </div>

                                                    <div className="text-center pt-1">
                                                        <Typography>
                                                            <span className="text-lg">
                                                                SUN
                                                            </span>
                                                        </Typography>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="text-center pt-6">
                                            <a href="/" className="text-black font-thin inline-block bg-gray-300 px-5 py-3 rounded-full">
                                                <Typography>
                                                    <span className="text-md">
                                                        RELEVANT FOOTAGE
                                                    </span>
                                                </Typography>
                                            </a>
                                            
                                        </div>

                                    </CardBody>


                                </Card>
                            </div>
                        </div>

                    </div>

                    

                </div>
            </div>
        </div>
    )
}; export default Footage;