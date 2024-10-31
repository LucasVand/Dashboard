import { useState } from 'react'
import './TapToShow.css'
import XIcon from './XIcon.png'
interface TapToShowProps {
    img: string
    children?: React.ReactNode
    size?: string
    right?: string
}

function TapToShow(props: TapToShowProps) {
    const [active, setActive] = useState(false)
    return (
        <>
            <button className='tapToShowCont' onBlur={() => { setActive(false) }} onClick={() => { setActive(!active) }} >
                <img className={`tapToShowImg ${active ? 'toggle' : ''}`} src={props.img} style={{ width: `${props.size}`, height: `${props.size}` }}></img>
                <div className={`${active ? "tapToShowItemsCont" : 'gone'}`} style={{ left: `${props.right}` }}>
                    <img className='tapToShowClose' src={XIcon} onClick={() => { setActive(false) }}></img>
                    <div style={{ overflow: 'hidden' }}>{props.children}</div>
                </div>
            </button>
        </>
    )
}

export default TapToShow