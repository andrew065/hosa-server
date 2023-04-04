'use client'

import { Flex, Title } from "@tremor/react";
import { Menu, Transition } from "@headlessui/react"
import { useRouter } from "next/navigation";
import Image from 'next/image'
import classNames from "classnames";
import {CosmosClient} from "@azure/cosmos";

const endpoint = 'https://hosa-storage-database.documents.azure.com:443/' //URI
const primaryKey = 'DX1PGkqsKsqBMQsPw1k5YkokOzMupR0ezAls4fXYctxy55HsOaH9gjhonD3CPiwDv5d9j0f6ncRBACDb4DItXw=='
const databaseId = 'hosa-database'
const containerId = 'AmbulanceData'

interface ambulanceItem {
    id: string
    status: string
    unit: string
    lat: number
    long: number

}

async function signOut(ambulanceId: string, router: any) {
    console.log(ambulanceId)
    const client = new CosmosClient({endpoint: endpoint, key: primaryKey});
    const container = await client.database(databaseId).container(containerId)
    const item = await container.item(ambulanceId, ambulanceId).delete()
    console.log(item)
    router.back()
}

async function addItem(client: CosmosClient, ambulanceId: string) {
    const container = await client.database(databaseId).container(containerId)
    const item = await container.item(ambulanceId, ambulanceId).read()
}

async function udpateItem(client: CosmosClient, ambulanceId: string) {
    const container = await client.database(databaseId).container(containerId)
    const item = await container.item(ambulanceId, ambulanceId).replace({}) //TODO: create interface instance
    //todo: maybe change replace to patch
}

export default function Logout(ambulanceId: any) {
    const id = String(ambulanceId.ambulanceId)
    const router = useRouter()

    console.log(id)

    return(
        <div>
            <main className="bg-white shadow-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Flex className="flex h-16 justify-between">
                        <div className="">
                            <Title>{id}</Title>
                        </div>
                        <div >
                            <Menu>
                                <div>
                                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                                        <span className="sr-only">Open user menu</span>
                                        <Image
                                            className="h-8 w-8 rounded-full"
                                            src="/user_circle.svg"
                                            height={32}
                                            width={32}
                                            alt="/user_circle.svg"
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    enter="transition ease-out duration-200"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={classNames(
                                                        active ? 'bg-gray-100' : '',
                                                        'flex w-full px-4 py-2 text-sm text-gray-700'
                                                    )}
                                                    onClick={() => {
                                                        signOut(id, router).catch(r => console.error(r))
                                                    }}
                                                >
                                                    Sign out
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </Flex>
                </div>
            </main>
        </div>
    )
}