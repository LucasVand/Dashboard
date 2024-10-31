
import { useState } from 'react'
import './App.css'
import NavBar from './NavBar/Navbar'
import TopBar from './TopBar/TopBar'
import Dashboard from './Dashboard/Dashboard'
import Files from './Files/Files'
import { DownloadContext } from './HelperFunctions/DownloadContext'
import { Directory, File } from './Files/Classes'
import { useWindowSize } from './HelperFunctions/Hooks'

function App() {
  const [navBarOpen, setNavBarOpen] = useState(true)
  const [selected, setSelected] = useState(0)
  const changeNavBarState = (setTo?: boolean) => {
    if (setTo != undefined) {
      setNavBarOpen(setTo)
    } else {
      setNavBarOpen(!navBarOpen)
    }
  }
  const changeSelected = (num: number) => {
    setSelected(num)
  }
  const openWindow = () => {
    if (selected == 0) {
      return <Dashboard></Dashboard>
    } else if (selected == 1) {
      return <Files></Files>
    }
  }
  const windowSize = useWindowSize()

  const marginLeft = () => {
    if (windowSize[0] < 800) {
      if (windowSize[0] > 490) {
        return 3.8
      } else {
        return 0
      }
    }
    if (navBarOpen) {
      return 16.6
    } else {
      return 3.8

    }

  }
  const [downloadProgress, setDownloadProgress] = useState<number[]>([])
  const [downloadChild, setDownloadChild] = useState<(File | Directory)[]>([])
  const [downloading, setDownloading] = useState<boolean[]>([])
  const [downloadStartTime, setDownloadStartTime] = useState<number[]>([])

  const changeDownloading = (newValue: boolean, index: number) => {
    const newArr = [...downloading]
    newArr[index] = newValue
    setDownloading(newArr)
  }
  const changeProgress = (newValue: number, index: number) => {
    const newArr = [...downloadProgress]
    newArr[index] = newValue
    setDownloadProgress(newArr)
  }

  const newDownload = (child: Directory | File) => {
    const index = downloadProgress.length
    setDownloadProgress([...downloadProgress, 0])
    setDownloading([...downloading, true])
    setDownloadChild([...downloadChild, child])
    setDownloadStartTime([...downloadStartTime, Date.now()])



    const folder = 'children' in child ? true : false

    const url: string = child.path + '/' + child.name
    changeDownloading(true, index)
    fetch(`http://129.100.199.139:7000/Download?path=${url}&folder=${folder}`)
      .then((res) => {
        var contentLengthStr = res.headers.get("content-length");
        const contentLength = contentLengthStr == null ? 1 : Number(contentLengthStr)
        let loaded = 0;
        changeProgress(0, index)
        return new Response(
          new ReadableStream({
            start(controller) {
              if (res.body != null) {
                const reader = res.body.getReader();
                read()
                function read() {
                  reader.read()
                    .then((progressEvent) => {
                      if (progressEvent.done === true) {
                        controller.close();
                        return;
                      }
                      loaded += progressEvent.value.byteLength;
                      let downloadedPercent = Math.round((loaded / contentLength) * 100);

                      changeProgress(downloadedPercent, index)
                      // console.log(downloadedPercent)

                      controller.enqueue(progressEvent.value);
                      read();
                    })
                }
              }
            }
          })
        )
      })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;

        var zip = ''
        if (folder) {
          zip = '.zip'
        }
        link.setAttribute('download', `${child.name + zip}`);

        document.body.appendChild(link);

        link.click();

        if (link.parentNode != null) {
          link.parentNode.removeChild(link);
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <DownloadContext.Provider value={{ downloading: downloading, progress: downloadProgress, child: downloadChild, newDownload, startTime: downloadStartTime }}>
        <div style={{ height: '100vh', width: '100vw' }}>

          <TopBar onClickOfIcon={changeNavBarState} navBarOpen={navBarOpen}></TopBar>
          <NavBar open={navBarOpen} changeOpen={changeNavBarState} changeSelected={changeSelected}></NavBar>
          <div style={{ width: '100%', height: '3.0em' }}></div>
          <div className='content' style={{ marginLeft: `${marginLeft()}em` }}>
            {openWindow()}
          </div>
          <div style={{ position: 'absolute', top: '5%', fontSize: '2em', zIndex: '1000' }}>{"downloads: " + downloading.length}</div>


        </div >
      </DownloadContext.Provider>

    </>
  )
}

export default App


