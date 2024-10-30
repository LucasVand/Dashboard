import { useEffect, useState } from "react";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import { Directory, File } from "../../../Classes";
import './DownloadElement.css'
import '../DownloadQueue.css'

function DownloadElement(props: { child: Directory | File }) {
    const [downloading, setDownloading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [startTime, _] = useState(Date.now())
    const [time, setTime] = useState(Date.now())
    //this is need bc for dev we are in strictmode where useeffect runs twice
    //without changing the states
    var downloadingStrict = false
    useEffect(() => {
        if (!downloading && !downloadingStrict) {
            downloadingStrict = true
            setDownloading(true)
            downloadFile()
        }
        const interval = setInterval(() => {
            setTime(Date.now())
            return clearInterval(interval)
        }, 500)
    }, [])


    const downloadFile = () => {
        const folder = 'children' in props.child ? true : false

        const url: string = props.child.path + '/' + props.child.name
        setDownloading(true)
        fetch(`http://129.100.199.139:7000/Download?path=${url}&folder=${folder}`)
            .then((res) => {
                var contentLengthStr = res.headers.get("content-length");
                const contentLength = contentLengthStr == null ? 1 : Number(contentLengthStr)
                let loaded = 0;
                setProgress(0)
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

                                            setProgress(downloadedPercent)
                                            console.log(downloadedPercent)

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
                link.setAttribute('download', `${props.child.name + zip}`);

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
        var timeDiff = now - startTime
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
        if (progress < 99) {
            return sizeFormatter(Math.round(props.child.size * (progress / 100))) + " / " + sizeFormatter(props.child.size)
        } else {
            return sizeFormatter(props.child.size) + " · " + timeFormatter(time)
        }
    }

    return (
        <>
            <div className="downloadCont">
                <div className="downloadTitle">{props.child.name}</div>
                <ProgressBar progress={progress / 100}></ProgressBar>
                <div className="downloadUnder">{whatToShowUnder()}</div>
            </div>
            <div className="downloadDivider"></div>
        </>

    )
}
export default DownloadElement