'use client'

import InfoForm from "@/app/ambulance/[ambulanceId]/info-form"
import Logout from "@/app/ambulance/[ambulanceId]/logout";
import {Button, Text} from "@tremor/react";
import {Suspense, useState} from "react"
import ECGChart from "@/app/vitals_chart";

export default function AmbulanceClient({params}: any) {
    const ambulanceId = params.ambulanceId

    const [newPatient, setNewPatient] = useState()

    return (
        <main>
            <div>
                <Logout ambulanceId={ambulanceId} />
            </div>
            <div className="p-4 md:p-10 mx-auto max-w-7xl">
                {
                    !newPatient?
                        <Button size="sm" onClick={() => console.log('button clicked')}>New Patient</Button> :
                        <div>
                            <Suspense fallback={<Text className="text-center">Form loading...</Text>}>
                                <InfoForm ambulanceId={ambulanceId}/>
                            </Suspense>
                            <ECGChart /> {/* todo: add start/stop monitoring */}
                        </div>
                }


            </div>
        </main>
    )
}