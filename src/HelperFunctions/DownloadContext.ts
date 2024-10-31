

import { createContext, useContext } from "react"
import { Directory, File } from "../Files/Classes"



export type DownloadContent = {
    progress: number[]
    child: (File | Directory)[]
    downloading: boolean[]
    newDownload: (child: File | Directory) => void
    startTime: number[]
}
export const DownloadContext = createContext<DownloadContent>({
    progress: [],
    child: [],
    downloading: [],
    newDownload: () => { },
    startTime: []
})
export const useDownloadContext = () => useContext(DownloadContext)



