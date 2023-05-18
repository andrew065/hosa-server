'use client'

import { useEffect, useState } from "react";
import {Card, Flex, Metric, Title, Text, AreaChart} from "@tremor/react";
import {CosmosClient} from "@azure/cosmos";

interface props {
    client: CosmosClient,
    ecgStart: number,
    ecgEnd: number
}

interface dataPoint {
    seconds: string
    voltage: string
}

const datapoints = [
    {seconds: "1", voltage: "581"},
    {seconds: "2", voltage: "542"},
    {seconds: "3", voltage: "576"},
    {seconds: "4", voltage: "606"},
    {seconds: "5", voltage: "576"},
    {seconds: "6", voltage: "556"},
    {seconds: "7", voltage: "615"},
    {seconds: "8", voltage: "577"},
    {seconds: "9", voltage: "542"},
    {seconds: "10", voltage: "602"},
    {seconds: "11", voltage: "597"},
    {seconds: "12", voltage: "566"},
    {seconds: "13", voltage: "571"},
    {seconds: "14", voltage: "602"},
    {seconds: "15", voltage: "530"},
    {seconds: "16", voltage: "553"},
    {seconds: "17", voltage: "587"},
    {seconds: "18", voltage: "540"},
    {seconds: "19", voltage: "457"},
    {seconds: "20", voltage: "515"},
    {seconds: "21", voltage: "510"},
    {seconds: "22", voltage: "479"},
    {seconds: "23", voltage: "504"},
    {seconds: "24", voltage: "559"},
    {seconds: "25", voltage: "514"},
    {seconds: "26", voltage: "437"},
    {seconds: "27", voltage: "521"},
    {seconds: "28", voltage: "754"},
    {seconds: "29", voltage: "737"},
    {seconds: "30", voltage: "319"},
    {seconds: "31", voltage: "495"},
    {seconds: "32", voltage: "509"},
    {seconds: "33", voltage: "384"},
    {seconds: "34", voltage: "469"},
    {seconds: "35", voltage: "414"},
    {seconds: "36", voltage: "484"},
    {seconds: "37", voltage: "477"},
    {seconds: "38", voltage: "440"},
    {seconds: "39", voltage: "470"},
    {seconds: "40", voltage: "501"},
    {seconds: "41", voltage: "417"},
    {seconds: "42", voltage: "416"},
    {seconds: "43", voltage: "441"},
    {seconds: "44", voltage: "452"},
    {seconds: "45", voltage: "474"},
    {seconds: "46", voltage: "470"},
    {seconds: "47", voltage: "506"},
    {seconds: "48", voltage: "468"},
    {seconds: "49", voltage: "484"},
    {seconds: "50", voltage: "531"},
    {seconds: "51", voltage: "489"},
    {seconds: "52", voltage: "515"},
    {seconds: "53", voltage: "539"},
    {seconds: "54", voltage: "527"},
    {seconds: "55", voltage: "512"},
    {seconds: "56", voltage: "545"},
    {seconds: "57", voltage: "583"},
    {seconds: "58", voltage: "514"},
    {seconds: "59", voltage: "550"},
    {seconds: "60", voltage: "589"},
    {seconds: "61", voltage: "554"},
    {seconds: "62", voltage: "592"},
    {seconds: "63", voltage: "581"},
    {seconds: "64", voltage: "589"},
    {seconds: "65", voltage: "603"},
    {seconds: "66", voltage: "627"},
    {seconds: "67", voltage: "594"},
    {seconds: "68", voltage: "598"},
    {seconds: "69", voltage: "624"},
    {seconds: "70", voltage: "591"},
    {seconds: "71", voltage: "559"},
    {seconds: "72", voltage: "599"},
    {seconds: "73", voltage: "597"},
    {seconds: "74", voltage: "567"},
    {seconds: "75", voltage: "558"},
    {seconds: "76", voltage: "579"},
    {seconds: "77", voltage: "532"},
    {seconds: "78", voltage: "546"},
    {seconds: "79", voltage: "578"},
    {seconds: "80", voltage: "534"},
    {seconds: "81", voltage: "539"},
    {seconds: "82", voltage: "590"},
    {seconds: "83", voltage: "578"},
    {seconds: "84", voltage: "533"},
    {seconds: "85", voltage: "833"},
    {seconds: "86", voltage: "923"},
    {seconds: "87", voltage: "410"},
    {seconds: "88", voltage: "578"},
    {seconds: "89", voltage: "553"},
    {seconds: "90", voltage: "562"},
    {seconds: "91", voltage: "522"},
    {seconds: "92", voltage: "620"},
    {seconds: "93", voltage: "598"},
    {seconds: "94", voltage: "561"},
    {seconds: "95", voltage: "545"},
    {seconds: "96", voltage: "565"},
    {seconds: "97", voltage: "496"},
    {seconds: "98", voltage: "489"},
    {seconds: "99", voltage: "512"},
    {seconds: "100", voltage: "487"},
    {seconds: "101", voltage: "437"},
    {seconds: "102", voltage: "476"},
    {seconds: "103", voltage: "481"},
    {seconds: "104", voltage: "460"},
    {seconds: "105", voltage: "463"},
    {seconds: "106", voltage: "520"},
    {seconds: "107", voltage: "510"},
    {seconds: "108", voltage: "501"},
    {seconds: "109", voltage: "544"},
    {seconds: "110", voltage: "542"},
    {seconds: "111", voltage: "490"},
    {seconds: "112", voltage: "519"},
    {seconds: "113", voltage: "519"},
    {seconds: "114", voltage: "487"},
    {seconds: "115", voltage: "520"},
    {seconds: "116", voltage: "510"},
    {seconds: "117", voltage: "501"},
    {seconds: "118", voltage: "544"},
    {seconds: "119", voltage: "542"},
    {seconds: "120", voltage: "490"},
    {seconds: "121", voltage: "519"},
    {seconds: "122", voltage: "519"},
    {seconds: "123", voltage: "487"},
    {seconds: "124", voltage: "520"},
    {seconds: "125", voltage: "384"},
    {seconds: "126", voltage: "224"},
    {seconds: "127", voltage: "277"},
    {seconds: "128", voltage: "315"},
    {seconds: "129", voltage: "335"},
    {seconds: "130", voltage: "382"},
    {seconds: "131", voltage: "427"},
    {seconds: "132", voltage: "456"},
    {seconds: "133", voltage: "417"},
    {seconds: "135", voltage: "188"},
    {seconds: "136", voltage: "249"},
    {seconds: "137", voltage: "172"},
    {seconds: "138", voltage: "227"},
    {seconds: "139", voltage: "259"},
    {seconds: "140", voltage: "238"},
    {seconds: "141", voltage: "291"},
    {seconds: "142", voltage: "330"},
    {seconds: "143", voltage: "289"},
    {seconds: "144", voltage: "230"},
    {seconds: "145", voltage: "253"},
    {seconds: "146", voltage: "189"},
    {seconds: "147", voltage: "140"},
    {seconds: "148", voltage: "115"},
    {seconds: "149", voltage: "122"},
    {seconds: "150", voltage: "353"},
    {seconds: "151", voltage: "472"},
    {seconds: "152", voltage: "104"},
    {seconds: "153", voltage: "198"},
    {seconds: "154", voltage: "133"},
    {seconds: "155", voltage: "137"},
    {seconds: "156", voltage: "114"},
    {seconds: "158", voltage: "117"},
    {seconds: "159", voltage: "160"},
    {seconds: "160", voltage: "142"},
    {seconds: "161", voltage: "162"},
    {seconds: "162", voltage: "205"},
    {seconds: "163", voltage: "200"},
    {seconds: "164", voltage: "195"},
    {seconds: "165", voltage: "225"},
    {seconds: "166", voltage: "236"},
    {seconds: "167", voltage: "222"},
    {seconds: "168", voltage: "280"},
    {seconds: "169", voltage: "346"},
    {seconds: "170", voltage: "360"},
    {seconds: "171", voltage: "407"},
    {seconds: "172", voltage: "501"},
    {seconds: "173", voltage: "515"},
    {seconds: "174", voltage: "551"},
    {seconds: "175", voltage: "568"},
    {seconds: "176", voltage: "521"},
    {seconds: "177", voltage: "554"},
    {seconds: "178", voltage: "577"},
    {seconds: "179", voltage: "541"},
    {seconds: "180", voltage: "542"},
    {seconds: "181", voltage: "581"},
    {seconds: "182", voltage: "572"},
    {seconds: "183", voltage: "535"},
    {seconds: "184", voltage: "574"},
    {seconds: "185", voltage: "595"},
    {seconds: "186", voltage: "536"},
    {seconds: "187", voltage: "566"},
    {seconds: "188", voltage: "601"},
    {seconds: "189", voltage: "562"},
    {seconds: "190", voltage: "553"},
    {seconds: "191", voltage: "603"},
    {seconds: "192", voltage: "586"},
    {seconds: "193", voltage: "562"},
    {seconds: "194", voltage: "599"},
    {seconds: "195", voltage: "595"},
    {seconds: "196", voltage: "619"},
    {seconds: "197", voltage: "664"},
    {seconds: "198", voltage: "711"},
    {seconds: "199", voltage: "739"},
    {seconds: "200", voltage: "718"},
    {seconds: "201", voltage: "771"},
    {seconds: "202", voltage: "769"},
    {seconds: "203", voltage: "740"},
    {seconds: "204", voltage: "740"},
    {seconds: "205", voltage: "648"},
    {seconds: "206", voltage: "595"},
    {seconds: "207", voltage: "617"},
    {seconds: "208", voltage: "977"},
    {seconds: "209", voltage: "671"},
    {seconds: "210", voltage: "507"},
    {seconds: "211", voltage: "673"},
    {seconds: "212", voltage: "631"},
    {seconds: "213", voltage: "661"},
    {seconds: "214", voltage: "680"},
    {seconds: "215", voltage: "734"},
    {seconds: "216", voltage: "718"},
    {seconds: "217", voltage: "714"},
    {seconds: "218", voltage: "766"},
    {seconds: "219", voltage: "745"},
    {seconds: "220", voltage: "722"},
    {seconds: "221", voltage: "758"},
    {seconds: "222", voltage: "750"},
    {seconds: "223", voltage: "710"},
    {seconds: "224", voltage: "704"},
    {seconds: "225", voltage: "739"},
    {seconds: "226", voltage: "708"},
    {seconds: "227", voltage: "706"},
    {seconds: "228", voltage: "763"},
    {seconds: "229", voltage: "779"},
    {seconds: "230", voltage: "770"},
    {seconds: "231", voltage: "803"},
    {seconds: "232", voltage: "826"},
    {seconds: "233", voltage: "772"},
    {seconds: "234", voltage: "782"},
    {seconds: "235", voltage: "800"},
    {seconds: "236", voltage: "772"},
    {seconds: "237", voltage: "738"},
    {seconds: "238", voltage: "773"},
    {seconds: "239", voltage: "763"},
    {seconds: "240", voltage: "709"},
    {seconds: "241", voltage: "741"},
    {seconds: "242", voltage: "745"},
    {seconds: "243", voltage: "622"},
    {seconds: "244", voltage: "390"},
    {seconds: "245", voltage: "249"},
    {seconds: "246", voltage: "243"},
    {seconds: "248", voltage: "110"},
    {seconds: "252", voltage: "121"},
    {seconds: "253", voltage: "127"},
    {seconds: "254", voltage: "100"},
    {seconds: "255", voltage: "142"},
    {seconds: "256", voltage: "140"},
    {seconds: "257", voltage: "117"},
    {seconds: "258", voltage: "175"},
    {seconds: "259", voltage: "179"},
    {seconds: "260", voltage: "183"},
    {seconds: "261", voltage: "194"},
    {seconds: "262", voltage: "226"},
    {seconds: "263", voltage: "204"},
    {seconds: "264", voltage: "304"},
    {seconds: "265", voltage: "683"},
    {seconds: "267", voltage: "271"},
    {seconds: "268", voltage: "309"},
    {seconds: "269", voltage: "386"},
    {seconds: "270", voltage: "404"},
    {seconds: "271", voltage: "480"},
    {seconds: "272", voltage: "586"},
    {seconds: "273", voltage: "569"},
    {seconds: "274", voltage: "604"},
    {seconds: "275", voltage: "732"},
    {seconds: "276", voltage: "760"},
    {seconds: "277", voltage: "714"},
    {seconds: "278", voltage: "768"},
    {seconds: "279", voltage: "629"},
    {seconds: "280", voltage: "156"},
    {seconds: "281", voltage: "342"},
    {seconds: "282", voltage: "333"},
    {seconds: "283", voltage: "538"},
    {seconds: "284", voltage: "423"},
    {seconds: "285", voltage: "588"},
    {seconds: "286", voltage: "533"},
    {seconds: "287", voltage: "270"},
    {seconds: "288", voltage: "407"},
    {seconds: "289", voltage: "517"},
    {seconds: "290", voltage: "429"},
    {seconds: "291", voltage: "445"},
    {seconds: "292", voltage: "654"},
    {seconds: "293", voltage: "470"},
    {seconds: "294", voltage: "446"},
    {seconds: "295", voltage: "441"},
    {seconds: "296", voltage: "149"},
    {seconds: "297", voltage: "335"},
    {seconds: "298", voltage: "442"},
    {seconds: "299", voltage: "465"},
    {seconds: "300", voltage: "160"},
    {seconds: "301", voltage: "297"},
    {seconds: "302", voltage: "611"},
    {seconds: "303", voltage: "721"},
    {seconds: "304", voltage: "762"},
    {seconds: "305", voltage: "813"},
    {seconds: "306", voltage: "880"},
    {seconds: "307", voltage: "842"},
    {seconds: "308", voltage: "835"},
    {seconds: "309", voltage: "782"},
    {seconds: "310", voltage: "570"}
]

