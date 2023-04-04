import { Grid, Title, Card, Text } from "@tremor/react";
import MenuBar from "@/app/menubar";
import Link from "next/link";
import { CosmosClient } from '@azure/cosmos'

export const dynamic = 'auto',
    dynamicParams = true,
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto'

const endpoint = 'https://hosa-storage-database.documents.azure.com:443/' //URI
const primaryKey = 'DX1PGkqsKsqBMQsPw1k5YkokOzMupR0ezAls4fXYctxy55HsOaH9gjhonD3CPiwDv5d9j0f6ncRBACDb4DItXw=='
const databaseId = 'hosa-database'
const containerId = 'AmbulanceData'

async function get_container_items(containerItems: any) {
    const container_items = await containerItems.query("SELECT * from c").fetchAll()
    const items = container_items["resources"]
    return items as any[]
}

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

export default async function HospitalPage({ params }: any) {
    const hospital = params.hospitalId

    const client = new CosmosClient({endpoint: endpoint, key: primaryKey});
    const containerItems = client.database(databaseId).container(containerId).items
    const items = await get_container_items(containerItems)

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
            </div>
        </main>
    )
}
