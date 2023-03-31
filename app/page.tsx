'use client'

import {Inter} from 'next/font/google'
import {Card, Flex, Grid, LineChart, Metric, Text} from "@tremor/react";
import LoginPage from "@/app/login";

const inter = Inter({ subsets: ['latin'] })

const chartdata = [
    {
        year: 1951,
        "Population growth rate": 1.74,
    },
    {
        year: 1952,
        "Population growth rate": 1.93,
    },
    {
        year: 1953,
        "Population growth rate": 1.9,
    },
    {
        year: 1954,
        "Population growth rate": 1.98,
    },
    {
        year: 1955,
        "Population growth rate": 2,
    },
]


const dataFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()}%`;

export default function IndexPage() {
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <LoginPage />
        </main>
    )
}
