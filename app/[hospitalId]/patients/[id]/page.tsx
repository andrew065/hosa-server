'use client'

import {Card, Metric, Tab, TabList, Text, Title} from "@tremor/react";
import MenuBar from "@/app/menubar";
import { CosmosClient } from "@azure/cosmos";
import {useEffect, useMemo, useRef, useState} from "react";
import {MapIcon, UserIcon} from "@heroicons/react/24/solid";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import { Loader } from '@googlemaps/js-api-loader'
import Script from "next/script";
import ECGChart from "@/app/vitals_chart";

const endpoint = "https://uhndescosmosdb.documents.azure.com:443/" //URI
const primaryKey = 'w74NNXmQZ7o6FRDeoZvBLxieTszfzvIaRDAqFyf3itgSAmqQwuH8RIqMScDfkmVAShB5BLmsImHOACDbUlFolg=='
const databaseId = 'testdb'
const containerId = 'PatientInfo'
const deviceConnectionString = "HostName=hosa-iot-hub.azure-devices.net;DeviceId=web-client;SharedAccessKey=wuq7EU5/Kq7GPn52qLFSVlSAQPFDZf3XXcnOZ+n5hTU="
const mapsAPIKey = "AIzaSyDSfYcESw60ZYNkHFOx5X9jrCmL4oWiDFw"

interface patientItem {
    id: string
    age: string
    status: string
    unit: string
    deviceId: string
    ecgStart: number
    ecgEnd: number
    ambulanceId: string
    hospitalId: string
    active: boolean
}

interface props {
    patientId: string
}

async function getItem(client: CosmosClient, itemId: string) {
    const container = client.database(databaseId).container(containerId)
    const item = await container.item(itemId, itemId).read()
    return item['resource']
}

export default function HospitalPage({params}: any) {
    const patientId = params.id
    const client = new CosmosClient({endpoint: endpoint, key: primaryKey});
    const [item, setItem] = useState<patientItem>({
        id: '',
        age: '',
        status: '',
        unit: '',
        deviceId: '',
        ecgStart: 0,
        ecgEnd: 0,
        ambulanceId: '',
        hospitalId: '',
        active: true
    })
    const [showLoading, setShowLoading] = useState(true)
    const [showCard, setShowCard] = useState(true)

    useEffect(() => {
        const interval = setInterval( async () => {
            const item = await getItem(client, patientId)
            setShowLoading(false)
            setItem(item)
            console.log(item)
        }, 1000);
        return () => clearInterval(interval);
    }, [client, setItem])

    return (
        <main>
            <div>
                <MenuBar header={patientId}/>
            </div>
            {showLoading ? <Title className="text-center pt-3">Loading Ambulance Data...</Title>:
                <div className="p-4 md:p-10 mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3 pb-3">
                        <Card>
                            <Text>Patient Id:</Text>
                            <Metric>{item.id}</Metric>
                        </Card>
                        <Card>
                            <Text>Patient Age:</Text>
                            <Metric>{item.age}</Metric>
                        </Card>
                        <Card>
                            <Text>Status:</Text>
                            <Metric>{item.status}</Metric>
                        </Card>
                        <Card>
                            <Text>Anticipated Unit:</Text>
                            <Metric>{item.unit}</Metric>
                        </Card>
                    </div>
                    <Card className="md:space-y-2 md:pt-2 pl-3 px-3 md:px-10 md:pl-10">
                        {item.ecgStart == 0?
                            <Text className="text-center pt-5">No ECG data being transmitted</Text> :
                            <ECGChart client={client} ecgStart={item.ecgStart} ecgEnd={item.ecgEnd}/>
                        }
                    </Card>
                </div>}
        </main>
    )
}