import ReactPlayer from 'react-player';
import React from 'react';

const Video2 = ({play }: { play:boolean}) => {
    return(
        <ReactPlayer
                            url= "/videos/vdo2.mp4"
                            width="100%"
                            height="100%"
                            controls={play}
                            playing={play}
                            startTime={!play?0:100}
                            />
    )
}; export default Video2;