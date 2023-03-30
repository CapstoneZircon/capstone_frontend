import React from "react";
import {Button, CardBody, CardFooter, CardHeader} from "@material-tailwind/react"
import ButtonFeed from "../components/Button/ButtonFeed";
import {Card} from "@material-tailwind/react"
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import Chart from "chart.js"


const HomePage =() =>{


    return(
        <div className="bg-backg-gray">
            <nav id = "NavBar" className="text-center item-center container-lg">
                <div className = "md-container w-full">
                    <div className="pt-3 flex flex-row space-x-3">

                        <div className="col basis-1/4">
                            <Link to='/'>
                                <Button variant="text" color = "white"> <a> Home </a> </Button>
                            </Link>
                        </div>

                        <div className="col basis-1/4">
                            <Link to='/'>
                                <Button variant="text" color = "white"> <a> Sales </a> </Button>
                            </Link>
                        </div>

                        <div className="col basis-1/4">
                            <Link to='/'>
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

            <div className="flex flex-col">
                <div >

                    <div id = "Body" className="mt-4 mb-2 flex flex-row">

                        <div className="row-span-2 basis-4/6 mx-3">
                            <Card className="w-auto h-96">
                                <div className="text-2xl font-extrabold ml-11 mt-4 "> <h2> IN - OUT Visualize <a href="/"> &#10093; </a></h2> </div>

                                <CardBody >
                                    {/* <img className="w-1/2 h-1/2" src="images/bargraph.jpg"></img> */}
                                </CardBody>
                                

                            </Card>
                        </div>

                        <div className="row-span-4 basis-2/6 mx-3">
                            <Card className="w-auto h-96 bg-feedHome-bg"> 
                                <div className="my-4">
                                    <Typography> <span className="ml-11 text-2xl font-semibold"> ENTERED HISTORY </span> </Typography>
                                </div>
                            </Card>
                        </div>

                    </div>
                </div>

                <div className="flex flex-row mb-5 pb-5">
                    <div className="basis-2/5 mr-5 ml-3">
                            <Card className="w-full h-60 my-3 border-red-600 border-3">
                                <CardBody>

                                </CardBody>
                            </Card>

                    </div>

                    <div className="basis-1/5 ml-5">
                            <Card className="w-full h-60 my-3 border-red-600 border-3">
                                <CardBody>
                                    <Typography> <div className="flex flex-row"> <div> <span className="mx-5 text-8xl font-extrabold"> 12 </span> </div> <div className="ml-10 w-32 h-auto"> <span className="text-2xl font-bold "> Orders need to be shiped </span></div></div> </Typography>
                                </CardBody>
                                <div className="text-center ">
                                <Typography> <span className="text-md font-bold text-red-600"> 3 Orders was delayed </span></Typography>
                                </div>
                                <CardFooter className="text-center w-full h-auto border-2 mb-0 mt-5 rounded-md bg-order-bg">
                                <a href="/"><Typography> <span className="text-white font-extrabold text-xl"> See all sales orders </span> </Typography></a>
                                </CardFooter>
                            </Card>
                    </div>

                    {/* <div className="basis-1/5 ml-5">
                            <Card className="w-full h-60 my-3 border-red-600 border-3">
                                <CardBody>

                                </CardBody>
                            </Card>
                    </div> */}
                </div>
                

            </div>

            <div id = "footer" className="border-red-600 border-2 h-52 pb-50 text-center font-bold text-xl " >
                <h2 className="mt-5"> This is Footer </h2>

            </div>

        </div>
        

    )
}; export default HomePage;