import { Directory, File } from '../../../Classes'
import './ActionBar.css'
import DownloadButton from './DownloadButton/DownloadButton'

function ActionBar(props: { selected: boolean, child: File | Directory }) {


    return (
        <>
            <div className={props.selected ? `fileActionsCont` : 'goneFileActions'}>
                <DownloadButton child={props.child}></DownloadButton>
            </div>
        </>
    )
}

export default ActionBar