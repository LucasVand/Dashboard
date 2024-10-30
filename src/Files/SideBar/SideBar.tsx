import './SideBar.css'
import '../Files.css'
import { Drive } from '../Classes'
import DiskIcon from './DiskIcon.png'
import ArrowIcon from '../../Dashboard/Components/Dropdown/UpArrow.png'

function SideBar(props: { drives: Drive[], changeDrive: Function, selectedDrive: Drive }) {

    const name = (item: Drive) => {
        if (item.name.length != 0) {
            return item.name
        } else {
            return item.label
        }
    }


    const driveItems = props.drives.map((drive, index) => {
        return (
            <>
                <div className={`sideBarDriveItem ${props.selectedDrive.driveLetter == drive.driveLetter ? 'toggle' : ''}`} onClick={() => { props.changeDrive(index) }} key={drive.id + "sidebaritem"}>
                    <img src={ArrowIcon} className='sideBarImg' style={{ scale: "0.5" }}></img>
                    <img src={DiskIcon} className='sideBarImg'></img>
                    <div style={{ width: '0.5em' }}></div>
                    <div className='sideBarName'>{name(drive)}</div>
                </div>
                <div className='sideBarDivider' key={drive.id + "sidebarDivider"}> </div>
            </>
        )
    })
    return (
        <>
            <div className='filesSideBarCont fileBG'>
                <div className='sideBarTitle'>Drives</div>
                <div className='sideBarDivider'> </div>
                {driveItems}
            </div>
        </>
    )
}



export default SideBar