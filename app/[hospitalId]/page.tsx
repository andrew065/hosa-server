'use client'

import { Grid, Title, Card, Text } from "@tremor/react";
import MenuBar from "@/app/menubar";
import PatientList from "@/app/patient_list";
import { CosmosClient } from '@azure/cosmos'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const endpoint = 'https://hosacosmosdb.documents.azure.com:443/' //URI
const primaryKey = 'GuPc608dwFFwQaL44TSnHtiWEQWdovRjgYcEplMuCqM1pil0ZYGokw9ZyOe6uGyY7bY99d6tfc96ACDb8vTXRw=='
const databaseId = 'hosadb'
const containerId = 'AmbulanceData'

async function getItems(client: CosmosClient) {
    const containerItems = client.database(databaseId).container(containerId).items
    const container_items = await containerItems.query("SELECT * from c ORDER BY c.connected DESC").fetchAll()
    return container_items["resources"]
}

export default function HospitalPage({ params }: any) {
    const hospital = params.hospitalId
    // const client = new CosmosClient({endpoint: endpoint, key: primaryKey});
    // const [items, setItems] = useState<any[]>([])
    // const [showLoading, setShowLoading] = useState(true)

    const router = useRouter()

    // useEffect(() => {
    //     const interval = setInterval( async () => {
    //         const items = await getItems(client)
    //         setShowLoading(false)
    //         setItems(items)
    //     }, 5000);
    //     return () => clearInterval(interval);
    // }, [client, setItems])


    return (
        <main>
            <div>
                <MenuBar header={hospital}/>
            </div>

            <div className="p-4 md:p-10 mx-auto max-w-7xl">
                <PatientList hospital={hospital} />
            {/*    {showLoading ? <Title className="text-center">Loading Ambulance Data...</Title>:*/}
            {/*        <Grid className="gap-6" numColsSm={2} numColsLg={3}>*/}
            {/*            {items?.map((item) => {*/}
            {/*                const {id, status, unit, connected} = item || {}*/}
            {/*                return(*/}
            {/*                    <Card className={connected? 'bg-white': 'bg-grey'} key={id} onClick={()=>{ //todo: variable onClick function*/}
            {/*                        router.push(`/${hospital}/patients/${id}`)*/}
            {/*                    }}>*/}
            {/*                        <Title>{`${id}`}</Title>*/}
            {/*                        <Text>{`Status: ${status}`}</Text>*/}
            {/*                        <Text>{`Unit: ${unit}`}</Text>*/}
            {/*                        <Text className="pt-3">{connected? "Connected": "Disconnected"}</Text>*/}
            {/*                    </Card>*/}
            {/*                )*/}
            {/*            })}*/}
            {/*        </Grid>}*/}
            </div>
        </main>
    )
}
