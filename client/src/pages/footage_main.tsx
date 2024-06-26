import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader, Checkbox, } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import { Pagination } from "antd";
import { formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';

interface VideoData {
  fileName: string;
  downloadURL: string;
  createdTime: string;
  thumbnailURL: string;
  status: string;
  createdTimeTH: string;
}
type SelectedStatusGroups = {
  Abnormal: boolean;
  Clarified: boolean;
  CheckInOut: boolean;
};

const ITEMS_PER_PAGE = 6;

const Footages = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [videoData, setVideoData] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const returnValue = state;
  const [selectedStatusGroups, setSelectedStatusGroups] = useState({
    Abnormal: true,
    Clarified: true,
    CheckInOut: true,
  });
  const getStatusTextTH = (status:any) => {
    if (status === 'Abnormal') {
      return 'ผิดปกติ';
    } else if (status === 'Clarified') {
      return 'ตรวจสอบแล้ว';
    } else {
      // Handle other statuses here
      return status; // Return the status as it is if not abnormal or clarify
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        // const cachedData = localStorage.getItem('videoData');
        // if (cachedData) {
        //   setVideoData(JSON.parse(cachedData));
        // }

        const response = await fetch("http://localhost:3002/api/all_videos_url");

        const data = await response.json();
        setVideoData(data);
        localStorage.setItem('videoData', JSON.stringify(data));
        // console.log("cachedData", cachedData)
        if (returnValue && returnValue.currentPage) {
          setCurrentPage(returnValue.currentPage);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching video data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleCheckboxChange = (statusGroup: keyof SelectedStatusGroups) => {
    setLoading(true);

    setTimeout(() => {
      setSelectedStatusGroups((prevStatusGroups) => ({
        ...prevStatusGroups,
        [statusGroup]: !prevStatusGroups[statusGroup],
      }));
      setCurrentPage(1);
      setLoading(false);
    }, 100);
  };

  const filteredData = Array.isArray(videoData) ? videoData.filter((videoData) => {
    if (selectedStatusGroups.Abnormal && videoData.status === 'Abnormal') return true;
    if (selectedStatusGroups.Clarified && videoData.status === 'Clarified') return true;
    if (selectedStatusGroups.CheckInOut && (videoData.status === 'Check-in' || videoData.status === 'Check-out')) return true;
    return false;
  }) : [];

  const totalItems = videoData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const getCurrentItems = (): VideoData[] => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getDaysAgo = (createdTime: string) => {
    const now = new Date();
    const createdAt = new Date(createdTime);
    const daysAgo = formatDistanceToNow(createdAt, { addSuffix: true, locale: th });
    return daysAgo;
};

  if (loading) {
    // Display loading screen while data is being fetched
    return (
      <div className="flex">
        <Navbar></Navbar>

        <div className="flex-1 p-3 pl-[165px]">
          <div className="pt-10 pl-10 pb-3 flex flex-row">
            <Typography className="grow">
              <span className="text-6xl font-bold">  ฟุตเทจของเหตุการณ์ผิดปกติ </span>
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

      <div className="flex-1 p-3 pl-[165px]">
        <div className="pt-10 pl-10 pb-0 flex flex-row">
          <Typography className="grow">
            <span className="text-6xl font-bold">  ฟุตเทจของเหตุการณ์ผิดปกติ </span>
          </Typography>
          <div className="space-x-2 mr-11 mt-12">
            <Checkbox
              id="abnormalCheckbox"
              checked={selectedStatusGroups.Abnormal}
              onChange={() => handleCheckboxChange('Abnormal')}
              label="ผิดปกติ"
              className='checked:bg-abnormal checked:border-abnormal'
            />
            <Checkbox
              id="clarifiedCheckbox"
              checked={selectedStatusGroups.Clarified}
              onChange={() => handleCheckboxChange('Clarified')}
              label="ตรวจสอบแล้ว"
              className='checked:bg-clarified checked:border-clarified'
            />
          </div>
        </div>
        {filteredData.length > 0 ? (
          <div>
            <div className="grid grid-cols-3 gap-x-12 gap-y-10 ml-11 mt-2 mr-7">
              {getCurrentItems().map((video: VideoData, index: number) => (
                <Link to={`/footage/${video.fileName}`} state={5} key={index}>
                  <Card key={index} className="bg-light-gray rounded-3xl z-10">
                    <CardHeader className="h-72 w-auto mt-4 mx-4 rounded-xl">
                      <img
                        src={video.thumbnailURL}
                        alt={video.fileName}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null; // Prevent infinite loop in case default image also fails to load
                          target.src = '/images/default_warehouse.jpg'; // Set default image URL
                        }}
                      />


                    </CardHeader>
                    <CardBody className="h-[72px] pt-2 relative">
                      <Typography className="text-2xl font-bold">{video.createdTimeTH}</Typography>
                      <Typography className="text-sm font-normal">{getDaysAgo(video.createdTime)}</Typography>
                      <span className={`absolute right-6 bottom-4 ${video?.status === "Abnormal" ? "bg-abnormal text-white" : video?.status === "Clarified" ? "bg-clarified" : "bg-normal"} rounded-full px-4 py-1 flex items-center justify-center text-xl font-bold`}>
                        <Typography> <span className="text-base font-bold"> {getStatusTextTH(video?.status)} </span> </Typography>
                      </span>
                    </CardBody>
                  </Card>
                </Link>

              ))}
            </div>
            <div className="flex justify-center mt-5">
              <Pagination current={currentPage} total={filteredData.length} pageSize={ITEMS_PER_PAGE} onChange={handlePageChange} showSizeChanger={false}/>
            </div>
          </div>
        ) : (
          <div>
            <div className='flex justify-center items-top h-auto mt-20'>
              <svg xmlns="http://www.w3.org/2000/svg" width="90px" height="90px" viewBox="0 0 24 24"><path fill="currentColor" d="M22.54 21.12L20.41 19l2.13-2.12l-1.42-1.42L19 17.59l-2.12-2.13l-1.42 1.42L17.59 19l-2.13 2.12l1.42 1.42L19 20.41l2.12 2.13M6 2a2 2 0 0 0-2 2v16c0 1.11.89 2 2 2h7.81c-.36-.62-.61-1.3-.73-2H6V4h7v5h5v4.08c.33-.05.67-.08 1-.08c.34 0 .67.03 1 .08V8l-6-6M8 12v2h8v-2m-8 4v2h5v-2Z" /></svg>

            </div>
            <Typography>
              <span className="text-2xl font-bold text-center w-full flex justify-center mt-4">ไม่มีข้อมูลที่พร้อมใช้งาน</span>
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footages;
