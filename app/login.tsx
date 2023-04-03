'use client'

import {Card, TextInput, Title, Button} from "@tremor/react";
import { useRouter, } from 'next/navigation'
import { useState, } from 'react'
import verify from './login-authentication'

export default function LoginPage() {
    const [username, setUser] = useState('')
    const [password, setPass] = useState('')
    const [userError, setUserError] = useState(true)
    const router = useRouter()
    const handleClick = () => {
        const valid = verify(username, password)

        if (valid === 'hospital') {
            setUserError(true)
            router.push(`./${username}`) // TODO: add authentication
        }
        else if (valid === 'ambulance') {
            setUserError(true)
            router.push(`./ambulance/${username}`)
        }
        else {
            setUserError(false)
        }


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
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChange={e => setPass(e.currentTarget.value)}
                        error={false}
                        errorMessage="Invalid username and password"
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