import React from "react";
import {Button} from "@material-tailwind/react"
import ButtonFeed from "../components/Button/ButtonFeed";
import {Card} from "@material-tailwind/react"



const HomePage =() =>{


    return(
        <div>
            <nav id = "NavBar" className="border-red-600 border-2 text-center item-center container-lg">
                <h2> THis is NavBar </h2>
            </nav>

            <div id = "Body" className="border-blue-300 border-4 mt-32 items-center justify-center text-center">
                <h2> This is Body </h2>

                <Button> Hello body </Button>
        <Card>
                <table className="border-2">
                    
                    <tr>
                        <td>
                            col1
                        </td>
                        <td>
                            col2
                        </td>
                        <td>
                            col3
                        </td>

                    </tr>
                </table>
                </Card>
            </div>

            <div id = "footer" className="border-yellow-400 border-8" >
                <h2> This is Footer </h2>

            </div>

        </div>
        

    )
}; export default HomePage;