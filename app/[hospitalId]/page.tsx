'use client'

import {Grid, Title, Card, Flex, Metric, Text, Button} from "@tremor/react";
import MenuBar from "@/app/[hospitalId]/menubar";
import Link from "next/link";
import { useRouter } from 'next/router'

const ambulance_data = [
    {
        id: "Ambulance_1",
        status: "With Patient",
        unit: "Cardiac"
    },
    {
        id: "Ambulance_2",
        status: "En Route",
        unit: "Neuro"
    },
    {
        id: "Ambulance_3",
        status: "En Route",
        unit: "Thoracic"
    }
]



export default function HospitalPage({ params }: any) {
    const router = useRouter()
    let hospital = params.hospitalId
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <div>
                {/*<MenuBar />*/}
                <Button onClick={() => router.back()}>
                    Back
                </Button>
            </div>
            <div>
                <Grid className="gap-6" numColsSm={2} numColsLg={3}>
                    {ambulance_data.map((item) => (
                        <Link href={`./${hospital}/ambulance/${item.id}`}>
                            <Card key={item.id}>
                                <Title>{`Ambulance Id: ${item.id}`}</Title>
                                <Text>{`Status: ${item.status}`}</Text>
                                <Text>{`Unit: ${item.unit}`}</Text>
                                {/*<Flex alignItems="start">*/}
                                {/*    <Text>{item.title}</Text>*/}
                                {/*</Flex>*/}
                                {/*<Flex*/}
                                {/*    className="space-x-3 truncate"*/}
                                {/*    justifyContent="start"*/}
                                {/*    alignItems="baseline"*/}
                                {/*>*/}
                                {/*    <Metric>{item.metric}</Metric>*/}
                                {/*    <Text className="truncate">from {item.metricPrev}</Text>*/}
                                {/*</Flex>*/}
                            </Card>
                        </Link>
                    ))}
                </Grid>
            </div>
        </main>
    )
}