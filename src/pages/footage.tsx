import React,{useState} from "react";
import { Button } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import { Card,CardBody,CardFooter, } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { Clock } from "../components/Icon/clock";
import ReactPlayer from 'react-player';
<<<<<<< HEAD
import {BsChevronLeft} from "react-icons/bs";
import Video from "../components/Video/swap";
=======
import ButtonFeed from "../components/Button/ButtonFeed";
>>>>>>> 243aecc90af08b17a84eb22e2de4f5831ee74e23

const Footage =() =>{
    const[videoState,setSorce] = useState<boolean>(false);
    const sawpVideo = () => {
        setSorce(!videoState);
        console.log("clicked")
        // console.log(videoState)
    }

    return (

        
        
        // <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>
<<<<<<< HEAD
        <div className="px-5 py-5 bg-backg-gray w-screen h-screen">
            <div className="px-2 py-2 bg-feedHome-bg">
=======
        <div className="px-5 py-5 bg-backg-gray ">
            <div className=" px-2 py-2 bg-feedHome-bg">
>>>>>>> 243aecc90af08b17a84eb22e2de4f5831ee74e23

                <nav id="FootageNavbar" className="flex flex-row">
                    <Link to='/home'>    
                        <div className="col basis-1/12 py-3 px-6">  
                    
                            <a className="text-4xl text-black font-thin">
                                <BsChevronLeft />
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

<<<<<<< HEAD
                    <div className="col basis-9/12 flex flex-row justify-center content-end">

                        <div className="justify-center flex">
                            <Video state = {videoState}/> 
=======
                    <div className="col basis-9/12  flex flex-row justify-center">

                        <div className="justify-center flex border-red-800 border-2">
                        <ReactPlayer
                        url="/videos/vdo1.mp4"
                        width="95%"
                        height="100%"
                        controls
                        />

                            {/* <source src="/videos/vdo1.mp4" type="video/mp4"/> */}
                            {/* <img src="/images/CCTV1.jpg" alt="CCTV1"/> */}
>>>>>>> 243aecc90af08b17a84eb22e2de4f5831ee74e23
                        </div>
                        
                    </div>

<<<<<<< HEAD
                    <div className="col basis-3/12 mr-12">
                        <div className="flex flex-col ">
                            <div className="basis-3/12 ">
                                <img src="/images/CCTV2.jpg" alt="CCTV2" onClick={sawpVideo}/>
                            </div>

                            <div className="basis-1/12 text-center">
=======
                    <div className="col basis-3/12 ">
                        <div className="flex flex-col ">
                            <div className="basis-3/12">
                                <img src="/images/CCTV2.jpg" alt="CCTV2"/>
                            </div>

                            <div className="basis-1/12 text-center ">
>>>>>>> 243aecc90af08b17a84eb22e2de4f5831ee74e23
                                <Typography>
                                    <span className="text-xl">
                                        Camera 2
                                    </span>
                                </Typography>
                            </div>

                            <div className="basis-8/12 ">
                                <Card className="rounded-3xl">

                                    <CardBody>
                                        <div className="flex flex-row">
                                            <div className="col basis-4/12 ">
                                                
                                                <img src="/images/Employee-resize.jpg" className="object-cover object-top h-eqw rounded-full " alt="Employee"/>
                                                
                                            </div>

                                            <div className="col basis-8/12 text-right">
                                                <div className="flex flex-col">

                                                    <div className="basis-1/3 ">
                                                        <Typography>
                                                            <span className="text-3xl font-bold">
                                                                Atichai K.
                                                            </span>
                                                        </Typography>
                                                        
                                                    </div>

<<<<<<< HEAD
                                                    <div className="basis-2/3 ">

                                                        <div className="flex flex-row-reverse grid-flow-col gap-0">

                                                            <div className="flex justify-end">
                                                                
                                                                <div className="pt-3">
=======
                                                    <div className="basis-2/3">

                                                        <div className="flex flex-row-reverse grid-flow-col gap-0">

                                                            <div className="flex justify-end ">
                                                                
                                                                <div className="pt-3 ">
>>>>>>> 243aecc90af08b17a84eb22e2de4f5831ee74e23
                                                                    <Clock />
                                                                </div>

                                                                <div className="flex flex-col">

<<<<<<< HEAD
                                                                    <div className="basis-1/2 pt-1">
=======
                                                                    <div className="basis-1/2 pt-1 ">
>>>>>>> 243aecc90af08b17a84eb22e2de4f5831ee74e23
                                                                        <Typography>
                                                                            <span className="text-lg">
                                                                                17:46 - 19:55 
                                                                            </span>
                                                                        </Typography>
                                                                    </div>

<<<<<<< HEAD
                                                                    <div className="basis-1/2 text-center">
=======
                                                                    <div className="basis-1/2 text-center ">
>>>>>>> 243aecc90af08b17a84eb22e2de4f5831ee74e23
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

                                            <div className="basis-4/12 text-center box-border h-6">
                                                <Typography>
                                                    <span className="text-md">
                                                        HISTORY
                                                    </span>
                                                </Typography>
                                            </div>

<<<<<<< HEAD
                                            <div className="basis-8/12 box-border h-6 flex justify-end">
=======
                                            <div className="basis-8/12 box-border h-6  flex justify-end">
>>>>>>> 243aecc90af08b17a84eb22e2de4f5831ee74e23
                                                
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

                                                <div className="relative ">
<<<<<<< HEAD
                                                    <div className=" h-12 w-12 rounded-full">
=======
                                                    <div className=" h-12 w-12 rounded-full ">
>>>>>>> 243aecc90af08b17a84eb22e2de4f5831ee74e23
                                                        <div className="w-full h-full flex justify-center items-center">
                                                            <Typography>
                                                                <span className="text-lg">
                                                                    9
                                                                </span>
                                                            </Typography>
                                                        </div>
                                                    </div>

                                                    <div className="w-6 absolute bottom-8 left-7">
                                                            <img src="/images/Employee-resize.jpg" className="object-cover object-top h-eqw rounded-full" alt="Employee"/>
                                                    </div>


                                                    <div className="text-center pt-1">
                                                        <Typography>
                                                            <span className="text-lg">
                                                                THU
                                                            </span>
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <div className="relative">
                                                    <div className="h-12 w-12 rounded-full">
                                                        <div className="w-full h-full flex justify-center items-center">
                                                            <Typography>
                                                                <span className="text-lg">
                                                                    10
                                                                </span>
                                                            </Typography>
                                                        </div>
                                                    </div>

                                                    <div className="text-center pt-1">
                                                        <Typography>
                                                            <span className="text-lg">
                                                                FRI
                                                            </span>
                                                        </Typography>
                                                    </div>
                                                </div>

                                                <div className="relative">
<<<<<<< HEAD
                                                    <div className="h-12 w-12 rounded-full">
=======
                                                    <div className="h-12 w-12 rounded-full ">
>>>>>>> 243aecc90af08b17a84eb22e2de4f5831ee74e23
                                                        <div className="w-full h-full flex justify-center items-center">
                                                            <Typography>
                                                                <span className="text-lg">
                                                                    13
                                                                </span>
                                                            </Typography>
                                                        </div>
                                                    </div>

                                                    <div className="w-7 absolute  bottom-8 left-6">
                                                            <img src="/images/Employee-resize.jpg" className="object-cover object-top h-eqw rounded-full" alt="Employee"/>
                                                    </div>
                                                    <div className="w-7 absolute  bottom-8 left-9">
                                                            <img src="/images/Employee-resize.jpg" className="object-cover object-top h-eqw rounded-full" alt="Employee"/>
                                                    </div>

                                                    <div className="text-center pt-1">
                                                        <Typography>
                                                            <span className="text-lg">
                                                                MON
                                                            </span>
                                                        </Typography>
                                                    </div>
                                                </div>

                                                <div className="relative">
                                                    <div className="h-12 w-12 rounded-full">
                                                        <div className="w-full h-full flex justify-center items-center">
                                                            <Typography>
                                                                <span className="text-lg">
                                                                    18
                                                                </span>
                                                            </Typography>
                                                        </div>
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