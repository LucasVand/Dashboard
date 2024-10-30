import { useEffect, useState } from "react";
import { CPUInfo, MemInfo } from "../../Dashboard";
import Double from "./Double";

export function CPUDouble() {
    const [cpuLogs, setcpuLogs] = useState<CPUInfo[][]>([[]])
    const getLogs = () => {
        fetch('http://129.100.199.139:7000/loggingInfoCPU')
            .then((res) => res.json())
            .then((data: CPUInfo[][]) => {

                setcpuLogs(data)

            })
    }
    useEffect(() => {
        getLogs()
    }, [])
    const values = () => {
        const returnArr: number[][] = []
        cpuLogs.forEach(() => {
            const blank: number[] = []
            returnArr.push(blank)
        })
        cpuLogs.forEach((cpuLogArr: CPUInfo[], index) => {
            cpuLogArr.forEach((cpuLog: CPUInfo) => {
                returnArr[index].push(cpuLog.load)
            })
        })
        return returnArr
    }
    const times = () => {
        const returnArr: number[][] = []
        cpuLogs.forEach((cpuLogArr: CPUInfo[], index) => {
            returnArr.push([])
            cpuLogArr.forEach((cpuLog: CPUInfo) => {
                returnArr[index].push(cpuLog.time)
            })
        })
        return returnArr
    }


    return (
        <>


            <Double title={"CPU Load"} values={values()} times={times()} max={100} unit="%" decimals={2}></Double>
        </>
    )
}

export function MemDouble() {
    const [memLogs, setMemLogs] = useState<MemInfo[][]>([[]])
    const getLogs = () => {
        fetch('http://129.100.199.139:7000/loggingInfoMem')
            .then((res) => res.json())
            .then((data: MemInfo[][]) => {

                setMemLogs(data)

            })
    }
    useEffect(() => {
        getLogs()
    }, [])
    const values = () => {
        const returnArr: number[][] = []
        memLogs.forEach(() => {
            const blank: number[] = []
            returnArr.push(blank)
        })
        memLogs.forEach((memLogArr: MemInfo[], index) => {

            memLogArr.forEach((memLog: MemInfo) => {
                returnArr[index].push(memLog.used / 1000)
            })
        })
        return returnArr
    }
    const times = () => {
        const returnArr: number[][] = []
        memLogs.forEach((memLogArr: MemInfo[], index) => {
            returnArr.push([])
            memLogArr.forEach((memLog: MemInfo) => {
                returnArr[index].push(memLog.time)
            })
        })
        return returnArr
    }
    const maxMem = () => {
        var max = 0
        memLogs.forEach((memLogs) => {
            memLogs.forEach((memlog) => {
                if (memlog.total / 1000 > max) {
                    max = memlog.total / 1000
                }
            })
        })
        return max
    }


    return (
        <>
            <div></div>
            <Double title={"Memory Load"} values={values()} times={times()} max={maxMem()} unit="gb" decimals={1}></Double>
        </>
    )
}