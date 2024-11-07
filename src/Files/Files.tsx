import { useEffect, useState } from 'react'
import { Directory, Drive } from './Classes'
import { defaultDir, defaultDrive } from './Classes'
import './Files.css'
import FileToolBar from './FileToolBar/FileToolBar'
import SideBar from './SideBar/SideBar'
import FileExplorer from './FileExplorer/FileExplorer'



function Files() {
    const [drives, setDrives] = useState<Drive[]>([defaultDrive])
    const [selecteddrive, setSelectedDrive] = useState<Drive>(defaultDrive)
    const [currentDir, setCurrentDir] = useState<(Directory | Drive)>(defaultDir)


    const changeCurrentDir = (dir: Directory | Drive) => {
        setCurrentDir(dir)
    }

    const getFileData = () => {
        fetch('http://129.100.199.139:7000/CloudFiles')
            .then(res => res.json())
            .then((data: Drive[]) => {
                const dataCopy: Drive[] = data
                dataCopy.forEach(((drive) => {
                    fixCircularRef(drive)
                    // setDownloaders(drive)
                }
                ))
                console.log(dataCopy)


                setDrives(dataCopy)
                setSelectedDrive(dataCopy[0])
                changeCurrentDir(dataCopy[0])
            })
    }

    useEffect(() => {
        getFileData()
    }, [])
    const changeSelectedDrive = (index: number) => {
        setSelectedDrive(drives[index])
        changeCurrentDir(drives[index])
    }
    return (
        <>

            <div className='filesCont'>
                <FileToolBar></FileToolBar>
                <div className='fileInnerCont'>

                    <SideBar drives={drives} changeDrive={changeSelectedDrive} selectedDrive={selecteddrive}></SideBar>
                    <FileExplorer drive={selecteddrive} setCurrentDir={changeCurrentDir} currentDir={currentDir}></FileExplorer>
                </div>

            </div>
        </>
    )
}

export default Files


function fixCircularRef(parent: Drive | Directory) {
    parent.children.forEach((child) => {
        child.parent = parent
        if ('children' in child) {
            fixCircularRef(child)
        }
    })
}