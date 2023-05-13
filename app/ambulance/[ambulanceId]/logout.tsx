'use client'

import { Flex, Title } from "@tremor/react";
import { Menu, Transition } from "@headlessui/react"
import { useRouter } from "next/navigation";
import Image from 'next/image'
import classNames from "classnames";
import {CosmosClient} from "@azure/cosmos";

const endpoint = "https://uhndescosmosdb.documents.azure.com:443/" //URI
const primaryKey = 'w74NNXmQZ7o6FRDeoZvBLxieTszfzvIaRDAqFyf3itgSAmqQwuH8RIqMScDfkmVAShB5BLmsImHOACDbUlFolg=='
const databaseId = 'testdb'
const containerId = 'AmbulanceData'

interface props {
    ambulanceId: string
}

async function signOut(id: string, router: any) {
    const client = new CosmosClient({endpoint: endpoint, key: primaryKey});
    const container = await client.database(databaseId).container(containerId)
    const patch = await container.item(id, id).patch([{op: 'set', path: '/connected', value: false}, {op: 'set', path: '/patientId', value: 'null'}])
    console.log(patch)
    client.dispose()
    router.push('/')
}

export default function Logout(prop: props) {
    const id = prop.ambulanceId
    const router = useRouter()

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
                                    <Menu.Button className="flex rounded-full bg-white text-sm hover:outline-none hover:ring-2 hover:ring-slate-500 hover:ring-offset-2">
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
                                    <Menu.Items className="z=50 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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