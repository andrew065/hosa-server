'use client'

import {Card, AreaChart, Title} from "@tremor/react";
import MenuBar from "@/app/[hospitalId]/menubar";

const performance = [
    {
        seconds: "1",
        voltage: '600'
    },
    {
        seconds: "2",
        voltage: '600'
    },
    {
        seconds: "3",
        voltage: '600'
    },
];

const numberFormatter = (value: number) =>
    `${Intl.NumberFormat("us").format(value).toString()}`;

export default function HospitalPage({ params }: any) {
    let ambulance = params.id

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <div>
                <MenuBar header={ambulance}/>
            </div>
            <div>
                <Card>
                    <Title>ECG Graph</Title>
                    <AreaChart
                        data={performance}
                        index="seconds"
                        categories={["voltage"]}
                        colors={["blue"]}
                        showLegend={false}
                        valueFormatter={numberFormatter}
                        yAxisWidth={56}
                        className="h-96 mt-8"
                    />
                </Card>
            </div>
        </main>
    )
}