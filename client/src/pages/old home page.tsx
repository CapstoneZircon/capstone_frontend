import React, { useEffect, useState } from "react";
import {Button, CardBody, CardFooter, CardHeader} from "@material-tailwind/react"
import {Card} from "@material-tailwind/react"
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import Chart from "chart.js"
import Axios from 'axios'
import { auth } from "../firebase";
import {signOut} from "firebase/auth"
import Navbar from "../components/navbar/navbar";
import {Vistualize} from "../components/home/vistual";

const OldHomePage =() => {
	const [userhistoryList, setuserHistoryList] = useState([]);
	

	useEffect(() => {
			Axios.get('http://localhost:8080/all_video').then((response) => {
				setuserHistoryList(response.data);
			});
    })

    return(

		<div className="bg-backg-gray w-auto  h-screen">
			<div className="flex flex-row-reverse border justify-center items-center">
					<div className="border w-fit flex justify-end">
						<Navbar></Navbar>	
					</div>	
					<div className="w-full text-center text-4xl"> Home</div>
			</div>
					
        <div className="flex flex-col justify-center items-center">
 
            <div className="flex flex-row w-screen ">

            <div className="flex flex-col basis-4/6 ">
                    <div id = "Body" className="mt-3 mb-2 flex flex-col ">

                        <div className="row-span-2 basis-4/6 mx-3">
                            <Card className="w-auto h-auto">
                                <div className="text-2xl font-extrabold ml-11 mt-4 "> <h2> IN - OUT Visualize </h2> </div>

                                <CardBody>
									<Vistualize></Vistualize>
                                </CardBody>

                            </Card>
                        </div>

                <div className="flex flex-col lg:flex-row mb-5 justify-center mt-2 ">
					{/* <div className="flex mx-3 lg:basis-1/2 lg:mr-5 lg:ml-3"> */}
                    <div className="flex mx-3 lg:basis-1/2 lg:mr-5 lg:ml-3">
							<Card className="w-full h-52 mt-3 grid ">
                                <CardBody className="h-40">
                                    <Typography> <div className="flex flex-row"> <div> <span className="mx-5 text-8xl font-extrabold"> 12 </span> </div> <div className="ml-10 w-32 h-auto"> <span className="text-2xl font-bold "> Orders need to be shiped </span></div></div> </Typography>
									<Typography> <span className="flex justify-center text-md font-bold text-red-600 mt-2"> 3 Orders was delayed </span></Typography>
								</CardBody>
                                <CardFooter className="text-center w-full h-full rounded-md bg-order-bg content-end">
                                    <a href="/salesOrder"><Typography> <span className="text-white font-extrabold text-xl"> See all sales orders </span> </Typography></a>
                                </CardFooter>
                            </Card>

                    </div>

                    {/* <div className=" flex mx-3 mt-8 lg:basis-1/2 lg:mr-3 lg:ml-5 lg:mt-0 "> */}
					<div className=" flex mx-3 mt-8 lg:basis-1/2 lg:mr-3 lg:ml-5 lg:mt-0 ">
                            <Card className="w-full h-52 my-3 grid ">
                                <CardBody className="h-40">
                                    <Typography> <div className="flex flex-row"> <div> <span className="mx-5 text-8xl font-extrabold"> 12 </span> </div> <div className="ml-10 w-32 h-auto"> <span className="text-2xl font-bold "> Orders need to be shiped </span></div></div> </Typography>
									<Typography> <span className="flex justify-center text-md font-bold text-red-600 mt-2"> 3 Orders was delayed </span></Typography>
								</CardBody>
                                <CardFooter className="text-center w-full h-full rounded-md bg-order-bg content-end">
                                    <a href="/salesOrder"><Typography> <span className="text-white font-extrabold text-xl"> See all sales orders </span> </Typography></a>
                                </CardFooter>
                            </Card>
                    </div>
                    </div>

                </div>

               
                </div>
                <div className="w-full row-span-4 basis-2/6 mx-3 my-3 ">
                            <Card className="w-auto h-full bg-feedHome-bg "> 
                                <div className="my-4 sm:text-center md:text-center lg:text-left">
                                    <Typography> <span className="pl-5 sm:text-sm md:text-xl lg:text-xl font-semibold"> ENTERED HISTORY <a href="/footage"> &#10093; </a></span> </Typography>
                                </div>

								{userhistoryList.map((val, key) =>{
									// const Date = String(val["Date"]).substring(0,10);
									const date = new Date(val["Date"]);
									const date_str = String(date).substring(4,15);
									
									return(
										<Card className=" my-1 mx-5 py-2">
											<div className="flex flex-row ml-5">
												<div className="basis-1/2">
													<Typography> <span className="text-lg font-semibold"> Name: {val["Name"]} </span> </Typography>
												</div>
												<div className="basis-1/2">
													<Typography> <span className="text-lg font-semibold"> Position: {val["Position"]} </span> </Typography>
												</div>
											</div>

											<div className="flex flex-row ml-5">
												<div className="basis-1/2">
													<Typography> <span className="text-lg font-semibold"> UID_Card: {val["UID_Card"]} </span> </Typography>
												</div>
												<div className="basis-1/2">
													<Typography> <span className="text-lg font-semibold"> Status: {val["Status"]} </span> </Typography>
												</div>
											</div>

											<div className="flex flex-row ml-5">
												<div className="basis-1/2">
													<Typography> <span className="text-lg font-semibold"> Date: {date_str} </span> </Typography>
												</div>
												<div className="basis-1/2">
													<Typography> <span className="text-lg font-semibold"> Time: {val["Time"]} </span> </Typography>
												</div>
											</div>
											
										</Card>
									)
								})}
                            </Card>
                </div>

                

            </div>


 
		</div>
		</div>
    )
}; export default OldHomePage;