const numberFormatter = (value: number) =>
    `${Intl.NumberFormat("us").format(value).toString()}`;

const data: dataPoint[] = Array(150).fill({seconds: null, voltage: null})

async function getData(client: CosmosClient, ecgStart: number) {
    const containerItems = await client.database("testdb").container("EcgData").items
    const response = await containerItems.query(`SELECT * from c where c._ts >= ${ecgStart} ORDER BY c._ts ASC`).fetchAll()
    const items = response["resources"]
    // @ts-ignore
    const data: string[] = items.map(item => item["Body"]["ecgValue"])

    let array: dataPoint[] = []
    let count = 0

    data.forEach((v) => {
        array.push({
            seconds: count.toString(),
            voltage: v
        })
        count = count + 1
    })
    console.log(array)
    return array
}

export default function ECGChart(prop: props) {
    const [count, setCount] = useState(0)
    const [chartData, setChartData] = useState(data)
    const [pulse, setPulse] = useState("--")

    let num = 0

    useEffect(() => {
        const interval = setInterval( async() => {
            if (prop.ecgStart != 0) {
                const items = await getData(prop.client, prop.ecgStart).catch(e => console.error(e))

                const history = chartData

                if (items != null) {
                    history.concat(items)
                    setChartData(history.slice(history.length - 150, history.length))
                    console.log(chartData)
                }
            }

            //code for fake data
            // history.push(datapoints[num])
            // history.shift()
            // num = num + 1
            //
            // console.log(num, datapoints[num])
            // setChartData(history)

            // setChartData(history.concat(item))
            // console.log(prop.ecgStart, prop.ecgEnd)
        }, 100)
        return () => {
            clearInterval(interval)
        }
    }, [chartData, setChartData])

    return(
        <div className="mx-auto pt-5">
            <Flex>
                <div>
                    <Text className="font-semibold text-black">Pulse:</Text>
                    <Metric className="text-red-500">--</Metric>
                </div>
                <div>
                    <Text className="font-semibold text-black">BP:</Text>
                    <Metric className="text-yellow-500">--</Metric>
                </div>
                <div>
                    <Text className="font-semibold text-black">SpO2:</Text>
                    <Metric className="text-blue-600">--</Metric>
                </div>
            </Flex>
            <Title className="py-3">Live ECG Chart:</Title>
            <AreaChart
                data={chartData}
                index="seconds"
                categories={["voltage"]}
                colors={["red"]}
                showAnimation={false}
                showLegend={false}
                showTooltip={true}
                autoMinValue={true}
                valueFormatter={numberFormatter}
                yAxisWidth={35}
                minValue={0}
                maxValue={1000}
            />
        </div>
    )
}