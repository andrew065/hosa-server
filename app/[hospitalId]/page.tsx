'use client'

import { Grid, Title, Card, Text } from "@tremor/react";
import MenuBar from "@/app/menubar";
import { CosmosClient } from '@azure/cosmos'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const endpoint = 'https://hosa-storage-database.documents.azure.com:443/' //URI
const primaryKey = 'DX1PGkqsKsqBMQsPw1k5YkokOzMupR0ezAls4fXYctxy55HsOaH9gjhonD3CPiwDv5d9j0f6ncRBACDb4DItXw=='
const databaseId = 'hosa-database'
const containerId = 'AmbulanceData'

async function getItems(client: CosmosClient) {
    const containerItems = client.database(databaseId).container(containerId).items
    const container_items = await containerItems.query("SELECT * from c").fetchAll()
    return container_items["resources"]
}

export default function HospitalPage({ params }: any) {
    const hospital = params.hospitalId
    const client = new CosmosClient({endpoint: endpoint, key: primaryKey});
    const [items, setItems] = useState<any[]>([])
    const [showLoading, setShowLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        const interval = setInterval( async () => {
            const items = await getItems(client)
            setShowLoading(false)
            setItems(items)
        }, 5000);
        return () => clearInterval(interval);
    }, [client, setItems])

    return (
        <main>
            <div>
                <MenuBar header={hospital}/>
            </div>
            <div className="p-4 md:p-10 mx-auto max-w-7xl">
                {showLoading ? <Title className="text-center">Loading Ambulance Data...</Title>:
                    <Grid className="gap-6" numColsSm={2} numColsLg={3}>
                        {items?.map((item) => {
                            const {id, status, unit} = item || {}
                            return(
                                <Card key={id} onClick={()=>{
                                    router.push(`/${hospital}/ambulance/${id}`)
                                }}>
                                    <Title>{`${id}`}</Title>
                                    <Text>{`Status: ${status}`}</Text>
                                    <Text>{`Unit: ${unit}`}</Text>
                                </Card>
                            )
                        })}
                    </Grid>}
            </div>
        </main>
    )
}
