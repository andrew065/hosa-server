'use client'

import { useState } from "react";
import {Button, Card, TextInput, Title} from "@tremor/react";

export default function InfoForm(container: any) {
    const [status, setStatus] = useState('Patient Status')
    const [unit, setUnit] = useState('Anticipated Unit')

    const handleClick = () => {
        console.log(status, unit)
    }

    return(
        <div>
            <Card className="space-y-2 p-10">
                <Title className="pb-2">Login</Title>
                <TextInput // TODO: add error/invalid input
                    placeholder={status}
                    value={status}
                    onChange={e => setStatus(e.currentTarget.value)}
                />
                <TextInput // TODO: add error/invalid input
                    placeholder={unit}
                    value={unit}
                    onChange={e => setUnit(e.currentTarget.value)}
                />
                <div className="pt-3">
                    <Button size="sm" onClick={() => handleClick()}>
                        Set Variables
                    </Button>
                </div>
            </Card>
        </div>
    )
}