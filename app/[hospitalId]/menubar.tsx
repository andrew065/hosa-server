import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from '@tremor/react'

export default function MenuBar() {
    const router = useRouter()
    return(
        <main>
            <div>
                <li>
                    <Link href="\">Back</Link>
                </li>
            </div>
        </main>
    )
}