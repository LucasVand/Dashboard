import { Single } from "./Single";
import './Single.css'
import '../../Dashboard.css'

import CPUIcon from './assets/CPUIcon.png'
import DiskIcon from './assets/DiskIcon.png'
import MemoryIcon from './assets/MemoryIcon.png'

import ClockIcon from './assets/ClockIcon.png'
// import EmptyBat from './assets/empty-battery.png'
// import LowBat from './assets/low-battery.png'
// import HalfBat from './assets/half-battery.png'
// import Bat from './assets/battery.png'
// import FullBat from './assets/full-battery.png'

export function CPUSingle(props: { AvgLoad: number }) {
    return (
        <>
            <Single icon={CPUIcon} mainText={props.AvgLoad.toString()} subText={"CPU Load"} unit="%"></Single>
        </>
    )
}
export function MemorySingle(props: { used: number }) {
    return (
        <>
            <Single icon={MemoryIcon} mainText={props.used.toString()} subText={"Memory Usage"} unit="%"></Single>
        </>
    )
}
export function DiskSingle(props: { used: number }) {
    return (
        <>
            <Single icon={DiskIcon} mainText={props.used.toString()} subText={"Disk Usage"} unit="%"></Single>
        </>
    )
}

export function UpTimeSingle(props: { month: number, day: number }) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
        <>
            <Single icon={ClockIcon} mainText={months[props.month - 1] + ', ' + props.day} subText={"On Since"} unit=""></Single >
        </>
    )
}