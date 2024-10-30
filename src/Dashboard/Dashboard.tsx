
import { useEffect, useState } from 'react'
import './Dashboard.css'
import { CPUSingle, DiskSingle, MemorySingle, UpTimeSingle } from './Components/Single/Singles'
import { CPUDouble, MemDouble } from './Components/Double/Doubles'
import Spinner from './Components/Spinner/Spinner'

function Dashboard() {
    const [dashboardData, setDashboardData] = useState<DashboardData>(defaultDashBoardData)

    const [loading, setLoading] = useState(true)

    const getData = () => {
        fetch('http://129.100.199.139:7000/dashboardAPI')
            .then((res) => res.json())
            .then((data: DashboardData) => {


                setLoading(false)

                setDashboardData(data)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>

            <div className='dashboardCont' >
                <div className='dashboardLoading' style={{ display: `${loading ? 'flex' : 'none'}` }}>
                    <Spinner></Spinner>
                </div>
                <div style={{ height: '1em', width: '100%' }}></div>
                <CPUSingle AvgLoad={Number(dashboardData.cpu.averageLoad.toFixed(1))} ></CPUSingle>
                <MemorySingle used={Number(dashboardData.memory.percentage.toFixed(1))}  ></MemorySingle>
                <DiskSingle used={Number(dashboardData.disk.percentage.toFixed(1))}></DiskSingle>
                <UpTimeSingle month={dashboardData.system.uptime[1]} day={dashboardData.system.uptime[2]}></UpTimeSingle>

                <CPUDouble></CPUDouble>
                <MemDouble></MemDouble>

                <div style={{ height: '10em', width: '100%' }}></div>
            </div >

        </>
    )
}
export default Dashboard




export interface DashboardData {
    cpu: CPU
    memory: Memory
    disk: Disk
    system: System
}


export interface CPU {
    averageLoad: number
    numberOfCores: number
    clockSpeed: number

}
export interface Memory {
    free: number
    total: number
    percentage: number

}
export interface Disk {
    total: string
    avalableSpace: string
    usedSpace: string
    percentage: number
}
export interface System {
    uptime: number[]
}
export class CPUInfo {
    load: number
    time: number

    constructor(l: number, t: number) {
        this.load = l
        this.time = t
    }
}
export class MemInfo {
    used: number
    total: number
    time: number
    constructor(u: number, t: number, ti: number) {
        this.used = u
        this.total = t
        this.time = ti
    }
}
const defaultDashBoardData: DashboardData = {
    cpu: {
        averageLoad: 0,
        numberOfCores: 0,
        clockSpeed: 0,

    },

    memory: {
        free: 0,
        total: 0,
        percentage: 0,

    },
    disk: {
        total: '',
        avalableSpace: '',
        usedSpace: '',
        percentage: 0
    },
    system: {
        uptime: [0, 0, 0]
    }
}