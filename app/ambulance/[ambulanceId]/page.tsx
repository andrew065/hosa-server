import {Grid, Title, Card, Text, TextInput, Button} from "@tremor/react";
import MenuBar from "@/app/menubar";
import { CosmosClient } from '@azure/cosmos'

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

async function add_ambulance(container: any) {

}

async function update_ambulance(container: any) {

}

export default async function AmbulanceClient({ params }: any) {
    const ambulanceId = params.ambulanceId
    // const client = new CosmosClient({endpoint: endpoint, key: primaryKey});
    // const database = await get_database(client, databaseId)
    // const container = await get_container(database, containerId)
    //
    // const [status, setStatus] = useState('Patient Status')
    // const [unit, setUnit] = useState('Anticipated Unit')
    //
    // const handleClick = () => {
    //     console.log(status, unit)
    // }

    return(
        <main>
            <div>
                <MenuBar header={ambulanceId}></MenuBar>
            </div>
            <div className="p-4 md:p-10 mx-auto max-w-7xl">
                <Text className="text-center">Ambulance side webpage</Text>
                {/*<Card className="space-y-2 p-10">*/}
                {/*    <Title className="pb-2">Login</Title>*/}
                {/*    <TextInput // TODO: add error/invalid input*/}
                {/*        placeholder={status}*/}
                {/*        value={status}*/}
                {/*        onChange={e => setStatus(e.currentTarget.value)}*/}
                {/*    />*/}
                {/*    <TextInput // TODO: add error/invalid input*/}
                {/*        placeholder={unit}*/}
                {/*        value={unit}*/}
                {/*        onChange={e => setUnit(e.currentTarget.value)}*/}
                {/*    />*/}
                {/*    <div className="pt-3">*/}
                {/*        <Button size="sm" onClick={() => handleClick()}>*/}
                {/*            Set Variables*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*</Card>*/}
            </div>
        </main>
    )
}