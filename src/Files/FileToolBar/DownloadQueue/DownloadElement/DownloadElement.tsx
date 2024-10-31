import { useEffect, useState } from "react";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import './DownloadElement.css'
import '../DownloadQueue.css'
import { useDownloadContext } from "../../../../HelperFunctions/DownloadContext";


function DownloadElement(props: { index: number }) {
    const [time, setTime] = useState(Date.now())
    const downloadContext = useDownloadContext()
    //this is need bc for dev we are in strictmode where useeffect runs twice
    //without changing the states
    // var downloadingStrict = false
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(Date.now())
        }, 500)

        return clearInterval(interval)
    }, [])


    const sizeFormatter = (size: number): string => {
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
        var final = size
        if (size == 0) {
            return '0' + sizes[0]
        }
        var count = 0
        while (final > 1) {
            count++
            final /= 1024
        }
        final *= 1024
        count--
        return final.toPrecision(3) + sizes[count]
    }
    const timeFormatter = (now: number) => {
        const times = ['month', 'week', 'day', 'hour', 'min', 'sec']
        const values = [2419200, 604800, 86400, 3600, 60, 1]
        var timeDiff = now - downloadContext.startTime[props.index]
        timeDiff /= 1000
        if (timeDiff < 60) {
            // return 'now' + " Time diff: " + timeDiff
            return 'now'
        }
        var index = 0
        var done = false
        var weight = 0
        values.forEach((value, i) => {
            if (!done) {
                index = i
                weight = Math.floor(timeDiff / value)
                if (weight > 1) {
                    done = true
                }
            }
        })
        return weight + " " + times[index] + " ago"

    }

    const whatToShowUnder = () => {
        if (downloadContext.progress[props.index] < 99) {
            return sizeFormatter(Math.round(downloadContext.child[props.index].size * (downloadContext.progress[props.index] / 100))) + " / " + sizeFormatter(downloadContext.child[props.index].size)
        } else {
            return sizeFormatter(downloadContext.child[props.index].size) + " · " + timeFormatter(time)
        }
    }

    return (
        <>
            <div className="downloadCont">
                <div className="downloadTitle">{downloadContext.child[props.index].name}</div>
                <ProgressBar progress={downloadContext.progress[props.index] / 100}></ProgressBar>
                <div className="downloadUnder">{whatToShowUnder()}</div>
            </div>
            <div className="downloadDivider"></div>
        </>

    )
}
export default DownloadElement