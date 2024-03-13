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
        picture: "",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:8080/api/rfid_record'); // Assuming your API endpoint is '/api/rfid_record'
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        console.log(responseData)
        setData({ importers: responseData });
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const columnNames = Object.keys(data.importers.length > 0 ? data.importers[0] : []);
  console.log("columnNames", columnNames)
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
  console.log("filteredData : ", filteredData)

  const itemsPerPage = pageSize;
  const startIndex = (active - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedImporters = filteredData.length > 0 ? filteredData.slice(startIndex, endIndex) : [];
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  paginatedImporters.forEach((importer, index) => {
    columnNames.map((columnName) => {
      console.log(importer[columnName], typeof (importer[columnName]))
    });
  });



  if (loading) {
    return (
      <div className="flex">
        <Navbar></Navbar>

        <div className="flex-1 p-4 pl-[165px]">
          <div className="pt-10 pl-10 pb-3">
            <Typography>
              <span className="text-6xl font-bold"> RFID Records </span>
            </Typography>
          </div>
          <div className="flex-1 ml-11 mr-9 mt-5 h-[865px]">
            <Card className="rounded-3xl h-full w-full bg-light-gray">
              <CardBody className="max-h-full flex-1">

                <div className="w-full h-full">
                  <table className="w-full h-full mt-4">
                    <thead>
                      <tr>
                        <th className="px-5 pt-5 pb-4 w-40 text-3xl"></th>
                        <th className="px-5 pt-5 pb-4 pl-5 w-4/12 text-3xl text-start">
                          Name
                        </th>
                        <th className="px-5 pt-5 pb-4 pl-5 w-3/12 text-3xl text-start">
                          UID
                        </th>
                        <th className="px-5 pt-5 pb-4 w-2/12 text-3xl">Status</th>
                        <th className="px-5 pt-5 pb-4 w-3/12 text-3xl">Time</th>
                      </tr>
                    </thead>
                  </table>
                  <div role="status">
                    <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 left-1/2  top-1/2 absolute" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="flex justify-center mt-auto">
                <div className="flex items-center gap-4">
                  <Pagination
                    current={active}
                    onChange={onChangePage}
                    total={data.importers.length}
                    pageSize={itemsPerPage}
                    showSizeChanger={false}
                    // onShowSizeChange={onChangePageSize}
                    pageSizeOptions={['5', '10', '20']}
                  />
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex">
      <Navbar></Navbar>

      <div className="flex-1 p-4 pl-[165px]">
        <div className="pt-10 pl-10 pb-3 flex flex-row">
          <Typography className="grow">
            <span className="text-6xl font-bold"> RFID Records </span>
          </Typography>
          <div className="space-x-2 mr-20 mt-12">
                <Checkbox
                  id="abnormalCheckbox"
                  checked={selectedStatusGroups.Abnormal}
                  onChange={() => handleCheckboxChange('Abnormal')}
                  label="Abnormal"
                  className='checked:bg-abnormal checked:border-abnormal'
                />
                <Checkbox
                  id="clarifiedCheckbox"
                  checked={selectedStatusGroups.Clarified}
                  onChange={() => handleCheckboxChange('Clarified')}
                  label="Clarified"
                  className='checked:bg-clarified checked:border-clarified'
                />
                <Checkbox
                  id="checkInOutCheckbox"
                  checked={selectedStatusGroups.CheckInOut}
                  onChange={() => handleCheckboxChange('CheckInOut')}
                  label="Check In-Out"
                  className='checked:bg-normal checked:border-normal'
                />
              </div>
        </div>
        
        <div className="flex-1 ml-11 mr-9 -mt-2 h-[865px]">
        
          <Card className="rounded-3xl h-full w-full bg-light-gray">
            <CardBody className="max-h-full flex-1 relative">
              

              <div className="w-full h-full">
                <table className="w-full h-full mt-0">
                <thead>
                      <tr>
                        <th className="px-5 pt-5 pb-4 w-40 text-3xl"></th>
                        <th className="px-5 pt-5 pb-4 pl-5 w-5/12 text-3xl text-start">
                          Name
                        </th>
                        <th className="px-5 pt-5 pb-4 pl-5 w-2/12 text-3xl text-start">
                          UID
                        </th>
                        <th className="px-5 pt-5 pb-4 w-2/12 text-3xl">Status</th>
                        <th className="px-5 pt-5 pb-4 w-3/12 text-3xl">Time</th>
                      </tr>
                    </thead>
                  {data.importers.length > 0 ? (
                    <tbody className="">
                      {paginatedImporters.map((importer, index) => (
                        <tr key={index} className="h-32">
                          {columnNames.map((columnName) => (
                            <td
                              key={columnName}
                              className={`px-5 py-2 ${columnName === "name" || columnName === "UID"
                                ? "text-left"
                                : "text-center"
                                }`}
                            >
                              {columnName === "picture" ? (
                                <img
                                  src={importer[columnName]}
                                  className="object-cover object-top w-24 h-24 rounded-full mx-auto"
                                  alt="Employee"
                                />
                              ) : columnName === "Status" ? (
                                // <span
                                //   className={`text-2xl font-bold flex items-center justify-center w-4/5 h-14 p-2 ${importer[columnName] === "Abnormal"
                                //     ? "inline-flex items-center rounded-xl bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/70"
                                //     : importer[columnName] === "detect" ||  importer[columnName] === "Forget to scan when exit"
                                //       ? "inline-flex items-center rounded-xl bg-yellow-100 text-yellow-900 ring-1 ring-inset ring-yellow-600/70"
                                //       : "inline-flex items-center rounded-xl bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/70"
                                //     }`}
                                // >
                                <span
                                  className={`text-2xl font-bold flex items-center justify-center h-14 w-8/12  ${importer[columnName] === "Abnormal"
                                    ? "inline-flex items-center rounded-xl bg-abnormal text-white"
                                    : importer[columnName] === "Clarified"
                                      ? "inline-flex items-center rounded-xl bg-clarified "
                                      : "inline-flex items-center rounded-xl bg-normal"
                                    }`}
                                >
                                  {importer[columnName]}
                                </span>
                              ) : (
                                <Typography>

                                  <span className="text-4xl font-bold">
                                    {importer[columnName]}
                                  </span>
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
                  ) : (
                    <div>No records available.</div>
                  )}
                </table>
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
