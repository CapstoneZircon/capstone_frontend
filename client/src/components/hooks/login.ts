import React , {  Component , useEffect, useState } from 'react'
import Axios from 'axios';

export interface userInfo{
    email: string;
    password: string;
}

export default function LoginCheck({email, password}:userInfo){

    const [data , setData] = useState<userInfo | null>(null);

    try{
        setData({email , password});
        console.log(data);
    }
    catch (error){
        console.error("Problems with sending Names.;" , error);
    }

    return data
}



