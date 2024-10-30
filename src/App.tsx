
import { useLayoutEffect, useState } from 'react'
import './App.css'
import NavBar from './NavBar/Navbar'
import TopBar from './TopBar/TopBar'
import Dashboard from './Dashboard/Dashboard'
import Files from './Files/Files'
import { DownloadContext } from './DownloadContext'

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
  const [downloads, setDownloads] = useState<JSX.Element[]>([])
  return (
    <>
      <DownloadContext.Provider value={{ downloads: downloads, setDownloads: setDownloads }}>
        <div style={{ height: '100vh', width: '100vw' }}>

          <TopBar onClickOfIcon={changeNavBarState} navBarOpen={navBarOpen}></TopBar>
          <NavBar open={navBarOpen} changeOpen={changeNavBarState} changeSelected={changeSelected}></NavBar>
          <div style={{ width: '100%', height: '3.0em' }}></div>
          <div className='content' style={{ marginLeft: `${marginLeft()}em` }}>
            {openWindow()}
          </div>
          <div style={{ position: 'absolute', top: '5%', fontSize: '2em', zIndex: '1000' }}>{"downloads: " + downloads.length}</div>


        </div >
      </DownloadContext.Provider>
      <div style={{ display: 'inline', opacity: '0.1' }}>{downloads}</div>
    </>
  )
}

export default App


function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);

    }
    window.addEventListener('resize', updateSize);

    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
