import MenuBar from "@/app/menubar";
import InfoForm from "@/app/ambulance/[ambulanceId]/info_form"
import { Button, Card, Text, TextInput, Title } from "@tremor/react";
import { Suspense } from "react"

export default async function AmbulanceClient({params}: any) {
    const ambulanceId = params.ambulanceId

    return (
        <main>
            <div>
                <MenuBar header={ambulanceId}></MenuBar>
            </div>
            <div className="p-4 md:p-10 mx-auto max-w-7xl">
                <Suspense fallback={<Text className="text-center">Form loading...</Text>}>
                    <InfoForm />
                </Suspense>
            </div>
        </main>
    )
}