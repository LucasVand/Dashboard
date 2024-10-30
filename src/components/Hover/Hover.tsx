import { useState } from 'react'
import './Hover.css'



function Hover(props: { items?: string[], img: string, children?: React.ReactNode }) {
    const [hover, setHover] = useState(false)

    const childrenOrItems = () => {
        if (props.items != undefined) {
            const hoverItems = props.items.map((item: string, index) => {
                return (<div className='hoverItem' key={item + "hover item" + index}>{item}</div>)
            })
            return hoverItems
        } else {
            return props.children
        }
    }

    return (
        <>
            <div className='hoverCont' onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }}>
                <img className='hoverImg' src={props.img}></img>
                <div className={`${hover ? "hoverInfoCont" : 'gone'}`}>
                    {childrenOrItems()}
                </div>
            </div>
        </>
    )
}
export default Hover