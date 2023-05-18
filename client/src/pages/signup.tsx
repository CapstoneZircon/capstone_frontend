import React ,{useState} from "react";
import {Link , useNavigate} from 'react-router-dom'
import { Button } from "@material-tailwind/react";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { collection, doc, setDoc } from "firebase/firestore"; 
import { auth , db } from "../firebase";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Input,
  } from "@material-tailwind/react";

const SignUpPage = () => {

    const navigate = useNavigate();

    const docRef = collection(db, "users")

    const [userStatus , setUserStatus] = useState(false);
    const [err, setErr] = useState(false);
    const [userData , setuserData] = useState({'email': "" , 'password': "" , "Name": "" , "Surname": "" , "Id": "" });

    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setuserData({...userData , [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try{
            const res = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
            setUserStatus(true);
            console.log(res)

            await setDoc(doc(docRef, res.user.uid), {
                uid: res.user.uid,
                email: res.user.email,
                name: userData.Name,
                surname: userData.Surname,
                employeeId: userData.Id,
            })
    
            if(userStatus){
                navigate("/home")
            }
        }catch(err:any){
            setErr(err);
            console.log(err);
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
                        <p className="text-red-600 text-xs italic"> * is required <span className="text-black font-bold"> / </span>
                         <span className="text-black"> already have account </span> <Link to='/'> <span className="text-indigo-400 text-xs"> sign in </span> </Link></p>
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