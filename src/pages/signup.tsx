import React ,{useState} from "react";
import {Link , Route , Routes , BrowserRouter} from 'react-router-dom'
import { Button } from "@material-tailwind/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,

  } from "@material-tailwind/react";
import { Image } from "react-bootstrap";

const SignUpPage = () => {


    return(

        <div className="flex flex-row bg-backg-gray py-40">
            <div className="basis-2/3 flex justify justify-center py-10">
                <div className="my-5">
                    <Card className="w-96 border-red-600 border-2 text-center ">
                        <CardHeader className="pb-3 mb-3">
                            <Typography> <span className="text-2xl font-bold"> WareHouse  Department </span> </Typography>
                        </CardHeader>
                        <CardBody>
                            <img src="/images/yuanter.jpg" />
                        </CardBody>
                        <CardFooter>
                            <div className="flex flex-row  item-center justify-center ">
                                <div className="mx-5 mt-7 ">
                                    <Typography> <span className="font-bold text-xl"> By: </span> </Typography>
                                </div>
                                <div>
                                    <div className="flex item-center justify-center text-center">
                                        <img className = "w-48 h-full" src="/images/Zircon_logo.png" />
                                    </div>
                                </div>
                            </div>
                        </CardFooter>
                        
                    </Card>
                </div>

            </div>
            <div className="basis-1/3  my-auto">
                <Card className="w-96">
                    <CardHeader
                    variant="gradient"
                    color="blue"
                    className="mb-4 grid h-28 place-items-center"
                    >
                    <Typography variant="h3" color="white">
                        Sign up
                    </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                    <Input label="Email" size="lg" />
                    <Input label="Password" size="lg" />
                    <Input label="Name" size="lg" />
                    <Input label="Surname" size="lg" />
                    <Input label="Employee ID" size="lg" />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Link to="..">
                            <Button variant="gradient" color = 'gray' fullWidth>
                                Request
                            </Button>
                        </Link>
                    </CardFooter>

                </Card>

              </div>



              </div>


    )

}; export default SignUpPage;