import ReactPlayer from 'react-player';
import React from 'react';

const Video1 = () => {
    return(
        <ReactPlayer
                            url= "/videos/vdo1.mp4"
                            width="100%"
                            height="90%"
                            controls
                            />
    )
}; export default Video1;