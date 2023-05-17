import React, {useState, useEffect }from "react";
import {Link} from 'react-router-dom'
import {Button, CardBody, CardHeader} from "@material-tailwind/react"
import { DatePicker } from 'react-widgets';
import "react-widgets/styles.css";
import {FiChevronLeft} from "react-icons/fi";
import Axios from 'axios'
import { response } from "express";
import colorStatus from "../components/saleOrder/colorStatus";


const SaleOrder = () => {
    const [saleData, setData] = useState([])
      useEffect(() => {
          Axios.get('http://localhost:8080/saleOrder').then((response) => {
            setData(response.data);
          

          });
      });

    const columnNames = saleData.length > 0 ? Object.keys(saleData[0]) : [];
    const [selectedDate, setSelectedDate] = useState<any>(new Date());

    
    return(
        <div className="">
           <nav id = "SalesOrderNavBar" className="container-lg bg-saleNev-bg">
                <div className = "md-container w-full">
                    <div className="space-x-3 ">

                        <div className="flex flex-row">
                            <Link to='/home'>
                                <div className = 'col basis-1/12 text-4xl px-6 py-6 text-white mt-0.5'>
                                    <a> <FiChevronLeft /></a>
                                </div>
                            </Link>
                                <div className = 'col basis-5/12 text-4xl px-6 py-6 text-white'>
                                    Sale order
                                    
                                </div>
                        </div>

                    </div>
                </div>
            </nav>

            <div id = "SalesOrderBody">
                    <div className="bg-saleBody">
                        
                        <div className =" flex flex-row justify-center w-auto">

                            <span className = 'w-2/12 text-l ps-6 py-4'>
                            Date
                            <DatePicker
                                value={selectedDate}
                                onChange={setSelectedDate}
                            />


                            </span>

                            <div className = 'w-9/12 text-3xl pe-7 py-7 text-end'>
                                <p> Total of {saleData.length} sale orders</p>
                            </div>
                            
                        </div>
                    </div>
                    <div className = 'flex flex-col'>
                        <table className = 'border-black border-2 text-center table-fixed w-auto mx-12 lg:mx-20'>
                            <thead>
                                <tr>
                                    <th className = 'border-black border-2 px-5 py-2 w-2/12'>ชื่อรุ่น</th>
                                    <th className = 'border-black border-2 px-5 py-2 w-2/12'>Serial Number</th>
                                    <th className = 'border-black border-2 px-5 py-2 w-1/12'>No.</th>
                                    <th className = 'border-black border-2 px-5 py-2 w-1/12'>Dealer</th>
                                    <th className = 'border-black border-2 px-5 py-2 w-2/12'>เลขที่ SO.</th>
                                    <th className = 'border-black border-2 px-5 py-2 w-1/12'>วันที่ส่งออก</th>
                                    <th className = 'border-black border-2 px-5 py-2 w-1/12'>หมายเหตุ</th>
                                    <th className = 'border-black border-2 px-5 py-2 w-1/12'>สถานะ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {saleData.map((importer, index) => (       

                                <tr key={index}>
                                    {columnNames.map((columnName) => (
                                    <td key={columnName} className="border-black border-2 px-auto py-2">
                                    {columnName == 'Date' ? String(importer[columnName]).slice(0,10) 
                                    :<>{columnName == 'status' ? colorStatus(importer[columnName]) : importer[columnName]}</>}
                                    </td>
                                    ))}
                                </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

            </div>

  
        </div>
    )

}; export default SaleOrder

