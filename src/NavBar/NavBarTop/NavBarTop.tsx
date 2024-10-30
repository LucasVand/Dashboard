import { useEffect, useState } from 'react'
import './NavBarTop.css'

import IPIcon from './assets/IPIcon.png'
import WifiIcon from './assets/WifiIcon.png'
import EthernetIcon from './assets/ethernet.png'
import LatencyIcon from './assets/LatencyIcon.png'
import RestartIcon from './assets/RestartIcon.png'
import { getNavbarData } from '../NavBarAPI'




function NavBarTop(props: { open: boolean }) {
    const [IP, setIP] = useState('Loading')
    const [modeOfConnection, setModeOfConnection] = useState('Loading')
    const [latency, setLatency] = useState('')
    const [restartCount, setRestartCount] = useState(0)
    const setData = () => {
        setLatency("Pending")
        const oldTime = Date.now()
        getNavbarData()
            .then((data) => {
                setIP(data[0])
                setModeOfConnection(data[1])
                const diff = Date.now() - oldTime
                setLatency(diff + "ms")
            })
        setRestartCount(restartCount + 1)
    }

    useEffect(() => {
        setData()
    }, [])



    return (
        <>
            <div className='navBarTopCont'>
                <div></div>

                <div className={`navBarTopItem ${props.open ? '' : 'Closed'}`}>
                    <img src={IPIcon} className='navBarTopImg'></img> {props.open ? IP : ''}
                </div>
                <div className={`navBarTopItem ${props.open ? '' : 'Closed'}`}>
                    <img src={modeOfConnection == "Ethernet" ? EthernetIcon : WifiIcon} className='navBarTopImg'></img> {props.open ? (modeOfConnection + ' ') : ' '}
                </div>
                <div className={`navBarTopItem ${props.open ? '' : 'Closed'}`}>
                    <img src={LatencyIcon} className='navBarTopImg'></img> {props.open ? latency : ''}
                    <img src={RestartIcon} className='navBarTopRestart navBarTopImg' onClick={setData} style={{ display: `${props.open ? 'block' : 'none'}` }}></img>
                </div>
            </div >

        </>
    )
}
export default NavBarTop