import { useState } from 'react'
import './TapToShow.css'
import XIcon from './XIcon.png'
interface TapToShowProps {
    img: string
    children?: React.ReactNode
    size?: string
}

function TapToShow(props: TapToShowProps) {
    const [active, setActive] = useState(false)
    return (
        <>
            <div className='tapToShowCont' onClick={() => { setActive(!active) }} >
                <img className='tapToShowImg' src={props.img} style={{ width: `${props.size}`, height: `${props.size}` }}></img>
                <div className={`${active ? "tapToShowItemsCont" : 'gone'}`}>
                    <img className='tapToShowClose' src={XIcon} onClick={() => { setActive(false) }}></img>
                    {props.children}
                </div>
            </div>
        </>
    )
}

export default TapToShow