'use client'

import {Card, TextInput, Title, Button} from "@tremor/react";
import { useRouter, } from 'next/navigation'
import { useState, } from 'react'


export default function LoginPage() {
    const [username, setUser] = useState('')
    const [password, setPass] = useState('')
    const router = useRouter()
    const handleClick = () => {
        router.push(`./${username}`) // TODO: add authentication
    }

    return (
        <main className="p-5 md:p-40 mx-auto  align-content: center">
            <div className="container mx auto align-content: center">
                <Card className="">
                    <Title>Login</Title>
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
                    <Button size="xl" onClick={() => handleClick()}>
                        Login
                    </Button>
                </Card>
            </div>
        </main>
    )
}