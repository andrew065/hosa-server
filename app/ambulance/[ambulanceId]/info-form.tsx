'use client'

import {Button, Card, Flex, Text, Title} from "@tremor/react";
import { CosmosClient } from "@azure/cosmos";
import { useEffect, useState } from "react";
import CreateListBox from "@/app/ambulance/[ambulanceId]/list_box_item"

const endpoint = 'https://hosa-storage-database.documents.azure.com:443/' //URI
const primaryKey = 'DX1PGkqsKsqBMQsPw1k5YkokOzMupR0ezAls4fXYctxy55HsOaH9gjhonD3CPiwDv5d9j0f6ncRBACDb4DItXw=='
const databaseId = 'hosa-database'
const containerId = 'AmbulanceData'

interface ambulanceItem {
    id: string
    hospital: string
    status: string
    patientId: string
    unit: string
    lat: number
    long: number
}

const all_hospitals = ['Hospital 1', 'Hospital 2', 'Hospital 3']
const all_status = ['en route', 'with patient', 'returning']
const all_units = ['emergency', 'neuro', 'cardiac', 'trauma', 'burn', 'MUCC', 'surgery']

async function addItem(client: CosmosClient, item: ambulanceItem) {
    const container = await client.database(databaseId).container(containerId)
    const add = await container.items.create<ambulanceItem>(item)
    console.log('item added', add)
}

async function updateItem(client: CosmosClient, item: ambulanceItem) {
    const container = await client.database(databaseId).container(containerId)
    const update = await container.item(item.id, item.id).replace<ambulanceItem>(item) //todo: maybe change replace to patch
    console.log('item updated', update)
}

async function updateLocation(lat: number, long: number) {
    //todo: add patch function to update location
}

export default function InfoForm(ambulanceId: any) {
    const id = String(ambulanceId.ambulanceId)
    const client = new CosmosClient({endpoint: endpoint, key: primaryKey});

    const [hospital, setHospital] = useState(all_hospitals[0])
    const [status, setStatus] = useState(all_status[0])
    const [unit, setUnit] = useState(all_units[0])
    const [patientId, setPatientId] = useState('')
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)

    const item: ambulanceItem = {
        id: id,
        hospital: hospital,
        status: status,
        patientId: patientId,
        unit: unit,
        lat: lat,
        long: long
    }

    useEffect(() => {
        addItem(client, item).catch(r => console.error(r))
        //todo: add geolocation api stuff
    }, [])

    const onClick = () => {
        console.log(item)
        updateItem(client, item).catch(r => console.error(r))
    }

    return(
        <div>
            <Card className="space-y-2 p-10">
                <Title className="pb-2">Patient Data</Title>
                <div className="grid grid-cols-3 gap-x-3 gap-y-0">
                    <div>
                        <Text>Destination Hospital:</Text>
                    </div>
                    <div>
                        <Text>Anticipated Unit:</Text>
                    </div>
                    <div>
                        <Text>Status:</Text>
                    </div>
                    <div>
                        <CreateListBox dataSelect={all_hospitals} variable={hospital} setVar={setHospital}/>
                    </div>
                    <div>
                        <CreateListBox dataSelect={all_units} variable={unit} setVar={setUnit}/>
                    </div>
                    <div>
                        <CreateListBox dataSelect={all_status} variable={status} setVar={setStatus}/>
                    </div>
                </div>

                <div className="pt-3">
                    <Button size="sm" onClick={onClick}>
                        Update
                    </Button>
                </div>
            </Card>
        </div>
    )
}