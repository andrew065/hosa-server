'use client'

import { useEffect, useState } from "react";
import {Card, Flex, Metric, Title, Text, AreaChart} from "@tremor/react";

interface props {
    ecgStart: string,
    ecgEnd: string
}

const numberFormatter = (value: number) =>
    `${Intl.NumberFormat("us").format(value).toString()}`;

const data = [{seconds: 0, voltage: 0}]

export default function ECGChart(prop: props) {
    const [count, setCount] = useState(0)
    const [chartData, setChartData] = useState(data)

    useEffect(() => {
        const interval = setInterval( () => {
            const item = [{seconds: 2 ^ count, voltage: 2 ^ count}]
            const history = chartData
            if (history.length > 5) {
                history.shift()
            }
            setCount(count + 1)
            setChartData(history.concat(item))
        }, 2000)
        return () => {
            clearInterval(interval)
        }
    }, [chartData, setChartData])

    return(
        <div className="mx-auto pt-5">
            <Flex>
                <div>
                    <Text className="font-semibold text-black">Pulse:</Text>
                    <Metric className="text-red-500">75</Metric>
                </div>
                <div>
                    <Text className="font-semibold text-black">BP:</Text>
                    <Metric className="text-yellow-500">--</Metric>
                </div>
                <div>
                    <Text className="font-semibold text-black">SpO2:</Text>
                    <Metric className="text-blue-600">--</Metric>
                </div>
            </Flex>
            <Title className="py-3">Live ECG Chart:</Title>
            <AreaChart
                data={chartData}
                index="seconds"
                categories={["voltage"]}
                colors={["red"]}
                showAnimation={false}
                showLegend={false}
                showTooltip={true}
                autoMinValue={true}
                valueFormatter={numberFormatter}
                yAxisWidth={30}
            />
        </div>
    )
}