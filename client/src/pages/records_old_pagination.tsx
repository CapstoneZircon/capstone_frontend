import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  Typography,
  Button,
  IconButton,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

const Records1 = () => {
  type Importer = {
    [key: string]: string[];
  };

  const [data, setData] = useState<{ importers: Importer[] }>({
    importers: [
      {
        picture: [] as string[],
        name: [] as string[],
        UID: [] as string[],
        status: [] as string[],
        timestamp_in: [] as string[],
        timestamp_out: [] as string[],
      },
    ],
  });

  useEffect(() => {
    setData((prevData) => {
      const newImporters = [];
      for (let i = 0; i < 403; i++) {
        const picture = "/images/Employee-resize.jpg";
        const names = ["Alice", "Bob", "Charlie", "David"];

        const name = names[Math.floor(Math.random() * names.length)];
        const status =
          i % 4 === 0
            ? "detect"
            : i % 3 === 0
              ? "abnormal"
              : i % 2 === 0
                ? "in"
                : "out";
        const timestamp_in = `${Math.floor(Math.random() * 24)}:${Math.floor(
          Math.random() * 60
        )}`;
        // Add 12 hours to timestamp_in for timestamp_out
        const timestamp_out = `${(parseInt(
          timestamp_in.split(":")[0]
        ) +
          12) %
          24}:${Math.floor(Math.random() * 60)}`;
        // Generate UID with 1 letter and 4 digits
        const uid = `${String.fromCharCode(65 + i)}${Math.floor(
          1000 + Math.random() * 9000
        )}`;
        const newImporter = {
          picture: [picture],
          name: [name],
          UID: [uid],
          status: [status],
          timestamp_in: [timestamp_in],
          timestamp_out: [timestamp_out],
        };

        newImporters.push(newImporter);
      }

      return {
        importers: [...newImporters],
      };
    });
  }, []);

  const columnNames = Object.keys(data.importers[0]);
  console.log(data.importers);

  const [active, setActive] = React.useState(1);

  const getItemProps = (index: number) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
    className: "rounded-full",
  } as any);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.importers.length / itemsPerPage); // Move this line here

  const startIndex = (active - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedImporters = data.importers.slice(startIndex, endIndex);

  //pagnition
  const MAX_VISIBLE_PAGES = 5;

  const startPage = Math.max(1, active - Math.floor(MAX_VISIBLE_PAGES / 2));
  const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

  const visiblePageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const next = () => {
    if (active === totalPages) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

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
                      <th className="px-5 pt-5 pb-4 pl-5 w-1/6 text-3xl text-start">
                        UID
                      </th>
                      <th className="px-5 pt-5 pb-4 w-1/6 text-3xl">Status</th>
                      <th className="px-5 pt-5 pb-4 w-1/6 text-3xl">In-Time</th>
                      <th className="px-5 pt-5 pb-4 w-1/6 text-3xl">OUT-Time</th>
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
                                  src={importer[columnName][0]}
                                  className="object-cover object-top w-24 h-24 rounded-full mx-auto"
                                  alt="Employee"
                                />
                              ) : columnName === "status" ? (
                                <span
                                  className={`text-2xl font-bold flex items-center justify-center w-3/5 h-14 ${importer[columnName][0] === "abnormal"
                                    ? "inline-flex items-center rounded-xl bg-red-50 px-2 py-1 text-red-700 ring-1 ring-inset ring-red-600/70"
                                    : importer[columnName][0] === "detect"
                                      ? "inline-flex items-center rounded-xl bg-yellow-100 px-2 py-1 text-yellow-900 ring-1 ring-inset ring-yellow-600/70"
                                      : "inline-flex items-center rounded-xl bg-green-50 px-2 py-1 text-green-700 ring-1 ring-inset ring-green-600/70"
                                    }`}
                                >
                                  {importer[columnName][0]}
                                </span>
                              ) : (
                                <Typography>

                                  <span className="text-4xl font-bold">
                                    {importer[columnName][0]}
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
                <Button
                  variant="text"
                  className="flex items-center gap-2 rounded-full"
                  onClick={prev}
                  disabled={active === 1}
                >
                  <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                </Button>
                <div className="flex items-center gap-2">
                  {totalPages <= 7 && (
                    Array.from({ length: Math.min(totalPages, 7) }, (_, i) => (
                      <IconButton key={i + 1} {...getItemProps(i + 1)}>
                        {i + 1}
                      </IconButton>
                    ))
                  )}
                  {startPage <= 3 && totalPages > 7 && (
                    Array.from({ length: Math.min(totalPages, 7) }, (_, i) => (
                      <IconButton key={i + 1} {...getItemProps(i + 1)}>
                        {i + 1}
                      </IconButton>
                    ))
                  )}
                  {startPage > 3 && totalPages > 7 && (
                    <>
                      <IconButton {...getItemProps(1)}>
                        {1}
                      </IconButton>
                      <IconButton
                        {...getItemProps(Number(startPage) - Math.round(MAX_VISIBLE_PAGES / 2) >= 4 ? startPage - Math.round(MAX_VISIBLE_PAGES / 2) : 3)}
                      >
                        &lt;&lt;
                      </IconButton>
                    </>
                  )}
                  {startPage > 3 && endPage < totalPages - 2 && visiblePageNumbers.map((page) => (
                    <IconButton key={page} {...getItemProps(page)}>
                      {page}
                    </IconButton>
                  ))}
                  {endPage < totalPages - 2 && totalPages > 10 && (
                    <>
                      {endPage < totalPages - 1 && (
                        <IconButton
                          {...getItemProps(Number(endPage) + Math.round(MAX_VISIBLE_PAGES / 2) <= 258 ? endPage + Math.round(MAX_VISIBLE_PAGES / 2) : totalPages - 1)}
                        >
                          &gt;&gt;
                        </IconButton>
                      )}
                      <IconButton {...getItemProps(totalPages)}>
                        {totalPages}
                      </IconButton>
                    </>
                  )}
                  {endPage >= totalPages - 2 && endPage >= 8 && (Array.from({ length: Math.min(totalPages, 7) }, (_, i) => (
                    <IconButton key={i + 1} {...getItemProps(totalPages - 6 + i)}>
                      {totalPages - 6 + i}
                    </IconButton>
                  ))
                  )}
                </div>
                <Button
                  variant="text"
                  className="flex items-center gap-2 rounded-full"
                  onClick={next}
                  disabled={active === totalPages}
                >
                  Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>


          </Card>
        </div>
      </div>
    </div>
  );
};
export default Records1;
