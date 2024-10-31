
import TapToShow from '../../../components/TapToShow/TapToShow'
import './DownloadQueue.css'
import DownloadIcon from './DownloadsIcon.png'
import { useDownloadContext } from '../../../HelperFunctions/DownloadContext'
import DownloadElement from './DownloadElement/DownloadElement'

function DownloadQueue() {
    const downloadContext = useDownloadContext()

    const items = downloadContext.child.map((_, index) => {
        return (
            <DownloadElement index={index} key={"DownloadElement" + index}></DownloadElement>
        )
    })
    const noDownloads = () => {

        if (downloadContext.downloading.length == 0) {
            return (
                <>
                    <div className='noDownloads'>Your Downloads Will Show Up Here...</div>
                </>
            )
        }
    }
    return (
        <>

            <TapToShow img={DownloadIcon} size='1.5em' right='-13em'>
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