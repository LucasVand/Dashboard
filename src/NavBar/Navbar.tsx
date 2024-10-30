import './NavBar.css'
import NavBarItem from './NavbarItem/NavBarItem'
import NavBarTop from './NavBarTop/NavBarTop'



import HomeIcon from './assets/HomeIcon.png'
import FolderIcon from './assets/FolderIcon.png'
import { useLayoutEffect, useState } from 'react'

interface NavBarProps {
    open: boolean
    changeOpen: Function
    changeSelected: Function
}

function NavBar(props: NavBarProps) {
    const [selected, setSelected] = useState(0)
    const [closeNavBarFlag, setCloseNavBarFlag] = useState(false)
    const onClick = (index: number) => {
        console.log("clicked")
        setSelected(index)
        props.changeSelected(index)
    }
    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
                if (window.innerWidth < 800 && !closeNavBarFlag) {
                    setCloseNavBarFlag(true)
                    props.changeOpen(false)
                } else if (window.innerWidth > 800) {
                    setCloseNavBarFlag(false)
                    props.changeOpen(true)
                }
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }

    const windowSize = useWindowSize()


    const width = () => {
        if (props.open) {
            return 17
        } else {
            if (windowSize[0] > 490) {
                return 4
            } else {
                return 0
            }
        }
    }


    return (
        <>
            <div className='navBarCont' style={{ width: `${width()}em` }}>
                <div style={{ height: '4em' }}></div>
                <NavBarTop open={props.open}></NavBarTop>
                <div className='divider'></div>

                <NavBarItem title='Dashboard' src={HomeIcon} selected={selected} index={0} onClick={onClick} open={props.open}></NavBarItem>
                <NavBarItem title='Files' src={FolderIcon} selected={selected} index={1} onClick={onClick} open={props.open}></NavBarItem>
                {/* <NavBarItem title='AI' src={HomeIcon} selected={selected} index={2} onClick={onClick} open={props.open}></NavBarItem>
                <NavBarItem title='Ports' src={HomeIcon} selected={selected} index={3} onClick={onClick} open={props.open}></NavBarItem>
                <NavBarItem title='Webservers' src={HomeIcon} selected={selected} index={4} onClick={onClick} open={props.open}></NavBarItem>
                <NavBarItem title='Backends' src={HomeIcon} selected={selected} index={5} onClick={onClick} open={props.open}></NavBarItem> */}

                <div>{windowSize[0]}</div>
                <div className='divider'></div>


            </div>
        </>
    )
}
export default NavBar

