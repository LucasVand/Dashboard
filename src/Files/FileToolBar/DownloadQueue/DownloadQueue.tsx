
import TapToShow from '../../../components/TapToShow/TapToShow'
import './DownloadQueue.css'
import DownloadIcon from './DownloadsIcon.png'
import { useDownloadContext } from '../../../DownloadContext'

function DownloadQueue() {
    const downloadContext = useDownloadContext()

    const items = downloadContext.downloads
    const noDownloads = () => {
        if (downloadContext.downloads.length == 0) {
            return (
                <>
                    <div className='noDownloads'>Your Downloads Will Show Up Here...</div>
                </>
            )
        }
    }
    return (
        <>

            <TapToShow img={DownloadIcon} size='1.5em'>
                <div className='downloadQueueCont'>
                    <div className='downloadQueueTitle'>Downloads</div>
                    <div className='downloadDivider'></div>
                    {items}
                    {noDownloads()}
                </div>
            </TapToShow>

        </>
    )
}

export default DownloadQueue