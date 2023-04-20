import React , {  Component , useEffect, useState } from 'react'

export interface userInfo{
    username: string;
    password: string;
}

export default function LoginCheck({username, password}:userInfo){

    const [data , setData] = useState<userInfo | null>(null);

    try{
        setData({username , password});
        console.log(data);
    }
    catch (error){
        console.error("Problems with sending Names.;" , error);
    }

    return data
}



