'use client'

import {Card, TextInput, Title, Button} from "@tremor/react";

function loginEvent() {
    console.log('button clicked')
}

export default function LoginPage({ disabled }: { disabled?: boolean }) {
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl align-content: center">
            <div className="container mx auto align-content: center">
                <Card className="">
                    <Title>Login</Title>
                    <TextInput placeholder="Username" error={true} errorMessage="Invalid Input"/>
                    <Button size="xl" onClick={() => loginEvent()}>
                        Login
                    </Button>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        disabled={disabled}

                    />
                </Card>
            </div>
        </main>


    )
}