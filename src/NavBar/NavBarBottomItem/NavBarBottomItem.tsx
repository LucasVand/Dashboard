
import './NavBarBottomItem.css'
import ArrowIcon from './chevron.png'

interface NavBarBottomProps {
    index: number
    title: string
    src: string

}

function NavBarBottomItem(props: NavBarBottomProps) {
    return (
        <>
            <div className='navBarItem'>
                <img src={props.src} className='navBarItemImg' />
                <div className='navBarItemText'>{props.title}</div>
                <img src={ArrowIcon} className='navBarItemChevron' />
            </div>
        </>
    )
}

export default NavBarBottomItem 