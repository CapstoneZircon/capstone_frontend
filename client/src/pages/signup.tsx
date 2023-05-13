import React ,{useState} from "react";
import {Link , Route , Routes , BrowserRouter} from 'react-router-dom'
import { Button } from "@material-tailwind/react";
import {createUserWithEmailAndPassword ,updateProfile } from 'firebase/auth'
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
import { Image } from "react-bootstrap";

const SignUpPage = () => {

    const [err, setErr] = useState(false);
    const [userData , setuserData] = useState({'email': "" , 'password': "" , "Name": "" , "Surname": "" , "Id": ""});

    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setuserData({...userData , [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try{
            const res = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
            console.log(res);

        }catch(err:any){
            setErr(err);
        }

    }

    return(

        <div className="flex bg-backg-gray justify-center">

            <div className="my-auto h-screen flex items-center justify-center">
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
                    <CardBody>
                    <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                        <Input className="block" name="email" onChange={changeHandler} value={userData.email} label="Email *" size="lg" />
                        <Input name="password" onChange={changeHandler} value={userData.password} label="Password *" size="lg" type="password" />
                        <Input name="Name" onChange={changeHandler} value={userData.Name} label="Name" size="lg" />
                        <Input name="Surname" onChange={changeHandler} value={userData.Surname} label="Surname" size="lg" />
                        <Input name="Id" onChange={changeHandler} value={userData.Id} label="Employee ID" size="lg" />
                        <p className="text-red-600 text-xs italic"> * is required </p>
                        <Button className="my-5" type="submit" variant="gradient" color = 'gray' fullWidth>
                                Request
                        </Button>
                        {err && <span className="text-red-400 text-md font-normal"> Something went wrong </span>}
                    </form>
                    </CardBody>

                </Card>

              </div>



              </div>


    )

}; export default SignUpPage;