import MenuBar from "@/app/menubar";
import InfoForm from "@/app/ambulance/[ambulanceId]/info_form"
import {Text} from "@tremor/react";
import {CosmosClient} from "@azure/cosmos";

const endpoint = 'https://hosa-storage-database.documents.azure.com:443/' //URI
const primaryKey = 'DX1PGkqsKsqBMQsPw1k5YkokOzMupR0ezAls4fXYctxy55HsOaH9gjhonD3CPiwDv5d9j0f6ncRBACDb4DItXw=='
const databaseId = 'hosa-database'
const containerId = 'AmbulanceData'

async function get_database(client: CosmosClient, databaseId: string) {
    const db = await client.databases.createIfNotExists({id: databaseId})
    return db.database
}

async function get_container(database: any, containerId: string) {
    return await database.containers.createIfNotExists({id: containerId})
}

export default async function AmbulanceClient({params}: any) {
    const ambulanceId = params.ambulanceId
    const client = new CosmosClient({endpoint: endpoint, key: primaryKey});

    const database = await get_database(client, databaseId)
    const container = await get_container(database, containerId)

    console.log(container)

    return (
        <main>
            <div>
                <MenuBar header={ambulanceId}></MenuBar>
            </div>
            <div className="p-4 md:p-10 mx-auto max-w-7xl">
                <Text className="text-center">Ambulance side webpage</Text>
                {/*<InfoForm container={container} />*/}
            </div>
        </main>
    )
}