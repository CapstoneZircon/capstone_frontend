import React from 'react';

const colorStatus = (val : String) => {
    if(val == 'late'){
        return(
            <p className=' text-red-600'> {val} </p>
        )
    }else {
        if(val == 'delivery'){
            return(
                <p className=' text-green-300'> {val} </p>
            )
        }else {
            return(
                <p className=' text-black'> {val} </p>
            )
        }
    }
};export default colorStatus