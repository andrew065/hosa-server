'use client'

import {Card, Grid, Text, Title} from "@tremor/react";
import {useRouter} from "next/navigation";

interface props {
    items: any[]
    url: string
}

export default function CardGrid(variables: props) {
    const router = useRouter()
    const length = variables.items.length

    return(
        <div>
            {length === 0? <Title className="text-center">No Patients Found</Title> :
                <Grid className="gap-6" numColsSm={2} numColsLg={3}>
                    {variables.items?.map((item) => {
                        const {id, status, unit, ambulanceId} = item || {}
                        return(
                            <Card className={'bg-white'} key={id} onClick={()=>{
                                router.push(variables.url + id) //todo: custom onclick function
                            }}>
                                <Title>{`${id}`}</Title>
                                <Text>{`Status: ${status}`}</Text>
                                <Text>{`Unit: ${unit}`}</Text>
                                <Text className="pt-3">{`Ambulance: ${ambulanceId}`}</Text>
                            </Card>
                        )
                    })}
                </Grid>
            }
        </div>
    )
}