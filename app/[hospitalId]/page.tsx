import {Title} from "@tremor/react";

export default function HospitalPage({ params }: any) {
    let hospital = params.hospitalId
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl align-content: center">
            <div>
                <h1>{hospital}</h1>
            </div>
        </main>
    )
}