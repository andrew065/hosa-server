'use client'

import {Card, TextInput, Title, Button} from "@tremor/react";
import { useRouter, } from 'next/navigation'
import { useState, } from 'react'
import Link from "next/link";


export default function LoginPage() {
    const [username, setUser] = useState('')
    const [password, setPass] = useState('')
    const router = useRouter()
    const handleClick = () => {
        router.push(`./${username}`) // TODO: add authentication
    }

    return (
        <main className="container mx-auto">
            <div className="">
                <Card className="space-y-2 p-10">
                    <Title className="pb-2">Login</Title>
                    <TextInput
                        placeholder="Username"
                        value={username}
                        onChange={e => setUser(e.currentTarget.value)}
                        error={false}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChange={e => setPass(e.currentTarget.value)}
                    />
                    <div className="pt-3">
                        <Button size="sm" onClick={() => handleClick()}>
                            Login
                        </Button>
                        <Button size="sm" onClick={() => router.push("./ambulance/ambu1")}>Ambulance Page</Button>
                    </div>
                </Card>
            </div>
        </main>
    )
}