'use client'

import {Card, TextInput, Title, Button, Text} from "@tremor/react";
import { useRouter, } from 'next/navigation'
import { useState, } from 'react'
import Image from 'next/image'
import verify from './login-authentication'

export default function LoginPage() {
    const [username, setUser] = useState('')
    const [password, setPass] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [userError, setUserError] = useState(false)
    const [passError, setPassError] = useState(false)
    const router = useRouter()
    const handleClick = () => {
        const valid = verify(username, password)

        if (valid === 'hospital') {
            setUserError(false)
            setErrorMsg('')
            router.push(`./${username}`)
        }
        else if (valid === 'ambulance') {
            setUserError(false)
            setErrorMsg('')
            router.push(`./ambulance/${username}`)
        }
        else if (valid === 'hospital-pass' || valid === 'ambulance-pass') {
            setErrorMsg('Invalid password')
            setPass('')
            setPassError(true)
        }
        else {
            setErrorMsg('Invalid username & password')
            setUserError(true)
            setPassError(true)
            setUser('')
            setPass('')
        }
    }

    return (
        <main className="container mx-auto">
            <div className="pt-10 grid grid-cols-1">
                <div className="mx-auto">
                    <Image className="pb-3" src="/hosa_logo.png" alt="/hosa_logo.png" width={300} height={100}/>
                </div>
                <div>
                    <Card className="space-y-2 p-10">
                        <Title className="pb-2">Login</Title>
                        <TextInput
                            placeholder="Username"
                            value={username}
                            error={userError}
                            onChange={e => {
                                setUser(e.currentTarget.value)
                                setErrorMsg('')
                                setUserError(false)
                            }}/>
                        <TextInput
                            placeholder="Password"
                            type="password"
                            value={password}
                            error={passError}
                            errorMessage={errorMsg}
                            onChange={e => {
                                setPass(e.currentTarget.value)
                                setErrorMsg('')
                                setPassError(false)
                            }}
                        />
                        <div className="pt-3">
                            <Button size="sm" onClick={() => handleClick()}>
                                Login
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    )
}