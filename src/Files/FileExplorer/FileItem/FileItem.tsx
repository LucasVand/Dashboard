import { Directory, File } from '../../Classes'
import './FileItem.css'
import DocumentIcon from '../assets/DocumentIcon.png'
import FolderIcon from "../assets/FolderIcon.png"

import { useState } from 'react'
import ActionBar from './ActionBar/ActionBar'


function FileItem(props: { child: (Directory | File), changeCurrentDir: Function, selected: boolean, changeSelectedItems: Function }) {
    const [hovered, setHovered] = useState(false)
    const dateFormatter = (str: string) => {
        //splits for the date
        var arr: string[] = str.split("-")
        arr[2] = arr[2].split(" ")[0]

        //finds the rest of the string
        const rest: string = str.substring(str.indexOf(" "))
        //splits the time
        arr = arr.concat(rest.split(":"))
        //seperates the PM from the last index
        arr[5] = arr[5].split(" ")[0]
        arr.push(str.substring(str.length - 3))

        //if PM then adds 12 hours
        if (arr[6] == "PM") {
            arr[3] = String(Number(arr[3]) + 12)
        }
        const date = new Date(Number(arr[0]), Number(arr[1]) - 1, Number(arr[2]), Number(arr[3]), Number(arr[4]), Number(arr[5]))

        return date.toDateString()
    }
    const sizeFormatter = (size: number) => {
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
        var final = size
        var count = 0
        while (final > 1) {
            count++
            final /= 1024
        }
        final *= 1024
        count--
        return final.toPrecision(3) + sizes[count]
    }



    const fileItem = () => {
        if ("children" in props.child) {
            return (
                <div key={props.child.name + props.child.dateCreated} className={`fileItemCont ${props.selected ? 'toggle' : ''} `} onClick={() => { props.changeSelectedItems(props.child) }} onDoubleClick={() => { props.changeCurrentDir(props.child) }} onMouseEnter={() => { setHovered(true) }} onMouseLeave={() => { setHovered(false) }} onContextMenu={(e) => e.preventDefault()} >

                    <img src={FolderIcon} className='fileImg'></img>
                    <div className='fileDropCont'>
                        <div className='fileName'>{props.child.name}</div>

                        <div className='fileInfoCont'>
                            <div className='fileWritten'>{dateFormatter(props.child.lastWritten)}</div>
                            <div className='fileSize'>{sizeFormatter(props.child.size)}</div>
                        </div>
                    </div>
                    <ActionBar selected={hovered} child={props.child}></ActionBar>
                </div >
            )
        } else {
            return (
                <div onClick={() => { props.changeSelectedItems(props.child) }} key={props.child.name + props.child.dateCreated} className={`fileItemCont ${props.selected ? 'toggle' : ''} `} onMouseEnter={() => { setHovered(true) }} onMouseLeave={() => { setHovered(false) }} onContextMenu={(e) => e.preventDefault()}>


                    <img src={DocumentIcon} className='fileImg'></img>
                    <div className='fileDropCont'>
                        <div className='fileName'>{props.child.name}</div>

                        <div className='fileInfoCont'>
                            <div className='fileWritten'>{dateFormatter(props.child.lastWrite)}</div>
                            <div className='fileSize'>{sizeFormatter(props.child.size)}</div>
                        </div>
                    </div>

                    <ActionBar selected={hovered} child={props.child}></ActionBar>
                </div >
            )
        }
    }


    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: 'center', flexDirection: "column" }}>
                {fileItem()}
                <div className='fileDivider'></div>
            </div>
        </>
    )
}





export default FileItem