import { CosmosClient } from "@azure/cosmos";
import {Button, Card, TextInput, Text, Title, Tab, TabList, Grid} from "@tremor/react";
import { useEffect, useState, useMemo } from "react";
import {MapIcon, UserIcon} from "@heroicons/react/24/solid";
import CreateListBox from "@/app/ambulance/[ambulanceId]/list_box_item";
import {GoogleMap, Marker} from "@react-google-maps/api";
import {useRouter} from "next/navigation";

const endpoint = 'https://hosacosmosdb.documents.azure.com:443/' //URI
const primaryKey = 'GuPc608dwFFwQaL44TSnHtiWEQWdovRjgYcEplMuCqM1pil0ZYGokw9ZyOe6uGyY7bY99d6tfc96ACDb8vTXRw=='
const databaseId = 'hosadb'
const containerId = 'PatientInfo'

async function getItems(client: CosmosClient, query: string) {
    const containerItems = client.database(databaseId).container(containerId).items
    const container_items = await containerItems.query(query).fetchAll()
    return container_items["resources"]
}

export default function PatientList() {
    const client = new CosmosClient({endpoint: endpoint, key: primaryKey});

    const [showCard, setShowCard] = useState(true)
    const [activeItems, setActiveItems] = useState<any[]>([])
    const [pastItems, setPastItems] = useState<any[]>([])
    const [showLoading, setShowLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        const interval = setInterval( async () => {
            const activeItems = await getItems(client, "SELECT * from c where c.endDate = '' or IS NULL")
            const pastItems = await getItems(client, "SELECT * from c where c.endDate != '' or IS NOT NULL")
            setActiveItems(activeItems)
            setPastItems(pastItems)
            setShowLoading(false)
        }, 5000);
        return () => clearInterval(interval);
    }, [client, setActiveItems, setPastItems])

    return(
        <div>
            <Card className="space-y-2 p-5 md:p-10">
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
                        {showLoading ? <Title className="text-center">Loading Ambulance Data...</Title>:
                            <Grid className="gap-6" numColsSm={2} numColsLg={3}>
                                {activeItems?.map((item) => {
                                    const {id, status, unit, connected} = item || {}
                                    return(
                                        <Card className={connected? 'bg-white': 'bg-grey'} key={id} onClick={()=>{ //todo: variable onClick function
                                            router.push(`/${hospital}/ambulance/${id}`)
                                        }}>
                                            <Title>{`${id}`}</Title>
                                            <Text>{`Status: ${status}`}</Text>
                                            <Text>{`Unit: ${unit}`}</Text>
                                            <Text className="pt-3">{connected? "Connected": "Disconnected"}</Text>
                                        </Card>
                                    )
                                })}
                            </Grid>}
                    </div>
                ) : (
                    <div className="mt-6">

                    </div>
                )}
            </Card>
        </div>
    )
}