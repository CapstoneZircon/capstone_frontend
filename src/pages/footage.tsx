import React from "react";
import { Button } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import { Card,CardBody,CardFooter, } from "@material-tailwind/react";

const Footage =() =>{
    return (
        <div className="px-5 py-5 bg-backg-gray ">
            <div className="border-purple-700 border-4 px-2 py-2 bg-feedHome-bg">

                <nav id="FootageNavbar" className="border-red-700 border-2 flex flex-row">
                        
                    <div className="col basis-1/12 py-3 border-blue-700 border-2">  
                        <a href="/" className="text-4xl text-black font-thin">
                                <p>&#60;</p>
                        </a>
                    </div> 

                    <div className="col basis-11/12 border-blue-700 border-2 py-3 text-xl">
                        <Typography>
                            <span className="text-4xl">
                                Footage
                            </span>
                        </Typography>
                    </div>

                </nav>
        
                <div id="FootageBody" className="border-black border-2 flex flex-row">

                    <div className="basis-9/12 border-gray-700 border-2 flex flex-col">

                        <div className="basis-10/12 border-purple-600 border-4 justify-center flex">
                            <img src="/images/CCTV1.jpg" alt="CCTV1"/>
                        </div>

                        <div className="basis-2/12 text-center">
                            <Typography>
                                <span className="text-xl">
                                    Camera 1
                                </span>
                            </Typography>
                        </div>

                    </div>

                    <div className="basis-3/12 flex flex-col border-gray-900 border-4">

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

                        <div className="basis-6/12 border-yellow-400 border-4">
                            <Card className="rounded-3xl">

                                <CardBody>
                                    <div className="flex flex-row">
                                        <div className="col basis-4/12 border-red-500 border-2">
                                            <div className="">
                                                <img src="/images/Employee-resize.jpg" className="object-none object-top h-eqw rounded-full border-blue-500 border-2" alt="Employee"/>
                                                hello
                                            </div>

                                            <div className=" border-blue-700 border-2">
                                                hello
                                            </div>
                                            
                                        </div>

                                        <div className="col basis-8/12 border-red-700 border-2">
                                            Hello
                                        </div>
                                    </div>
                                </CardBody>

                                <CardFooter>
                                    <div className="text-center justify-center flex border-black border-2">
                                        <a href="/" className="text-black font-thin inline-block bg-gray-300 px-5 py-3 rounded-full">
                                            <Typography>
                                                <span className="text-md">
                                                    RELEVANT FOOTAGE
                                                </span>
                                            </Typography>
                                        </a>
                                        
                                    </div>

                                </CardFooter>

                            </Card>
                        </div>
                    </div>

                    

                </div>
            </div>
        </div>
    )
}; export default Footage;