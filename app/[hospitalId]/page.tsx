import { Grid, Title, Card, Text } from "@tremor/react";
import MenuBar from "@/app/menubar";
import Link from "next/link";
import { CosmosClient } from '@azure/cosmos'
import Script from "next/script";

export const revalidate = 0;

const endpoint = 'https://hosa-storage-database.documents.azure.com:443/' //URI
const primaryKey = 'DX1PGkqsKsqBMQsPw1k5YkokOzMupR0ezAls4fXYctxy55HsOaH9gjhonD3CPiwDv5d9j0f6ncRBACDb4DItXw=='
const databaseId = 'hosa-database'
const containerId = 'AmbulanceData'

function AmbulanceItem({item}: any, hospital: string) {
    const {id, status, unit} = item || {}

    return(
        <Link key={id} href={`./${hospital}/ambulance/${item.id}`}>
            <Card key={id}>
                <Title>{`Ambulance Id: ${id}`}</Title>
                <Text>{`Status: ${status}`}</Text>
                <Text>{`Unit: ${unit}`}</Text>
            </Card>
        </Link>
    )
}

async function getItems(client: CosmosClient) {
    const containerItems = client.database(databaseId).container(containerId).items
    const container_items = await containerItems.query("SELECT * from c").fetchAll()
    return container_items["resources"]
}

export default async function HospitalPage({ params }: any) {
    const hospital = params.hospitalId
    const client = new CosmosClient({endpoint: endpoint, key: primaryKey});
    const items = await getItems(client)

    const date = new Date(Date.UTC(0, 0, 0, 0, 0, 0, 0))

    const i = await fetch('https://hosa-storage-database.documents.azure.com/dbs/hosa-database/colls/AmbulanceData/docs', {
        method: 'POST',
        headers: {
            'Authorization': primaryKey,
            'Content-Type': 'application/query+json',
            'Accept': 'application/json',
            'x-ms-date': date.toUTCString(),
            'T': 'True',
        },
        body: JSON.stringify({
            'query': 'SELECT * FROM c',
            'parameters': []
        }),
        next: { revalidate: 0 }
    })

    console.log(i)

    return (
        <main >
            <div>
                <MenuBar header={hospital}/>
            </div>
            <div className="p-4 md:p-10 mx-auto max-w-7xl">
                <Grid className="gap-6" numColsSm={2} numColsLg={3}>
                    {items?.map((item) => {
                        return <AmbulanceItem item={item} hospital={hospital}></AmbulanceItem>
                    })}
                </Grid>
                <Script>

                </Script>
            </div>
        </main>
    )
}
