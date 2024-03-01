import React, { useEffect, useState } from "react";
import { Button, CardBody, CardFooter, CardHeader } from "@material-tailwind/react"
import { Card } from "@material-tailwind/react"
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import DonutChart from "../components/Chart/DonutChart";
import Navbar from "../components/navbar/navbar";

interface Record {
	name: string;
	picture: string;
	Status: string;
	TimeInOut: string;
	[key: string]: any;
}

const HomePage = () => {
	const [loading, setLoading] = useState(true);
	const [recentRecords, setRecentRecords] = useState<Record[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch most recent RFID records for dashboard
				setLoading(loading)
				const recordsResponse = await fetch("http://localhost:8080/api/rfid_record_Dashboard");
				const recordsData = await recordsResponse.json();
				setRecentRecords(recordsData);
				setLoading(false)
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const columnNames = recentRecords.length > 0 ? Object.keys(recentRecords[0]) : [];
	const firstRecord = recentRecords.length > 0 ? recentRecords[0] : null;

	console.log(firstRecord?.status)
	return (

		<div className="bg-white min-h-screen flex z-10">

			<Navbar></Navbar>


			<div className="flex-1 p-4 pl-[165px]">
				<div className="pt-10 pl-10 pb-3">
					<Typography> <span className="text-6xl font-bold"> Dashboard </span> </Typography>
				</div>
				{firstRecord && (
					<div className="flex pt-5 pl-1">
						<div>
							<div className="pl-10 relative">
								<Card className="rounded-2xl w-[420px] h-[400px] bg-light-gray ">
									<CardHeader className="m-0 p-2 pt-3 rounded-t-2xl rounded-b-none bg-light-gray border-b-2 border-mid-gray shadow-none">
										<div>
											<Typography>
												<span className="text-2xl font-bold ml-3"> Security Number Overview </span>
											</Typography>
										</div>
									</CardHeader>
									<CardBody className="p-2 flex justify-center items-center">
										<div className="w-80 h-80 relative mt-3">
											<DonutChart />

										</div>
									</CardBody>
									<div className="absolute bottom-14 left-[270px] text-sm text-gray-600">
										within 7 days
									</div>
								</Card>
							</div>


							<div className="pl-10">
								<Card className="rounded-2xl w-[420px] h-[400px] mt-16 bg-light-gray ">
									<CardBody className="mb-4">
										<div className="">
											<Typography> <span className="text-3xl font-bold"> Lastest Activity </span> </Typography>
										</div>
										<div className="flex justify-end items-center h-auto py-6 ">
											<div className="w-40 relative">
												<img src={firstRecord?.picture} className="object-cover object-bottom rounded-full" alt="Employee" />
												<span className={`absolute -bottom-3 -left-14 ${firstRecord?.Status === "Abnormal" ? "bg-red-500 text-white" : firstRecord?.Status === "Clarified" ? "bg-clarified" : "bg-normal"} rounded-full px-4 py-2 flex items-center justify-center text-xl font-bold`}>
													<Typography> <span className="text-xl font-bold"> {firstRecord?.Status} </span> </Typography>
												</span>
											</div>
										</div>
										<div className=" flex flex-col justify-center items-start mt-5 text-black">
											<Typography> <div className="text-5xl font-black"> {firstRecord?.name} </div> </Typography>
											<Typography> <div className="text-2xl font-medium mt-3"> {firstRecord?.TimeInOut} </div> </Typography>
										</div>
									</CardBody>
									{/* <CardFooter className=" border-mid-gray mt-auto">
										
									</CardFooter> */}
								</Card>
							</div>
						</div>

						<Card className="rounded-2xl h-auto  min-w-[1160px] w-auto ml-20 bg-light-gray">
							<CardBody>
								<div className="p-3">
									<Typography> <span className="text-5xl font-bold"> History </span> </Typography>
								</div>
								<div className="w-full h-full">
									<table className="w-full h-full">
										<thead>
											<tr>
												<th className="px-5 pt-5 w-40 text-3xl "></th>
												<th className="px-5 pt-5 w-auto text-3xl text-start pl-5">Name</th>
												<th className="px-5 pt-5 w-1/4 text-3xl">Status</th>
												<th className="px-5 pt-5 w-1/4 text-3xl">Time</th>
											</tr>
										</thead>
										<tbody>
											{recentRecords.map((record, index) => (
												<tr key={index} className="h-32">
													{columnNames.map((columnName) => (
														<td key={columnName}
															className={`px-5 py-2 ${columnName === "name" ? "text-left" : "text-center"
																}`}
														>
															{columnName === "picture" ? (
																<img
																	src={record[columnName]}
																	className="object-cover object-top w-20 h-20 rounded-full mx-auto"
																	alt="Employee"
																/>
															) : columnName === "Status" ? (
																<span
																	className={`text-2xl font-bold flex items-center justify-center w-8/12 h-14 px-4 ${record[columnName] === "Abnormal"
																		? "inline-flex items-center rounded-xl bg-abnormal text-white"
																		: record[columnName] === "Clarified"
																			? "inline-flex items-center rounded-xl bg-clarified "
																			: "inline-flex items-center rounded-xl bg-normal"
																		}`}
																>
																	{record[columnName]}
																</span>
															) :columnName === "TimeInOut" ? (
																<Typography> <span className="text-[26px] font-bold"> {record[columnName]} </span> </Typography>
																):(
																<Typography> <span className="text-3xl font-bold"> {record[columnName]} </span> </Typography>

															)}
														</td>
													))}
												</tr>
											))}
										</tbody>
									</table>
								</div>

							</CardBody>
						</Card>
					</div>
				)}
			</div>
		</div>



	)
}; export default HomePage;