import React from 'react'
import Video1 from './video1'
import Video2 from './video2'

const Video = ({ state }: { state: boolean }) => {
    let status = state;
    // console.log( status);

    if(status === true){
        // console.log("video1");
    return(
       <Video1/>
    )}else{
        // console.log("video2");
        return(
            <Video2/>
        )
    }

}; export default Video;