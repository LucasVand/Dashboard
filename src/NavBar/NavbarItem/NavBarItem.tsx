import './NavBarItem.css'

interface NavBarItemProps {
    index: number
    title: string
    src: string
    selected: number
    onClick: Function
    open: boolean
}

function NavBarItem(props: NavBarItemProps) {


    return (
        <>
            <div className={`navBarItem ${props.selected == props.index ? "Toggle" : ''} ${props.open ? "" : 'Closed'}`} onClick={() => { props.onClick(props.index) }}>
                <img src={props.src} className='navBarItemImg'></img>
                <div className='navBarItemText'>{props.open ? props.title : ''}</div>
            </div>
        </>
    )
}

export default NavBarItem