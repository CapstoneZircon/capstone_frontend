import React from 'react'
import Video1 from './video1'
import Video2 from './video2'
import ReactPlayer from 'react-player';

const Video = ({ state, playing }: { state: boolean , playing:boolean}) => {
    let status = state; 
    // console.log( status);
    if(status === true){
        console.log(ReactPlayer.canPlay("/videos/vdo1.mp4"))
    return(
       <Video1 play = {playing}/>
    )}else{
        console.log(ReactPlayer.canPlay("/videos/vdo2.mp4"));
        return(
            <Video2 play = {playing}/>
        )
    }

}; export default Video;