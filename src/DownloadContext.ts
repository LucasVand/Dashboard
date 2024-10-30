

import { createContext, useContext } from "react"



export type DownloadContent = {
    downloads: JSX.Element[]
    setDownloads: (download: JSX.Element[]) => void
}
export const DownloadContext = createContext<DownloadContent>({
    downloads: [],
    setDownloads: () => { }
})
export const useDownloadContext = () => useContext(DownloadContext)

