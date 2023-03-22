'use client'

import {Card, TextInput, Title, Button} from "@tremor/react";
import Link from 'next/link'
import { useRouter, redirect } from 'next/navigation'
import { useEffect } from 'react'

function loginEvent(hos_id: string) {
    console.log('button clicked')

    return(
        redirect(`./${hos_id}`)
    )
}

const page = (hos_id: string) => {
    const { push } = useRouter()
    useEffect(() => {
        push(`./${hos_id}`)
    }, [])
    return <p></p>
}

export default function LoginPage({ disabled }: { disabled?: boolean }) {
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl align-content: center">
            <div className="container mx auto align-content: center">
                <Card className="">
                    <Title>Login</Title>
                    <TextInput placeholder="Username" error={true} errorMessage="Invalid Input"/>
                    <Button size="xl" onClick={() => loginEvent('hospital1')}>
                        Login
                    </Button>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        disabled={disabled}

                    />
                    <Link href={"./hospital1"}>
                        <Card>
                            <Title>Manual Link</Title>
                        </Card>
                    </Link>
                </Card>
            </div>
        </main>


    )
}