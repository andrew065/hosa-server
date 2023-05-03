import InfoForm from "@/app/ambulance/[ambulanceId]/info-form"
import Logout from "@/app/ambulance/[ambulanceId]/logout";
import { Text } from "@tremor/react";
import { Suspense } from "react"
import ECGChart from "@/app/ecg_chart";

export default async function AmbulanceClient({params}: any) {
    const ambulanceId = params.ambulanceId

    return (
        <main>
            <div>
                <Logout ambulanceId={ambulanceId} />
            </div>
            <div className="p-4 md:p-10 mx-auto max-w-7xl">
                <Suspense fallback={<Text className="text-center">Form loading...</Text>}>
                    <InfoForm ambulanceId={ambulanceId}/>
                </Suspense>
                <ECGChart />
            </div>
        </main>
    )
}