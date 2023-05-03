import { CosmosClient } from "@azure/cosmos";
import { Button, Card, TextInput, Text, Title, Tab, TabList, Grid } from "@tremor/react";
import { useEffect, useState } from "react";
import {MapIcon, UserIcon} from "@heroicons/react/24/solid";
import {useRouter} from "next/navigation";
import CardGrid from "@/app/card_grid";

const endpoint = 'https://hosacosmosdb.documents.azure.com:443/' //URI
const primaryKey = 'GuPc608dwFFwQaL44TSnHtiWEQWdovRjgYcEplMuCqM1pil0ZYGokw9ZyOe6uGyY7bY99d6tfc96ACDb8vTXRw=='
const databaseId = 'hosadb'
const containerId = 'PatientInfo'

interface patientItem {
    id: string
    age: number
    status: string
    unit: string
    deviceId: string
    ecgStart: string
    ecgEnd: string
    ambulanceId: string
    hospitalId: string
    active: boolean
}

interface props {
    hospital: string
}

async function getItems(client: CosmosClient, query: string) {
    const containerItems = client.database(databaseId).container(containerId).items
    const container_items = await containerItems.query(query).fetchAll()
    return container_items["resources"]
}

export default function PatientList(props: props) {
    const client = new CosmosClient({endpoint: endpoint, key: primaryKey});

    const [showCard, setShowCard] = useState(true)
    const [activeItems, setActiveItems] = useState<any[]>([])
    const [pastItems, setPastItems] = useState<any[]>([])
    const [showLoading, setShowLoading] = useState(true)

    useEffect(() => {
        const interval = setInterval( async () => {
            const activeItems = await getItems(client, "SELECT * from c where c.active = 1")
            const pastItems = await getItems(client, "SELECT * from c where c.active = 0")
            setActiveItems(activeItems)
            setPastItems(pastItems)
            setShowLoading(false)
        }, 5000);
        return () => clearInterval(interval);
    }, [client, setActiveItems, setPastItems])

    return(
        <Card className="pt-2 px-5 pb-10 md:px-10">
            <>
                <TabList
                    defaultValue="1"
                    onValueChange={(value) => setShowCard(value === "1")}
                    className="mt-6"
                >
                    <Tab value="1" text="Active Patients" icon={UserIcon} />
                    <Tab value="2" text="Past Patients" icon={MapIcon} />
                </TabList>
            </>
            {showCard ? (
                <div className="mt-6">
                    {showLoading ? <Title className="text-center">Loading Patient Data...</Title> :
                        <CardGrid items={activeItems} url={`/${props.hospital}/patients/`} />
                    }
                </div>
            ) : (
                <div className="mt-6">
                    {showLoading ? <Title className="text-center">Loading Patient Historical Data</Title> :
                        <CardGrid items={pastItems} url={`/${props.hospital}/patients/`} />}
                </div>
            )}
        </Card>
    )
}