import { useState } from 'react'
import './Dropdown.css'
import UpArrow from './UpArrow.png'
interface DropdownProps {
    mainText: string
    items: string[]
    onClick: Function
}

function Dropdown(props: DropdownProps) {
    const items = props.items.map((value, index) => {
        return (
            <div className='dropdownItemCont' style={{ animationDelay: `${index * 0.03}s` }} key={value + index + 'This is gay'}>
                <div className='dropdownItem' onClick={() => props.onClick(index)} key={value + index + Math.random()}>{value}</div>
            </div>
        )
    })
    const [hover, setHover] = useState(false)

    return (
        <>
            <div className='dropdownCont' onMouseLeave={() => { setHover(false) }} onMouseEnter={() => setHover(true)}>
                <div className='dropdown'>{props.mainText}<img src={UpArrow} className={`dropdownArrow ${hover ? 'dropdownIn' : 'dropdownOut'} `} ></img></div>
                <div className='dropdownSpacer'></div>
                {items}
            </div >
        </>
    )
}

export default Dropdown