import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import { Typography, Button } from "@material-tailwind/react";
import ReactPlayer from "react-player";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ClarifyModal from "../components/clarify_modal/Clarify_modal";
import decryptedPath from "../components/navbar/decryptPath";
import encryptedPath from "../components/navbar/encryptPath";
interface VideoData {
    fileName: string;
    docName: string;
    downloadURL: string;
    createdTime: string;
    createdTimeTH: string;
    event: string;
    Note: string;
    name: string;
    UID: string;
    status: string;
    timeInOut: string;

}

const VideoFootagePage: React.FC = () => {
    const { videoId } = useParams<{ videoId: string }>();
    const decodedVideoId = videoId ? decryptedPath(videoId) : "";
    const [videoData, setVideoData] = useState<VideoData[]>([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(-1);
    const [loading, setLoading] = useState(true);
    const [returnValue, setReturnValue] = useState(1);
    const navigate = useNavigate();
    const [isClarifyModalOpen, setClarifyModalOpen] = useState(false);
    const [passwordIncorrect, setPasswordIncorrect] = useState<boolean>(false);

    const handleUpdateNote = async (document: string, newNote: string, password: string) => {
        try {
            const response = await fetch(`http://localhost:3002/api/updateNote/RFID_Record/${document}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Note: newNote, Password: password }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // console.log(data);
            setClarifyModalOpen(false)
            setPasswordIncorrect(false)
            window.location.reload();
            // Optionally, you can handle success or display a message to the user
        } catch (error) {
            console.error('Error updating data:', error);
            setPasswordIncorrect(true)
            return
            // Optionally, you can handle errors or display a message to the user
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3002/api/all_videos_url");
                const data = await response.json();
                setVideoData(data);
                
                const index = data.findIndex((video: VideoData) => video.fileName === decodedVideoId);
                if (index !== -1) {
                    setCurrentVideoIndex(index);
                    setReturnValue(Math.ceil((index + 1) / 6));
                    setLoading(false);
                } else {
                    console.error("Video not found");
                }
            } catch (error) {
                console.error("Error fetching video data:", error);

            }
        };

        fetchData();
    }, [decodedVideoId]);
    // console.log(returnValue)
    // Debounce function
    const debounce = (func: Function, delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(null, args), delay);
        };
    };

    // Debounce the video change handlers

    const handlePreviousVideo = () => {
        if (currentVideoIndex > 0) {
            setLoading(true);
            setCurrentVideoIndex(currentVideoIndex - 1);
            const prevVideoId = videoData[currentVideoIndex - 1].fileName;
            navigate(encryptedPath(`/footage/${prevVideoId}`));
        }
    };

    const handleNextVideo = () => {
        if (currentVideoIndex < videoData.length - 1) {
            setLoading(true);
            setCurrentVideoIndex(currentVideoIndex + 1);
            const nextVideoId = videoData[currentVideoIndex + 1].fileName;
            navigate(encryptedPath(`/footage/${nextVideoId}`));
        }
    };
    const debouncedHandlePreviousVideo = debounce(handlePreviousVideo, 500);
    const debouncedHandleNextVideo = debounce(handleNextVideo, 500);

    if (loading) {
        // Display loading screen while data is being fetched
        return (
            <div className="flex">
                <Navbar></Navbar>
                <div className="flex-1 p-3 pl-[165px] cursor-default">
                    <div className="flex flex-row pt-10 pl-10 pb-3 ">
                        <Link to={encryptedPath("/footage")} state={Math.ceil(returnValue)}>
                            <Button className="bg-dark-gray h-14 text-xl px-9">
                                ย้อนกลับ
                            </Button>
                        </Link>
                        <Typography>
                            <span className="text-6xl font-bold ml-5"> ฟุตเทจของเหตุการณ์ผิดปกติ </span>
                        </Typography>
                    </div>
                    <div className="flex justify-center items-center flex-1 h-[900px]">
                        <div role="status">
                            <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">กำลังโหลดข้อมูล...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="flex">
            <Navbar></Navbar>
            <div className="flex-1 p-3 pl-[165px] cursor-default">
                <div className="flex flex-row pt-10 pl-10 pb-3 ">
                    <Link to={encryptedPath("/footage")} state={{ currentPage: returnValue }}>

                        <Button className="bg-dark-gray h-14 text-xl px-9">
                            ย้อนกลับ
                        </Button>
                    </Link>

                    <Typography>
                        <span className="text-6xl font-bold ml-5"> ฟุตเทจของเหตุการณ์ผิดปกติ </span>
                    </Typography>
                </div>
                <div>
                    {currentVideoIndex !== -1 && videoData.length > 0 ? (
                        <div className="flex align-middle items-center  px-5 mt-6">
                            <button
                                onClick={debouncedHandlePreviousVideo}
                                className={`flex flex-grow align-middle justify-center ${currentVideoIndex === 0 ? 'cursor-not-allowed opacity-50' : ''
                                    }`}
                                disabled={currentVideoIndex === 0}
                            >
                                <ChevronLeftIcon className="h-10 w-10" />
                            </button>
                            <div className="flex justify-center w-[70%]">
                                <div className="flex flex-col justify-center align-middle">
                                    <div className="rounded-3xl overflow-hidden border">
                                        <ReactPlayer
                                            url={videoData[currentVideoIndex].downloadURL}
                                            width="1280px"
                                            height="720px"
                                            controls={true}
                                            playing={!loading}
                                            onReady={() => setLoading(false)}
                                        />
                                    </div>
                                    <div className="flex relative mt-6">
                                        <span className={`absolute top-1/2 -translate-y-1/2 left-6 rounded-full w-5 h-5 flex items-center justify-center text-xl font-bold ${videoData[currentVideoIndex].status === "Abnormal" ? "bg-abnormal text-white" : videoData[currentVideoIndex].status === "Clarified" ? "bg-clarified" : "bg-normal"} `}></span>
                                        <Typography className="pl-14">
                                            <span className="text-4xl font-semibold">{videoData[currentVideoIndex].createdTimeTH}</span>
                                        </Typography>
                                        <Typography className="pl-6 text-end grow">
                                            <span className="text-3xl font-semibold mr-6">ผู้รับผิดชอบ: {videoData[currentVideoIndex].name}</span>
                                            <span className="text-3xl font-semibold">เลขพนักงาน: {videoData[currentVideoIndex].UID}</span>
                                        </Typography>
                                        
                                        
                                    </div>
                                    <div className="flex relative mt-6 justify-end">
                                        <div className="w-10/12">
                                            <Typography className="pl-6 flex">
                                                <div className="text-2xl font-semibold "> เหตุการณ์ : </div>
                                                <div className="text-2xl font-semibold pl-2"> {videoData[currentVideoIndex].event} </div>
                                            </Typography>
                                            <Typography className="pl-6 pt-3 flex">
                                                <div className="text-2xl font-semibold "> หมายเหตุ :   </div>
                                                <div className="text-2xl font-semibold pl-2"> { videoData[currentVideoIndex].Note} </div>
                                            </Typography>
                                        </div >
                                        <div className="grow"></div>
                                        <div className="flex items-start justify-center">
                                            {videoData[currentVideoIndex].status === "Abnormal" ? (
                                                <Button className="bg-abnormal text-xl text-white font-black" onClick={() => setClarifyModalOpen(true)}>
                                                    แจ้งตรวจสอบ
                                                </Button>
                                            ) : (<Button  disabled={true} className="bg-dark-gray text-xl text-black font-black" onClick={() => setClarifyModalOpen(true)}>
                                                ตรวจสอบแล้ว
                                            </Button>)}
                                            <ClarifyModal showModal={isClarifyModalOpen} closeModal={() => setClarifyModalOpen(false)} videoDocumentId={videoData[currentVideoIndex].docName} updateData={handleUpdateNote} Incorretpassword={passwordIncorrect} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={debouncedHandleNextVideo}
                                className={`flex flex-grow align-middle justify-center ${currentVideoIndex === videoData.length - 1 ? 'cursor-not-allowed opacity-50' : ''
                                    }`}
                                disabled={currentVideoIndex === videoData.length - 1}
                            >
                                <ChevronRightIcon className="h-10 w-10" />
                            </button>
                        </div>
                    ) : (
                        <h1>Video not found</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoFootagePage;
