import { Directory, Drive } from '../../Classes'
import './TopPathNav.css'
import ArrowIcon from './right-arrow.png'
interface TopPathNavProps {
    path: string
    changePath: Function
    currentDir: Directory | Drive
}


function TopPathNav(props: TopPathNavProps) {
    const allDirs = (): (Drive | Directory)[] => {
        var current = props.currentDir
        const returnArr: (Drive | Directory)[] = []
        returnArr.push(current)
        while ("parent" in current) {
            returnArr.push(current.parent)
            current = current.parent
        }

        return returnArr.reverse()
    }
    const name = (item: Directory | Drive) => {
        if ("root" in item) {

            if (item.name.length != 0) {
                return item.name
            } else {
                return item.label
            }
        } else {
            return item.name
        }
    }

    const paths = allDirs().map((item: Directory | Drive, index: number) => {
        return (
            <div
                className={`topPathNavItem ${index == allDirs().length - 1 ? 'toggle' : ''}`}
                key={item.name + "topnavpath" + index}
                onClick={() => {
                    props.changePath(item)
                }}
            >
                {name(item)}
                <span style={{ width: '0.4em' }}></span>
                <img className='topPathNavImg' src={ArrowIcon}></img>
            </div>
        )
    })

    return (
        <>
            <div className='topPathNavCont'>
                {paths}
            </div>
        </>
    )
}
export default TopPathNav