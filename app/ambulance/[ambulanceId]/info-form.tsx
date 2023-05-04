'use client'

import { Button, Card, TextInput, Text, Title, Tab, TabList } from "@tremor/react";
import { CosmosClient } from "@azure/cosmos";
import { useEffect, useState, useMemo } from "react";
import { UserIcon, MapIcon } from "@heroicons/react/24/solid"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import CreateListBox from "@/app/ambulance/[ambulanceId]/list_box_item"

const endpoint = "https://uhndescosmosdb.documents.azure.com:443/" //URI
const primaryKey = 'w74NNXmQZ7o6FRDeoZvBLxieTszfzvIaRDAqFyf3itgSAmqQwuH8RIqMScDfkmVAShB5BLmsImHOACDbUlFolg=='
const databaseId = 'testdb'

const mapsAPIKey = "AIzaSyDSfYcESw60ZYNkHFOx5X9jrCmL4oWiDFw"

interface ambulanceItem {
    id: string
    hospital: string
    status: string
    patientId: string
    patientAge: string
    unit: string
    lat: number
    long: number
    connected: boolean
}

interface patientItem {
    id: string
    age: string
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
    patientId: string
    ambulanceId: string
}

const all_hospitals = ['Hospital 1', 'Hospital 2', 'Hospital 3']
const all_status = ['en route', 'with patient', 'returning']
const all_units = ['emergency', 'neuro', 'cardiac', 'trauma', 'burn', 'MUCC', 'surgery']


async function newPatient(client: CosmosClient, item: patientItem) {
    const container = await client.database(databaseId).container("PatientInfo")
    const response = await container.items.create(item)
    console.log(response)
}
async function updatePatientItem(client: CosmosClient, item: patientItem) {
    const container = await client.database(databaseId).container("PatientInfo")
    const update = await container.item(item.id, item.id).replace<patientItem>(item)
    console.log('item updated', update)
}
async function updateAmbulanceItem(client: CosmosClient, item: ambulanceItem) {

}

async function updateLocation(client: CosmosClient, id: string, lat: number, long: number) {
    const operations = [
        {op: 'set', path: '/lat', value: lat},
        {op: 'set', path: '/long', value: long}
    ]
    const container = await client.database(databaseId).container("AmbulanceData")
    // @ts-ignore
    const patch = await container.item(id, id).patch(operations)
    console.log('patch location: ', patch)
}

export default function InfoForm(prop: props) {
    const id = prop.patientId
    const client = new CosmosClient({endpoint: endpoint, key: primaryKey});

    const [hospital, setHospital] = useState(all_hospitals[0])
    const [status, setStatus] = useState(all_status[0])
    const [unit, setUnit] = useState(all_units[0])
    const [patientId, setPatientId] = useState(id)
    const [patientAge, setPatientAge] = useState('null')
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)

    const [showCard, setShowCard] = useState(true)

    const position = useMemo(()  => ({lat: lat, lng: long}), [lat, long])

    const item: patientItem = {
        id: id,
        age: patientAge,
        status: status,
        unit: unit,
        deviceId: 'ecgreader',
        ecgStart: 'string', //todo: add initialization time
        ecgEnd: 'null',
        ambulanceId: prop.ambulanceId,
        hospitalId: hospital,
        active: true
    }

    useEffect(() => {
        newPatient(client, item).catch(r => console.error(r))
    })

    useEffect(() => {
        const interval = setInterval(() => {
            if('geolocation' in navigator) {
                // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
                navigator.geolocation.getCurrentPosition(({ coords }) => {
                    const { latitude, longitude } = coords;
                    setLat(latitude)
                    setLong(longitude)
                    updateLocation(client, item.id, latitude, longitude).catch(r => console.error(r))
                })
            }
        }, 1000)
        return () => {
            clearInterval(interval)
            client.dispose()
        }
    }, [client])

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: mapsAPIKey
    });

    const onClick = () => {
        console.log(item)
        updatePatientItem(client, item).catch(r => console.error(r))
    }

    return(
        <div>
            <Card className="space-y-2 p-5 md:p-10">
                <Title className="pb-2">Ambulance Control Panel</Title>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-1 pb-3">
                    <div>
                        <Text>Patient Id:</Text>
                        <TextInput
                            className="shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-1"
                            placeholder="Patient Id"
                            value={patientId}
                            onChange={e => {
                                setPatientId(e.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <Text>Age:</Text>
                        <TextInput
                            className="shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-1"
                            placeholder="Age"
                            value={patientAge}
                            onChange={e => {
                                setPatientAge(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <>
                    <TabList
                        defaultValue="1"
                        onValueChange={(value) => setShowCard(value === "1")}
                        className="mt-6"
                    >
                        <Tab value="1" text="Patient Data" icon={UserIcon} />
                        <Tab value="2" text="Google Maps" icon={MapIcon} />
                    </TabList>
                </>
                {showCard ? (
                    <div className="mt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-3 gap-y-0 pt-3">
                            <div>
                                <Text>Destination Hospital:</Text>
                                <CreateListBox dataSelect={all_hospitals} variable={hospital} setVar={setHospital}/>
                            </div>
                            <div>
                                <Text>Anticipated Unit:</Text>
                                <CreateListBox dataSelect={all_units} variable={unit} setVar={setUnit}/>
                            </div>
                            <div>
                                <Text>Status:</Text>
                                <CreateListBox dataSelect={all_status} variable={status} setVar={setStatus}/>
                            </div>
                        </div>
                        <div className="pt-5">
                            <Button
                                className="shadow-md focus-visible:border-indigo-500 focus-visible:ring-1"
                                size="sm"
                                onClick={onClick}
                            >
                                Update
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="mt-6">
                        {/*todo: google maps integration*/}
                        <GoogleMap zoom={15} center={position} mapContainerClassName={"map-container"}>
                            <Marker position={position}></Marker>
                        </GoogleMap>
                    </div>
                )}
            </Card>
        </div>
    )
}