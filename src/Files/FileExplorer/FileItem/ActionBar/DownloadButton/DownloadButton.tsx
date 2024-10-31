import './DownloadButton.css'
import DownloadIcon from './DownloadIcon.png'
import { Directory, File } from '../../../../Classes'

import { useDownloadContext } from '../../../../../HelperFunctions/DownloadContext'

function DownloadButton(props: { child: File | Directory }) {
    const downloadContext = useDownloadContext()

    const downloadFile = () => {
        downloadContext.newDownload(props.child)
    }
    return (
        <>
            <img className='fileActionItem' src={DownloadIcon} onClick={() => { downloadFile() }}></img>
        </>
    )
}

export default DownloadButton