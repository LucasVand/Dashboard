import './FileExplorer.css'
import '../Files.css'
import TopPathNav from './TopPathNav/TopPathNav'
import FileColumns from './FileColumns/FileColumns'
import { useEffect, useState } from 'react'
import { Directory, Drive, File } from '../Classes'
import FileItem from './FileItem/FileItem'


function FileExplorer(props: { drive: Drive, setCurrentDir: Function, currentDir: Directory | Drive }) {
    const [selectedItems, setSelectedItems] = useState<(Directory | File)[]>([])
    const [lastItemSelectedIndex, setLastItemSelectedIndex] = useState<number>(0)
    const [shiftStartIndex, setShiftStartIndex] = useState(-1)
    const [isShift, setIsShift] = useState(false)
    const [isControl, setIsControl] = useState(false)

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPressDown)

        window.addEventListener("keyup", handleKeyPressUp)

        return () => {
            window.removeEventListener("keydown", handleKeyPressDown)
            window.removeEventListener("keyup", handleKeyPressUp)
        }
    }, [props, selectedItems, lastItemSelectedIndex, isShift])

    const handleKeyPressDown = (event: KeyboardEvent) => {

        if (event.shiftKey) {
            setIsShift(true)
        }
        if (event.ctrlKey || event.key === "Meta") {
            setIsControl(true)
        }

        if (shiftStartIndex == -1) {
            setShiftStartIndex(lastItemSelectedIndex)
        }



        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            const dir = event.key === 'ArrowDown' ? 1 : -1
            if (selectedItems.length == 0) {
                if (props.currentDir.children[0] != undefined) {
                    changeSelectedItems(props.currentDir.children[0], dir)
                }
            } else {
                if (props.currentDir.children[lastItemSelectedIndex + (event.key === 'ArrowDown' ? 1 : -1)] != undefined) {
                    changeSelectedItems(props.currentDir.children[lastItemSelectedIndex + (event.key === 'ArrowDown' ? 1 : -1)], dir)
                    setLastItemSelectedIndex(lastItemSelectedIndex + (event.key === 'ArrowDown' ? 1 : -1))
                }
            }
        }
        if (event.key === 'Enter') {
            if (props.currentDir.children[lastItemSelectedIndex] != undefined && "children" in props.currentDir.children[lastItemSelectedIndex]) {
                props.setCurrentDir(props.currentDir.children[lastItemSelectedIndex])
            }
        }

    }

    const changeSelectedItems = (item: Directory | File, keyDir: number) => {

        if (isShift) {

            var added: (Directory | File)[] = []
            const dir = item.index >= shiftStartIndex ? 1 : -1
            selectedItems.forEach(value => added.push(value))
            if (dir == keyDir) {
                added.push(item)
            }

            added = added.filter((value) => {
                if (dir == -1) {
                    return (value.index <= shiftStartIndex && value.index >= item.index)
                } else if (dir == 1) {
                    return (value.index >= shiftStartIndex && value.index <= item.index)
                }
            })
            if (item.index == shiftStartIndex) {
                added = [item]
            }
            setSelectedItems(added)

        } else if (isControl) {

            const isAlreadyIn = selectedItems.filter(value => value.id != item.id)

            if (isAlreadyIn.length == 0) {
                setSelectedItems([...selectedItems, item])
            }
        } else {

            setSelectedItems([item])
            setShiftStartIndex(-1)
        }

    }


    const files = props.currentDir.children.map((child, index) => {
        return (
            <FileItem

                child={child}
                changeCurrentDir={(value: Directory | Drive) => { props.setCurrentDir(value); setSelectedItems([]) }}
                selected={selectedItems.find(item => item.path + item.name == child.path + child.name) ? true : false}
                changeSelectedItems={(value: Directory | File) => { changeSelectedItems(value, 0); setLastItemSelectedIndex(index) }}
                key={child.dateCreated + child.name + child.size + index}
            >
            </FileItem>
        )
    })

    const getPath = () => {
        if ("path" in props.currentDir) {
            return props.currentDir.path + props.currentDir.name
        } else if ("root" in props.currentDir) {
            return props.currentDir.root
        }
        return ""
    }


    const handleKeyPressUp = (event: KeyboardEvent) => {
        if (!event.shiftKey) {
            setIsShift(false)
        }
        if (!event.ctrlKey || event.key === "Meta") {
            setIsControl(false)
        }
    }

    return (
        <>
            <div className='fileExplorerCont fileBG'>
                {/* <div>{"selected Count: " + selectedItems.length}</div>
                <div>{"Is control: " + isControl}</div>
                <div>{"Is shift: " + isShift}</div> */}
                <TopPathNav path={getPath()} changePath={props.setCurrentDir} currentDir={props.currentDir} ></TopPathNav>
                <FileColumns></FileColumns>
                <div className='filesContFileExplorer'>
                    {files}
                    <div style={{ height: '3em' }}></div>
                </div>

            </div>
        </>
    )
}
export default FileExplorer


