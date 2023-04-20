import ReactPlayer from 'react-player';
import React from 'react';

const Video2 = () => {
    return(
        <ReactPlayer
                            url= "/videos/vdo2.mp4"
                            width="100%"
                            height="90%"
                            controls
                            />
    )
}; export default Video2;