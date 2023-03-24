'use client'

import {Grid, Title, Card, Flex, Metric, Text, Button} from "@tremor/react";
import MenuBar from "@/app/[hospitalId]/menubar";
import { useRouter } from 'next/router'

const dataFormatter = (number: number) =>
    Intl.NumberFormat('us').format(number).toString();


export default function HospitalPage({ params }: any) {
    const router = useRouter()
    let ambulance = params.id
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <div>
                <Button onClick={() => router.back()}>
                    Back
                </Button>
            </div>
            <div>
                <Card>
                    <Title>{ambulance}</Title>
                </Card>
            </div>
        </main>
    )
}