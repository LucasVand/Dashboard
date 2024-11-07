import './SideBar.css'
import '../Files.css'
import { Drive } from '../Classes'
import DiskIcon from './DiskIcon.png'
import ArrowIcon from '../../Dashboard/Components/Dropdown/UpArrow.png'
import { useState } from 'react'
import { useWindowSize } from '../../HelperFunctions/Hooks'

function SideBar(props: { drives: Drive[], changeDrive: Function, selectedDrive: Drive }) {
    const windowSize = useWindowSize()
    const [open, setOpen] = useState(true)
    const name = (item: Drive) => {
        if (item.name.length != 0) {
            return item.name
        } else {
            return item.label
        }
    }


    const driveItems = props.drives.map((drive, index) => {
        if (open) {
            return (
                <>
                    <div className={`sideBarDriveItem ${props.selectedDrive.driveLetter == drive.driveLetter ? 'toggle' : ''}`} onClick={() => { props.changeDrive(index) }} key={drive.id + "sidebaritem"}>
                        <img src={ArrowIcon} className='sideBarImg' style={{ scale: "0.5" }} ></img>
                        <img src={DiskIcon} className='sideBarImg'></img>
                        <div style={{ width: '0.5em' }}></div>
                        <div className='sideBarName'>{name(drive)}</div>
                    </div>
                    <div className='sideBarDivider' key={drive.id + "sidebarDivider"}> </div>
                </>
            )
        }
    })
    const findHeight = () => {
        if (windowSize[0] > 800) {
            return 34
        }
        if (open) {
            return props.drives.length * 6

        } else {
            return 5
        }
    }

    return (
        <>
            <div className='filesSideBarCont fileBG' style={{ height: `${findHeight()}em` }}>
                <div className={`sideBarCollapseButton ${open ? 'open' : ''}`} onClick={() => { setOpen(!open) }}>
                    <img className='sideBarImg' src={ArrowIcon}></img>
                </div>
                <div className='sideBarTitle'>Drives</div>
                <div className='sideBarDivider'> </div>
                {driveItems}
            </div>
        </>
    )
}



export default SideBar