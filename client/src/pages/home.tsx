import React, { useEffect, useState } from "react";
import {Button, CardBody, CardFooter, CardHeader} from "@material-tailwind/react"
import ButtonFeed from "../components/Button/ButtonFeed";
import {Card} from "@material-tailwind/react"
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import Chart from "chart.js"
import Axios from 'axios'


const HomePage =() => {
	const [userhistoryList, setuserHistoryList] = useState([]);
	

	useEffect(() => {
			Axios.get('http://localhost:8080/historys-users').then((response) => {
				setuserHistoryList(response.data);
			});
    })

    return(
		
        <div className="bg-backg-gray w-auto h-screen">
            <nav id = "NavBar" className="text-center item-center container-lg">
                <div className = "md-container w-full">
                    <div className="pt-3 flex flex-row space-x-3">

                        <div className="col basis-1/4">
                            <Link to='/'>
                                <Button variant="text" color = "white"> <a> Home </a> </Button>
                            </Link>
                        </div>

                        <div className="col basis-1/4">
                            <Link to='salesOrder'>
                                <Button variant="text" color = "white"> <a> Sales </a> </Button>
                            </Link>
                        </div>

                        <div className="col basis-1/4">
                            <Link to='footage'>
                                <Button variant="text" color = "white"> <a> Footage </a> </Button>
                            </Link>
                        </div>
                        <div className="col basis-1/4">
                            <Link to='/'>
                                <Button variant="text" color = "white"> <a> Dashboard </a> </Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </nav>

            <div className="flex flex-row">

            <div className="flex flex-col basis-4/6">


                    <div id = "Body" className="mt-3 mb-2 flex flex-col">
                    

                        <div className="row-span-2 basis-4/6 mx-3">
                            <Card className="w-auto h-auto">
                                <div className="text-2xl font-extrabold ml-11 mt-4 "> <h2> IN - OUT Visualize <a href="/"> &#10093; </a></h2> </div>

                                <CardBody className="flex flex-col items-center w-full h-96 justify-center my-5">
                            
		<h2 className="text-xl font-bold">Products Beheaviors</h2>
		<span className="text-sm font-semibold text-gray-500">2023</span>
		<div className="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3">
			<div className="relative flex flex-col items-center flex-grow pb-5 group">
				<span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$37,500</span>
				<div className="relative flex justify-center w-full h-8 bg-red-200"></div>
				<div className="relative flex justify-center w-full h-6 bg-green-300"></div>
				<div className="relative flex justify-center w-full h-16 bg-backg-gray"></div>
				<span className="absolute bottom-0 text-xs font-bold">Jan</span>
			</div>
			<div className="relative flex flex-col items-center flex-grow pb-5 group">
				<span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$45,000</span>
				<div className="relative flex justify-center w-full h-10 bg-red-200"></div>
				<div className="relative flex justify-center w-full h-6 bg-green-300"></div>
				<div className="relative flex justify-center w-full h-20 bg-backg-gray"></div>
				<span className="absolute bottom-0 text-xs font-bold">Feb</span>
			</div>
			<div className="relative flex flex-col items-center flex-grow pb-5 group">
				<span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$47,500</span>
				<div className="relative flex justify-center w-full h-10 bg-red-200"></div>
				<div className="relative flex justify-center w-full h-8 bg-green-300"></div>
				<div className="relative flex justify-center w-full h-20 bg-backg-gray"></div>
				<span className="absolute bottom-0 text-xs font-bold">Mar</span>
			</div>
			<div className="relative flex flex-col items-center flex-grow pb-5 group">
				<span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$50,000</span>
				<div className="relative flex justify-center w-full h-10 bg-red-200"></div>
				<div className="relative flex justify-center w-full h-6 bg-green-300"></div>
				<div className="relative flex justify-center w-full h-24 bg-backg-gray"></div>
				<span className="absolute bottom-0 text-xs font-bold">Apr</span>
			</div>
			<div className="relative flex flex-col items-center flex-grow pb-5 group">
				<span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$47,500</span>
				<div className="relative flex justify-center w-full h-10 bg-red-200"></div>
				<div className="relative flex justify-center w-full h-8 bg-green-300"></div>
				<div className="relative flex justify-center w-full h-20 bg-backg-gray"></div>
				<span className="absolute bottom-0 text-xs font-bold">May</span>
			</div>
			<div className="relative flex flex-col items-center flex-grow pb-5 group">
				<span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$55,000</span>
				<div className="relative flex justify-center w-full h-12 bg-red-200"></div>
				<div className="relative flex justify-center w-full h-8 bg-green-300"></div>
				<div className="relative flex justify-center w-full h-24 bg-backg-gray"></div>
				<span className="absolute bottom-0 text-xs font-bold">Jun</span>
			</div>
			<div className="relative flex flex-col items-center flex-grow pb-5 group">
				<span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$60,000</span>
				<div className="relative flex justify-center w-full h-12 bg-red-200"></div>
				<div className="relative flex justify-center w-full h-16 bg-green-300"></div>
				<div className="relative flex justify-center w-full h-20 bg-backg-gray"></div>
				<span className="absolute bottom-0 text-xs font-bold">Jul</span>
			</div>
			<div className="relative flex flex-col items-center flex-grow pb-5 group">
				<span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$57,500</span>
				<div className="relative flex justify-center w-full h-12 bg-red-200"></div>
				<div className="relative flex justify-center w-full h-10 bg-green-300"></div>
				<div className="relative flex justify-center w-full h-24 bg-backg-gray"></div>
				<span className="absolute bottom-0 text-xs font-bold">Aug</span>
			</div>
			<div className="relative flex flex-col items-center flex-grow pb-5 group">
				<span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$67,500</span>
				<div className="relative flex justify-center w-full h-12 bg-red-200"></div>
				<div className="relative flex justify-center w-full h-10 bg-green-300"></div>
				<div className="relative flex justify-center w-full h-32 bg-backg-gray"></div>
				<span className="absolute bottom-0 text-xs font-bold">Sep</span>
			</div>
			<div className="relative flex flex-col items-center flex-grow pb-5 group">
				<span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$65,000</span>
				<div className="relative flex justify-center w-full h-12 bg-red-200"></div>
				<div className="relative flex justify-center w-full h-12 bg-green-300"></div>
				<div className="relative flex justify-center w-full bg-backg-gray h-28"></div>
				<span className="absolute bottom-0 text-xs font-bold">Oct</span>
			</div>
			<div className="relative flex flex-col items-center flex-grow pb-5 group">
				<span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$70,000</span>
				<div className="relative flex justify-center w-full h-8 bg-red-200"></div>
				<div className="relative flex justify-center w-full h-8 bg-green-300"></div>
				<div className="relative flex justify-center w-full h-40 bg-backg-gray"></div>
				<span className="absolute bottom-0 text-xs font-bold">Nov</span>
			</div>
			<div className="relative flex flex-col items-center flex-grow pb-5 group">
				<span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$75,000</span>
				<div className="relative flex justify-center w-full h-12 bg-red-200"></div>
				<div className="relative flex justify-center w-full h-8 bg-green-300"></div>
				<div className="relative flex justify-center w-full h-40 bg-backg-gray "></div>
				<span className="absolute bottom-0 text-xs font-bold">Dec</span>
			</div>
		</div>

                                </CardBody>

                            </Card>
                        </div>

                <div className="flex flex-row mb-5 justify-center mt-2">
                    <div className="basis-1/2 mr-5 ml-3">
							<Card className="w-full h-52 my-3 grid ">
                                <CardBody className="h-40">
                                    <Typography> <div className="flex flex-row"> <div> <span className="mx-5 text-8xl font-extrabold"> 12 </span> </div> <div className="ml-10 w-32 h-auto"> <span className="text-2xl font-bold "> Orders need to be shiped </span></div></div> </Typography>
									<Typography> <span className="flex justify-center text-md font-bold text-red-600 mt-2"> 3 Orders was delayed </span></Typography>
								</CardBody>
                                <CardFooter className="text-center w-full h-full rounded-md bg-order-bg content-end">
                                    <a href="/"><Typography> <span className="text-white font-extrabold text-xl"> See all sales orders </span> </Typography></a>
                                </CardFooter>
                            </Card>

                    </div>

                    <div className=" basis-1/2 mr-3 ml-5">
                            <Card className="w-full h-52 my-3 grid ">
                                <CardBody className="h-40">
                                    <Typography> <div className="flex flex-row"> <div> <span className="mx-5 text-8xl font-extrabold"> 12 </span> </div> <div className="ml-10 w-32 h-auto"> <span className="text-2xl font-bold "> Orders need to be shiped </span></div></div> </Typography>
									<Typography> <span className="flex justify-center text-md font-bold text-red-600 mt-2"> 3 Orders was delayed </span></Typography>
								</CardBody>
                                <CardFooter className="text-center w-full h-full rounded-md bg-order-bg content-end">
                                    <a href="/"><Typography> <span className="text-white font-extrabold text-xl"> See all sales orders </span> </Typography></a>
                                </CardFooter>
                            </Card>
                    </div>
                    </div>

                </div>

               
                </div>
                <div className="w-full row-span-4 basis-2/6 mx-3 my-3 ">
                            <Card className="w-auto h-full bg-feedHome-bg "> 
                                <div className="my-4">
                                    <Typography> <span className="ml-11 text-2xl font-semibold"> ENTERED HISTORY </span> </Typography>
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
    )
}; export default HomePage;