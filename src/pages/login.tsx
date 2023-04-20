import React ,{useState , useRef , useEffect} from "react";
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
import { userInfo } from "../components/hooks/login";
import InputForm from "../components/hooks/input";
// import LoginCheck  from "../components/hooks/login";

const LoginPage = () => {

    const [userData , setuserData] = useState({'username': "" , 'password': ""});

    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setuserData({...userData , [e.target.name]: e.target.value});
        console.log(e.target.name);
        console.log(e.target.value);
        
    }
    // const handleChange = (event:React.ChangeEvent<HTMLInputElement> , state:string) => {
    //     if (state === "0"){
    //         setUserName({"username": event.target.value , "password": ""});
    //         console.log(userName);
    //     }else{
    //         setpassword({"username": "" , "password": event.target.value});
    //         console.log(password);
    //     }
    // }

    useEffect(() => {

    }, [userData.username , userData.password])

    // console.log(userData);
    
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
                    <Link to="signup">
                        <div className="text-white underline text-center mt-3">
                            Request for an account
                        </div>
                    </Link>
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
                        Login Page
                    </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                    <Input name = "username" value={userData.username} onChange ={changeHandler} label="Email" size="lg" type="text"/>
                    <Input name = "password" value={userData.password} onChange = {changeHandler} label="Password" size="lg" />
                    <div className="-ml-2.5">
                        <Checkbox label="Remember Me" />
                    </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Link to="/home">
                            <Button variant="gradient" color = 'gray' fullWidth>
                                Sign In
                            </Button>
                        </Link>
                    </CardFooter>

                </Card>

              </div>



              </div>


    )

}; export default LoginPage;