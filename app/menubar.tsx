'use client'

import { useRouter } from 'next/navigation'
import {Button, Flex, Title} from '@tremor/react'

export default function MenuBar(header: any) {
    const router = useRouter()
    return(
        <main className="bg-white shadow-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Flex className="flex h-16 justify-between">
                    <div className="">
                        <Title>{header.header}</Title>
                    </div>
                    <div >
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => router.back()}
                        >
                            Back
                        </Button>
                    </div>
                </Flex>
            </div>
        </main>
    )
}