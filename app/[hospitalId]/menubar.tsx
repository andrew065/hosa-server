'use client'

import { useRouter } from 'next/navigation'
import { Button, Flex, Metric } from '@tremor/react'

export default function MenuBar(header: any) {
    const router = useRouter()
    return(
        <main>
            <div>
                <Flex>
                    <div>
                        <Metric>{header.header}</Metric>
                    </div>
                    <div>
                        <Button onClick={() => router.back()}>Back</Button>
                    </div>
                </Flex>
            </div>
        </main>
    )
}