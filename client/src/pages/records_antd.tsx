import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import { Typography, Card, CardBody, CardFooter, Checkbox } from '@material-tailwind/react';
import { Pagination } from 'antd';

const Records = () => {
  type SelectedStatusGroups = {
    Abnormal: boolean;
    Clarified: boolean;
    CheckInOut: boolean;
  };
  type Importer = {
    [key: string]: string;
  };
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ importers: Importer[] }>({
    importers: [
      {
        name: "",
        UID: "",
        Status: "",
        TimeInOut: "",
      },
    ],
  });
  const [selectedStatusGroups, setSelectedStatusGroups] = useState({
    Abnormal: true,
    Clarified: true,
    CheckInOut: true,
  });

  const [pageSize, setPageSize] = useState(5); // Default page size
  const getStatusTextTH = (status: any) => {
    if (status === 'Abnormal') {
      return 'ผิดปกติ';
    } else if (status === 'Clarified') {
      return 'ตรวจสอบแล้ว';
    } else if (status === 'Check-in') {
      return 'เช็คอิน';
    } else if (status === 'Check-out') {
      return 'เช็คเอาท์';
    } else {
      return status;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:3002/api/rfid_record'); // Assuming your API endpoint is '/api/rfid_record'
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        // console.log(responseData)
        setData({ importers: responseData });
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const columnNames = Object.keys(data.importers.length > 0 ? data.importers[0] : []);
  // console.log("columnNames", columnNames)
  const [active, setActive] = React.useState(1);

  const onChangePage = (page: number) => {
    setActive(page);
  };

  const onChangePageSize = (current: number, size: number) => {
    setPageSize(size);
    setActive(1); // Reset to the first page when page size changes
  };

  const handleCheckboxChange = (statusGroup: keyof SelectedStatusGroups) => {
    setSelectedStatusGroups({
      ...selectedStatusGroups,
      [statusGroup]: !selectedStatusGroups[statusGroup],
    });
    setActive(1);
  };


  const filteredData = Array.isArray(data.importers) ? data.importers.filter((item: Importer) => {
    if (selectedStatusGroups.Abnormal && item.Status === 'Abnormal') return true;
    if (selectedStatusGroups.Clarified && item.Status === 'Clarified') return true;
    if (selectedStatusGroups.CheckInOut && (item.Status === 'Check-in' || item.Status === 'Check-out')) return true;
    return false;
  }) : [];
  // console.log("filteredData : ", filteredData)

  const itemsPerPage = pageSize;
  const startIndex = (active - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedImporters = filteredData.length > 0 ? filteredData.slice(startIndex, endIndex) : [];
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  // paginatedImporters.forEach((importer, index) => {
  //   columnNames.map((columnName) => {
  //     console.log(importer[columnName], typeof (importer[columnName]))
  //   });
  // });



  if (loading) {
    return (
      <div className="flex">
        <Navbar></Navbar>

        <div className="flex-1 p-4 pl-[165px] cursor-default">
          <div className="pt-10 pl-10 pb-3 flex flex-row">
            <Typography className="grow">
              <span className="text-6xl font-bold "> บันทึกข้อมูล RFID </span>
            </Typography>
            <div className="space-x-2 mr-20 mt-12">
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
              <Checkbox
                id="checkInOutCheckbox"
                checked={selectedStatusGroups.CheckInOut}
                onChange={() => handleCheckboxChange('CheckInOut')}
                label="เช็คอิน เช็คเอาท์"
                className='checked:bg-normal checked:border-normal'
              />
            </div>
          </div>

          <div className="flex-1 ml-11 mr-9 -mt-2 h-[865px]">

            <Card className="rounded-3xl h-full w-full bg-light-gray min-h-[835px]">
              <CardBody className="max-h-full flex-1 relative">


                <div className="w-full h-full">
                  <table className="w-full h-full mt-0 cursor-default">
                    <thead>
                      <tr>
                        <th className="px-5 pt-5 pb-4 w-40 text-3xl"></th>
                        <th className="px-5 pt-5 pb-4 pl-5 w-3/12 text-3xl text-start">
                          ชื่อ
                        </th>
                        <th className="px-5 pt-5 pb-4 pl-5 w-2/12 text-3xl text-start">
                          เลขพนักงาน
                        </th>
                        <th className="px-5 pt-5 pb-4 w-2/12 text-3xl">สถานะ</th>
                        <th className="px-5 pt-5 pb-4 w-3/12 text-3xl">เวลา</th>
                        <th className="px-5 pt-5 pb-4 w-2/12 text-3xl">หมายเหตุ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <></>
                    </tbody>
                  </table>
                  <div role="status">
                    <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 left-1/2  top-1/2 absolute" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">กำลังโหลดข้อมูล...</span>
                  </div>
                </div>

              </CardBody>
              <CardFooter className="flex justify-center mt-auto">
                <div className="flex items-center gap-4">
                  <Pagination
                    current={active}
                    onChange={onChangePage}
                    total={filteredData.length}
                    pageSize={itemsPerPage}
                    showSizeChanger={false}
                    onShowSizeChange={onChangePageSize}
                    pageSizeOptions={['5', '10', '20']}
                  />
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div >

    )
  }
  return (
    <div className="flex">
      <Navbar></Navbar>

      <div className="flex-1 p-4 pl-[165px] cursor-default">
        <div className="pt-10 pl-10 pb-3 flex flex-row">
          <Typography className="grow">
            <span className="text-6xl font-bold"> บันทึกข้อมูล RFID </span>
          </Typography>
          <div className="space-x-2 mr-20 mt-12">
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
            <Checkbox
              id="checkInOutCheckbox"
              checked={selectedStatusGroups.CheckInOut}
              onChange={() => handleCheckboxChange('CheckInOut')}
              label="เช็คอิน เช็คเอาท์"
              className='checked:bg-normal checked:border-normal'
            />
          </div>
        </div>

        <div className="flex-1 ml-11 mr-9 -mt-2 ">

          <Card className="rounded-3xl h-full w-full bg-light-gray">
            <CardBody className="max-h-full flex-1 relative">


              <div className="w-full h-full">
                {filteredData.length > 0 ? (
                  <table className="w-full h-full mt-0 cursor-default">
                    <thead>
                      <tr>
                        <th className="px-5 pt-5 pb-4 pl-5 w-3/12 text-3xl text-start">
                          ชื่อ
                        </th>
                        <th className="px-5 pt-5 pb-4 pl-5 w-2/12 text-3xl text-start">
                          เลขพนักงาน
                        </th>
                        <th className="px-5 pt-5 pb-4 w-2/12 text-3xl">สถานะ</th>
                        <th className="px-5 pt-5 pb-4 w-3/12 text-3xl">เวลา</th>
                        <th className="px-5 pt-5 pb-4 w-2/12 text-3xl">หมายเหตุ</th>
                      </tr>
                    </thead>

                    <tbody className="">
                      {paginatedImporters.map((importer, index) => (
                        <tr key={index} className="h-32">
                          {columnNames.map((columnName) => (
                            <td
                              key={columnName}
                              className={columnName === "name" || columnName === "UID"
                                ? "text-left"
                                : "text-center"}

                            >
                              { columnName === "Status" ? (
                                // <span
                                //   className={`text-2xl font-bold flex items-center justify-center w-4/5 h-14 p-2 ${importer[columnName] === "Abnormal"
                                //     ? "inline-flex items-center rounded-xl bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/70"
                                //     : importer[columnName] === "detect" ||  importer[columnName] === "Forget to scan when exit"
                                //       ? "inline-flex items-center rounded-xl bg-yellow-100 text-yellow-900 ring-1 ring-inset ring-yellow-600/70"
                                //       : "inline-flex items-center rounded-xl bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/70"
                                //     }`}
                                // >
                                <span
                                  className={`text-2xl font-bold flex items-center justify-center h-14 w-11/12  ${importer[columnName] === "Abnormal"
                                    ? "inline-flex items-center rounded-xl bg-abnormal text-white"
                                    : importer[columnName] === "Clarified"
                                      ? "inline-flex items-center rounded-xl bg-clarified "
                                      : "inline-flex items-center rounded-xl bg-normal"
                                    }`}
                                >
                                  {getStatusTextTH(importer[columnName])}
                                </span>
                              ) : columnName === "Note" ? (
                                <Typography className="text-2xl font-bold max-h-28 overflow-y-auto items-center">
                                  {importer[columnName]}
                                </Typography>
                              ) : (
                                <Typography>
                                  <div className="text-4xl font-bold">
                                    {importer[columnName]}
                                  </div>
                                </Typography>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                      {active === totalPages && paginatedImporters.length < 5 && (
                        <>
                          {Array.from({ length: 5 - paginatedImporters.length }, (_, index) => (
                            <tr key={`empty-row-${index}`} className="h-32">

                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                ) : (
                  <div className="w-full h-full mt-0">
                    <div>
                      <table className="w-full h-auto mt-0">
                        <thead>
                          <tr>
                            <th className="px-5 pt-5 pb-4 w-40 text-3xl"></th>
                            <th className="px-5 pt-5 pb-4 pl-5 w-5/12 text-3xl text-start">
                              ชื่อ
                            </th>
                            <th className="px-5 pt-5 pb-4 pl-5 w-2/12 text-3xl text-start">
                              เลขพนักงาน
                            </th>
                            <th className="px-5 pt-5 pb-4 w-2/12 text-3xl">สถานะ</th>
                            <th className="px-5 pt-5 pb-4 w-3/12 text-3xl">เวลา</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <span className='flex justify-center items-top h-auto mt-20'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="90px" height="90px" viewBox="0 0 24 24"><path fill="currentColor" d="M22.54 21.12L20.41 19l2.13-2.12l-1.42-1.42L19 17.59l-2.12-2.13l-1.42 1.42L17.59 19l-2.13 2.12l1.42 1.42L19 20.41l2.12 2.13M6 2a2 2 0 0 0-2 2v16c0 1.11.89 2 2 2h7.81c-.36-.62-.61-1.3-.73-2H6V4h7v5h5v4.08c.33-.05.67-.08 1-.08c.34 0 .67.03 1 .08V8l-6-6M8 12v2h8v-2m-8 4v2h5v-2Z" /></svg>

                    </span>
                    <Typography>
                      <span className="text-2xl font-bold text-center w-full flex justify-center mt-4">ไม่มีข้อมูลที่พร้อมใช้งาน</span>
                    </Typography>
                  </div>

                )}

              </div>
            </CardBody>
            <CardFooter className="flex justify-center mt-auto">
              <div className="flex items-center gap-4">
                <Pagination
                  current={active}
                  onChange={onChangePage}
                  total={filteredData.length}
                  pageSize={itemsPerPage}
                  showSizeChanger={false}
                  onShowSizeChange={onChangePageSize}
                  pageSizeOptions={['5', '10', '20']}
                />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Records;
