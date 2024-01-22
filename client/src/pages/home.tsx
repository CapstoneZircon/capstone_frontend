import React, { useEffect, useState } from "react";
import { Button, CardBody, CardFooter, CardHeader } from "@material-tailwind/react"
import { Card } from "@material-tailwind/react"
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import DonutChart from "../components/Chart/DonutChart";
import Navbar from "../components/navbar/navbar";

const HomePage = () => {
	type Importer = {
		[key: string]: string[];
	};

	const [data, setData] = useState<{ importers: Importer[] }>({
		importers: [
			{
				picture: [] as string[],
				name: [] as string[],
				status: [] as string[],
				timestamp: [] as string[],
			},
		],
	});

	useEffect(() => {
		setData((prevData) => {
			const newImporters = [];
			for (let i = 0; i < 5; i++) {
				const picture = "/images/Employee-resize.jpg";
				const names = [
					"Alice",
					"Bob",
					"Charlie",
					"David",
					// Add more names as needed
				];

				const name = names[Math.floor(Math.random() * names.length)];
				const status =
					i % 4 === 0
						? "detect"
						: i % 3 === 0
							? "abnormal"
							: i % 2 === 0
								? "in"
								: "out";
				const timestamp = `${Math.floor(Math.random() * 24)}:${Math.floor(
					Math.random() * 60
				)}`;

				const newImporter = {
					picture: [picture],
					name: [name],
					status: [status],
					timestamp: [timestamp],
				};

				newImporters.push(newImporter);
			}

			return {
				importers: [...newImporters],
			};
		});
	}, []);

	const columnNames = Object.keys(data.importers[0]);
	const [selectedDate, setSelectedDate] = useState<any>(new Date());


	return (

		<div className="bg-white min-h-screen flex z-10">

			<Navbar></Navbar>


			<div className="flex-1 p-4 pl-[165px]">
				<div className="pt-10 pl-10 pb-3">
					<Typography> <span className="text-6xl font-bold"> Dashboard </span> </Typography>
				</div>
				<div className="flex pt-5 pl-1">
					<div>
						<div className="pl-10 relative">
							<Card className="rounded-3xl w-[420px] h-[400px] bg-light-gray ">
								<CardHeader className="m-0 p-2 pt-4 rounded-t-2xl rounded-b-none bg-light-gray border-b-2 border-dark-gray shadow-none">
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
							<Card className="rounded-3xl w-[420px] h-[400px] mt-16 bg-light-gray ">
								<CardBody className="h-full mb-4">
									<div className="">
										<Typography> <span className="text-2xl font-bold"> Lastest Activity </span> </Typography>
									</div>
									<div className="flex justify-center items-center h-full">
										<div className="w-1/2">
											<img src="/images/Employee-resize.jpg" className="object-cover object-top h-eqw rounded-full" alt="Employee" />
										</div>
										<div className="w-1/2 flex flex-col justify-center items-start pl-10 text-black">
											<Typography> <div className="text-4xl font-black"> Jin D. </div> </Typography>
											<Typography> <div className="text-2xl font-medium mt-1"> 2 min ago </div> </Typography>
										</div>
									</div>
								</CardBody>
								<CardFooter className="border-t-2 border-dark-gray mt-auto">
									<div className="">
										<Typography> <span className="flex justify-center items-end text-5xl font-bold py-3"> Check-out </span> </Typography>
									</div>
								</CardFooter>
							</Card>
						</div>
					</div>

						<Card className="rounded-3xl h-auto  min-w-[1160px] w-auto ml-20 bg-light-gray">
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
											{data.importers.map((importer, index) => (
												<tr key={index} className="h-32">
													{columnNames.map((columnName) => (
														<td key={columnName}
															className={`px-5 py-2 ${columnName === "name" ? "text-left" : "text-center"
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
																	className={`text-2xl font-bold flex items-center justify-center w-3/5 h-14 p-2 ${importer[columnName][0] === "abnormal"
																			? "inline-flex items-center rounded-xl bg-red-50 px-2 py-1 text-red-700 ring-1 ring-inset ring-red-600/70"
																			: importer[columnName][0] === "detect"
																				? "inline-flex items-center rounded-xl bg-yellow-100 px-2 py-1 text-yellow-900 ring-1 ring-inset ring-yellow-600/70"
																				: "inline-flex items-center rounded-xl bg-green-50 px-2 py-1 text-green-700 ring-1 ring-inset ring-green-600/70"
																		}`}
																>
																	{importer[columnName][0]}
																</span>
															) : (
																<Typography> <span className="text-4xl font-bold"> {importer[columnName][0]} </span> </Typography>

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

			</div>
		</div>



	)
}; export default HomePage;