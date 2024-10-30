import './FileToolBar.css'
import '../Files.css'
import DownloadQueue from './DownloadQueue/DownloadQueue'

function FileToolBar() {

    return (
        <>
            <div className='fileToolBarCont fileBG'>
                <DownloadQueue></DownloadQueue>
            </div>

        </>
    )
}
export default FileToolBar