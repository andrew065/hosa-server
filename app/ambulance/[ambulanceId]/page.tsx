'use client'

import InfoForm from "@/app/ambulance/[ambulanceId]/info-form"
import Logout from "@/app/ambulance/[ambulanceId]/logout";
import {Button, Card, Metric, Text, TextInput, Title} from "@tremor/react";
import {Suspense, useState} from "react"
import ECGChart from "@/app/vitals_chart";

export default function AmbulanceClient({params}: any) {
    const ambulanceId = params.ambulanceId

    const [patientId, setPatientId] = useState('')
    const [newPatient, setNewPatient] = useState(false)

    const onNewPatient = () => {
        setNewPatient(true)

    }

    return (
        <main>
            <div>
                <Logout ambulanceId={ambulanceId} />
            </div>
            <div className="p-4 md:p-10 mx-auto max-w-7xl">
                {
                    !newPatient?
                        <div>
                            <Card className="space-y-2 p-10">
                                <TextInput
                                    placeholder="Patient Id"
                                    value={patientId}
                                    onChange={e => {
                                        setPatientId(e.currentTarget.value)
                                    }}/>
                                <div className="pt-3 object-center">
                                    <Button size="sm" variant="secondary" onClick={() => onNewPatient()}>
                                        New Patient
                                    </Button>
                                </div>
                            </Card>
                        </div>
                        :
                        <div>
                            <Suspense fallback={<Text className="text-center">Form loading...</Text>}>
                                <InfoForm patientId={patientId} ambulanceId={ambulanceId}/>
                            </Suspense>
                        </div>
                }
            </div>
        </main>
    )
}