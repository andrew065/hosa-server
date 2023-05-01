import {Card, Grid, Text, Title} from "@tremor/react";
import {router} from "next/client";
import {useRouter} from "next/navigation";

interface patientItem {
    id: string
    age: number
    status: string
    unit: string
    ecgStart: string
    ecgEnd: string
    ambulanceId: string
    hospitalId: string
    active: boolean
}

export default function CardGrid(items: patientItem[], url: string) {
    const router = useRouter()

    return(
        <div>
            {items?.map((item) => {
                const {id, status, unit} = item || {}
                return(
                    <Card className={'bg-white'} key={id} onClick={()=>{ //todo: variable onClick function
                        router.push(url + id)
                    }}>
                        <Title>{`${id}`}</Title>
                        <Text>{`Status: ${status}`}</Text>
                        <Text>{`Unit: ${unit}`}</Text>
                    </Card>
                )
            })}
        </div>
    )
}