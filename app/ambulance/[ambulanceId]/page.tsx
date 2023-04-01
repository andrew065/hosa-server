import MenuBar from "@/app/menubar";
import Client from "@/app/ambulance/[ambulanceId]/client"
import {useState} from "react";


export default async function AmbulanceClient({ params }: any) {
    const ambulanceId = params.ambulanceId
    const [clientElement, setClientElement] = useState()

    return(
        <main>
            <div>
                <MenuBar header={ambulanceId}></MenuBar>
            </div>
            <div>
                <Client />
            </div>
        </main>
    )
}