import React from "react";
import {Button, CardBody, CardHeader} from "@material-tailwind/react"
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

            <div id = "Body" className=" mt-4 mb-2 flex flex-row pb-80">
                <div className="basis-4/6 mx-3">
                    <Card className="w-full h-96">
                        <div className="text-2xl font-extrabold ml-11 mt-4 "> <h2> IN - OUT Visualize <a href="/"> &#10093; </a></h2> </div>

                        <CardBody >
                            {/* <img className="w-1/2 h-1/2" src="images/bargraph.jpg"></img> */}
                        </CardBody>
                        

                    </Card>
                </div>

                <div className="basis-2/6 mx-3">
                    <Card className="w-full h-96 bg-feedHome-bg"> 
                        <div className="mt-4">
                            <Typography> <span className="ml-11 text-2xl font-semibold"> ENTERED HISTORY </span> </Typography>
                        </div>
                    </Card>
                </div>

            </div>

            <div id = "footer" className="h-48" >
                <h2> This is Footer </h2>

            </div>

        </div>
        

    )
}; export default HomePage;