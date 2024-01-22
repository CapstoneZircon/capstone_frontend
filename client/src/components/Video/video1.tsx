import ReactPlayer from 'react-player';
import React from 'react';

const Video1 = ({play }: { play:boolean}) => {
    return(
        <ReactPlayer
                            // url= "rtsp://admin:admin1234@192.168.1.108:554/cam/realmonitor?channel=1&subtype=0"
                            url= "/videos/vdo1.mp4"
                            width= "100%"
                            height="100%"
                            controls={play}
                            playing={play}
                            />
    )
}; export default Video1;