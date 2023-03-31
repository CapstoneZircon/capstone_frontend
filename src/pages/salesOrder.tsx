import React from "react";
import {Link , Route , Routes , BrowserRouter} from 'react-router-dom'
import {Button, CardBody, CardHeader} from "@material-tailwind/react"
import { useState, useEffect } from "react";


const SaleOrder = () => {
    // const [data, Setdata] = useState({'importers': dict[ {'model': [] as string[], 'SN': [] as string[], 'NO': [] as string[], 'dealer': [] as string[], 'SO': [] as string[], 
    //                                     'date':[] as string[], 'comment':[] as string[], 'status': [] as string[] }]});
    // useEffect(() => {
    //     Setdata({'model': ['A1-0001','A1-0002'],
    //              'SN': ['SN12456','SN654987'],
    //              'NO': ['1', '2'],  
    //              'dealer': ['SHOPEE','LAZADA'], 
    //              'SO': ['SY111111','SY222222'], 
    //              'date':['9/3/2023', '9/3/2023'], 
    //              'comment':['xxxxxxxxx','xxxxxxxxxxx'], 
    //              'status': ['neworder','late']});
    // })
    return(
        <div className="">
           <nav id = "SalesOrderNavBar" className="container-lg bg-saleNev-bg">
                <div className = "md-container w-full">
                    <div className="space-x-3 border-black border-2">

                        <div className="flex flex-row">
                            <Link to='/home'>
                                <div className = 'col basis-1/12 text-4xl px-6 py-6 border-black border-4 text-white'>
                                    <a> &#60; </a>
                                </div>
                            </Link>
                                <div className = 'col basis-5/12 text-4xl px-6 py-6 border-blue-300 border-4 text-white'>
                                    Sale order
                                </div>
                        </div>

                    </div>
                </div>
            </nav>

            <div id = "SalesOrderBody">
                <div className="bg-saleBody">
                    <div className =" flex flex-row">
                        <div className = 'col basis-3/12 text-4xl px-4 py-4 border-blue-300 border-4'>
                            <p>Show date &#60;</p>
                        </div>
                        <div className = 'col basis-9/12 text-4xl px-4 py-4 border-blue-300 border-4 text-right'>
                            <p> Total of XXX sale orders</p>
                        </div>
                    </div>
                </div>
                <div className = 'border-red-500 border-2'>
                    <table className = 'border-black border-2 mx-auto text-center '>
                        <thead>
                            <td>
                                <th className = 'border-black border-2 px-5 py-2 w-2/12'>ชื่อรุ่น</th>
                                <th className = 'border-black border-2 px-5 py-2 w-2/12'>Serial Number</th>
                                <th className = 'border-black border-2 px-5 py-2 w-1/12'>No.</th>
                                <th className = 'border-black border-2 px-5 py-2 w-1/12'>Dealer</th>
                                <th className = 'border-black border-2 px-5 py-2 w-2/12'>เลขที่ SO.</th>
                                <th className = 'border-black border-2 px-5 py-2 w-1/12'>วันที่ส่งออก</th>
                                <th className = 'border-black border-2 px-5 py-2 w-1/12'>หมายเหตุ</th>
                                <th className = 'border-black border-2 px-5 py-2 w-1/12'>สถานะ</th>
                            </td>
                        </thead>
                        <tbody>
                            {/* <tr className = ''>
                               {data.model.map((Model) => {return( <td className = 'border-black border-2 px-5 py-2'> {Model} </td>)})}
                               {data.SN.map((Sn) => {return( <td className = 'border-black border-2 px-5 py-2'> {Sn} </td>)})}


                            </tr> */}
                            <tr className = ''>
                                <td className = 'border-black border-2 px-5 py-2'>Centro comercial Moctezuma</td>
                                <td className = 'border-black border-2 px-5 py-2'>Francisco Chang</td>
                                <td className = 'border-black border-2 px-5 py-2'>Mexico</td>
                                <td className = 'border-black border-2 px-5 py-2'>Dealer</td>
                                <td className = 'border-black border-2 px-5 py-2'>Maria Anders</td>
                                <td className = 'border-black border-2 px-5 py-2'>Germany</td>
                                <td className = 'border-black border-2 px-5 py-2'>Dealer</td>
                                <td className = 'border-black border-2 px-5 py-2'>Maria Anders</td>

                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

  
        </div>
    )

}; export default SaleOrder

