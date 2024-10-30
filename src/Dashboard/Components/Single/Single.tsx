import './Single.css'
import '../../Dashboard.css'


interface SingleProps {
    icon: string
    mainText: string
    subText: string
    unit: string
}
export function Single(props: SingleProps) {

    return (
        <>
            <div className='dashboardBG singleWidth singleHeight'>
                <img className='singleImg' src={props.icon}></img>
                <div className='singleCont'>
                    <div className='singleTopText'>{props.subText}</div>
                    <div className='singleMainText'>{props.mainText + props.unit}</div>
                </div>

            </div >
        </>
    )
}
//    background-image: conic-gradient(from 90deg at 50% 140%, #000000FF 43%, #66d1fa 65%, #9245f6 80%);


// function Ring(props: { percent: number }) {

//     const angle = () => {
//         const rate = 110 + 110
//         const dec = props.percent / 100
//         const add = rate * dec
//         return -110 + add
//     }
//     const black = () => {
//         const rate = 80
//         const dec = 1 - (props.percent / 100)
//         return 13 + rate * dec
//     }

//     return (
//         <div className='ringCont'>
//             <div className='ringOuter' style={{ backgroundImage: `conic-gradient(from ${angle()}deg at 6em 6em, #000000FF ${black()}%, #66d1fa 79%, #9245f6 90%)` }}>
//                 <div className='ringInter'></div>
//                 <div className='ringText'>{props.percent + "%"}</div>

//                 <div className='tryCont first'>
//                     <div className='try'></div>
//                 </div>
//                 <div className='tryCont second'>
//                     <div className='try'></div>
//                 </div>

//             </div>
//             <div className='overflowHidder'></div>
//         </div>
//     )
// }