import './DownloadButton.css'
import DownloadIcon from './DownloadIcon.png'
import { Directory, File } from '../../../../Classes'

import { useDownloadContext } from '../../../../../DownloadContext'

import DownloadElement from '../../../../FileToolBar/DownloadQueue/DownloadElement/DownloadElement'



function DownloadButton(props: { child: File | Directory }) {
    const downloadContext = useDownloadContext()

    const downloadFile = () => {
        const newDownload = <DownloadElement child={props.child} key={props.child.id}></DownloadElement>

        downloadContext.setDownloads([...downloadContext.downloads, newDownload])
    }
    return (
        <>
            <img className='fileActionItem' src={DownloadIcon} onClick={() => { downloadFile() }}></img>
        </>
    )
}

export default DownloadButton