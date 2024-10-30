import './TopBar.css'
import DashboardIcon from './assets/dashboardIcon.png'
import MenuIcon from './assets/MenuIcon.png'
import SettingsIcon from './assets/SettingsIcon.png'

//import HasNotificationIcon from './assets/HasNotificationIcon.png'
import NotificationIcon from './assets/NotificationIcon.png'
interface TopBarProps {

    navBarOpen: boolean
    onClickOfIcon: Function
}

function TopBar(props: TopBarProps) {
    const DashboardIconAngle = () => {
        if (props.navBarOpen) {
            return 360
        } else {
            return 0
        }
    }
    return (
        <>
            <div className='topBarCont'>
                <div className='topBarSecCont'>
                    <div style={{ width: '2em' }}></div>
                    <div className='topBarTitleCont' style={{ width: `${props.navBarOpen ? '10em' : '0'}` }}>

                        <img src={DashboardIcon} className='topBarImg' onClick={() => { window.location.reload() }}></img>
                        <div className='topBarTitle' onClick={() => { window.location.reload() }}>Dashboard</div>
                        <div style={{ width: '4em' }}></div>
                    </div>
                    <img style={{ transform: `rotate(${DashboardIconAngle()}deg)` }} src={MenuIcon} className='topBarImg' onClick={() => { props.onClickOfIcon() }}></img>
                </div>
                <div className='topBarSecCont'>
                    <img src={NotificationIcon} className='topBarImg topBarSettings'></img>
                    <div style={{ width: '2em' }}></div>
                    <img src={SettingsIcon} className='topBarImg topBarSettings'></img>
                    <div style={{ width: '2em' }}></div>
                </div>
            </div>

        </>
    )
}

export default TopBar