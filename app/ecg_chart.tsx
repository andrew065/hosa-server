'use client'

import { useEffect, useState } from "react";
import { Card, LineChart, Title } from "@tremor/react";

const numberFormatter = (value: number) =>
    `${Intl.NumberFormat("us").format(value).toString()}`;

const data = [{seconds: 0, voltage: 0}]

export default function ECGChart() {
    const [count, setCount] = useState(0)
    const [chartData, setChartData] = useState(data)

    useEffect(() => {
        const interval = setInterval( () => {
            const item = [{seconds: 1 + count, voltage: 1 + count}]
            const history = chartData
            history.shift()
            setCount(count + 1)
            setChartData(history.concat(item))
        }, 2000)
        return () => {
            clearInterval(interval)
        }
    }, [chartData, setChartData])

    return(
        <div className="mx-auto">
            <Card>
                <Title className="text-center">Live ECG Chart</Title>
                <LineChart
                    data={chartData}
                    index="seconds"
                    categories={["voltage"]}
                    colors={["blue"]}
                    showAnimation={true}
                    showLegend={false}
                    showTooltip={false}
                    autoMinValue={true}
                    valueFormatter={numberFormatter}
                    yAxisWidth={56}
                    className="h-96 mt-8"
                />
            </Card>
        </div>
    )
}