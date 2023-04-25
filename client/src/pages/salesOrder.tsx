import React, {useState, useEffect }from "react";
import {Link} from 'react-router-dom'
import {Button, CardBody, CardHeader} from "@material-tailwind/react"
import { DatePicker } from 'react-widgets';
import "react-widgets/styles.css";
import {FiChevronLeft} from "react-icons/fi";

const SaleOrder = () => {
    type Importer = {
  [key: string]: string[];
};
    const [data, setData] = useState<{ importers: Importer[] }>({
        importers: [
          {
            model: [] as string[],
            SN:  [] as string[],
            NO: [] as string[],
            dealer: [] as string[],
            SO: [] as string[],
            date: [] as string[],
            comment: [] as string[], 
            status: [] as string[],
          },
        ],
      });
      useEffect(() => {
        setData((prevData) => {
          const newImporters = [];
          for (let i = 0; i < 15; i++) {
            const model = `A1-00${i+ Math.floor(Math.random() * 1000000)}`;
            const SN = `SN${Math.floor(Math.random() * 1000000)}`;
            const NO = `${i + 1}`;
            const dealer = i % 2 === 0 ? "SHOPEE" : "LAZADA";
            const SO = `SY${Math.floor(Math.random() * 1000000)}`;
            const date = `${Math.floor(Math.random() * 28) + 1}/${
              Math.floor(Math.random() * 12) + 1
            }/2023`;
            const comment = `xxxxxxxxx${i}`;
            const status =
              i % 4 === 0 ? "delivery" : i % 3 === 0 ? "neworder" : "late";
      
            const newImporter = {
              model: [model],
              SN: [SN],
              NO: [NO],
              dealer: [dealer],
              SO: [SO],
              date: [date],
              comment: [comment],
              status: [status],
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
                    <div className =" flex flex-row">

                        <span className = 'col basis-2/12 text-l px-4 py-4 ml-6'>
                        Date
                        <DatePicker
                            value={selectedDate}
                            onChange={setSelectedDate}
                        />


                        </span>

                        <div className = 'col basis-10/12 text-3xl px-4 py-7 text-end mr-6'>
                            <p> Total of {data.importers.length} sale orders</p>
                        </div>
                        
                    </div>
                </div>
                <div className = ''>
                    <table className = 'border-black border-2 mx-auto giytext-center '>
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
                            {data.importers.map((importer, index) => (

                            <tr key={index}>
                                {columnNames.map((columnName) => (
                                <td key={columnName} className="border-black border-2 px-5 py-2">
                                  {importer[columnName]}
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

