import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import { Typography, Card, CardBody, CardFooter } from '@material-tailwind/react';
import { Pagination } from 'antd';

const Records = () => {

  type Importer = {
    [key: string]: string;
  };

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

  const [pageSize, setPageSize] = useState(5); // Default page size

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/rfid_record'); // Assuming your API endpoint is '/api/rfid_record'
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        console.log(responseData)
        setData({ importers: responseData });
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

  const itemsPerPage = pageSize;
  const startIndex = (active - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedImporters = data.importers.length > 0 ? data.importers.slice(startIndex, endIndex) : [];
  const totalPages = Math.ceil(data.importers.length / itemsPerPage);
  paginatedImporters.forEach((importer, index) => {
    columnNames.map((columnName) => {
      console.log(importer[columnName], typeof (importer[columnName]))
    });
  });
  const MAX_VISIBLE_PAGES = 5;
  const startPage = Math.max(1, active - Math.floor(MAX_VISIBLE_PAGES / 2));
  const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);
  const visiblePageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

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
                      <th className="px-5 pt-5 pb-4 pl-5 w-auto text-3xl text-start">
                        Name
                      </th>
                      <th className="px-5 pt-5 pb-4 pl-5 w-1/12 text-3xl text-start">
                        UID
                      </th>
                      <th className="px-5 pt-5 pb-4 w-2/12 text-3xl">Status</th>
                      <th className="px-5 pt-5 pb-4 w-3/12 text-3xl">InOutTime</th>
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
                                  className={`text-2xl font-bold flex items-center justify-center h-14 px-4 ${importer[columnName] === "Abnormal"
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
                  total={data.importers.length}
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
