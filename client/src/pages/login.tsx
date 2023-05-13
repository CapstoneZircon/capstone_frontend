import React ,{useState , useRef , useEffect} from "react";
import {Link , Route , Routes , BrowserRouter} from 'react-router-dom'
import { Button } from "@material-tailwind/react";
import {createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../firebase";
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
// import InsertInput from "../components/hooks/input";

const LoginPage = () => {

    const [userData , setuserData] = useState<userInfo>({'email': "" , 'password': ""});

    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setuserData({...userData , [e.target.name]: e.target.value});
        
    }

    const SubmitHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userData);
    }


    useEffect(() => {
        

    }, [userData.email , userData.password])

    // console.log(userData);
    
    return(

        <div className="h-screen flex flex-row justify-center items-center bg-backg-gray">
            <div className="basis-2/4 flex justify justify-center ">
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
                                        <img className = "w-48 h-full" src="/images/Zircon_logo.png" />
                                    </div>
                                </div>
                            </div>
                        </CardFooter>
                        
                    </Card>
                    <Link to="signup">
                        <div className="text-white underline text-center mt-3 font-bold text-lg">
                            Request for an account
                        </div>
                    </Link>
                </div>

            </div>
            <div className="basis-1/3  my-auto ">
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
                <form className=" py-5 flex flex-col gap-y-3" onSubmit={SubmitHandler}>
                    <Input className="col" name = "email" value={userData.email} onChange ={changeHandler} label="Email" size="lg" type="text"/>
                    <Input className="col" name = "password" type = "password" value={userData.password} onChange = {changeHandler} label="Password" size="lg" />
                    <Button className="col mt-3" type="submit" variant="gradient" color = 'gray' fullWidth>
                                Sign In
                    </Button>
                </form>
                    <div className="-ml-2.5">
                        <Checkbox label="Remember Me" />
                    </div>
                    </CardBody>

                    

                </Card>

              </div>



              </div>


    )

}; export default LoginPage;