import './Double.css'
import '../../Dashboard.css'

import { CategoryScale, Chart, TooltipItem, TooltipModel } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { useState } from 'react'
import Dropdown from '../Dropdown/Dropdown'
import Hover from '../../../components/Hover/Hover'
import InfoIcon from './InfoIcon.png'

interface DoubleProps {
    title: string
    values: number[][]
    times: number[][]
    max: number
    unit: string
    decimals: number
    timeToLoad: string
}

Chart.register(CategoryScale);

function Double(props: DoubleProps) {

    const changeTimeFrame = (index: number) => {
        setSelectedTimeFrameIndex(index)
    }
    const dropdownItems = ["1 min", '5 Min', '30 Min', '1 Hour', '6 Hours', '12 Hours', '1 Day', '1 Week']

    const [selectedTimeFrameIndex, setSelectedTimeFrameIndex] = useState(0)
    const average = () => {
        var total = 0
        props.values[selectedTimeFrameIndex].forEach((value: number) => {
            total += value
        })
        var count = props.values[selectedTimeFrameIndex].length != 0 ? props.values[selectedTimeFrameIndex].length : 1

        return total / count
    }

    const max = () => {
        var biggest = 0

        props.values[selectedTimeFrameIndex].forEach((value) => {
            if (value > biggest) {
                biggest = value
            }
        })
        return biggest
    }
    const hoverItems: string[] = ["Data Points: " + props.values[selectedTimeFrameIndex].length, "Time To Load: " + props.timeToLoad]
    return (
        <>
            <div className='dashboardBG doubleHeight doubleWidth' style={{ flexDirection: "column" }}>
                <div className='doubleTitle'>{props.title}</div>

                <Hover items={hoverItems} img={InfoIcon}></Hover>
                <Dropdown mainText={dropdownItems[selectedTimeFrameIndex]} items={dropdownItems} onClick={changeTimeFrame}></Dropdown>

                <LineGraph max={props.max} values={props.values[selectedTimeFrameIndex]} time={props.times[selectedTimeFrameIndex]} title={props.title} unit={props.unit}></LineGraph>
                <div className='timeFrameTitle'>{"Over " + dropdownItems[selectedTimeFrameIndex]} </div>

                <div style={{ display: 'flex', justifyContent: "space-evenly", width: '100%', paddingBottom: '0.5em' }}>
                    <div>
                        <div className='doubleSubTitle'>Average</div>
                        <div className='doubleSubText'>{average().toFixed(props.decimals) + props.unit}</div>
                    </div>

                    <div>
                        <div className='doubleSubTitle'>Highest</div>
                        <div className='doubleSubText'>{max().toFixed(props.decimals) + props.unit}</div>
                    </div>
                </div>
            </div >
        </>
    )
}
interface LineGraphProps {
    values: number[]
    time: number[]
    max: number
    title: string
    unit: string
}

function LineGraph(props: LineGraphProps) {

    const data = {
        labels: props.time,
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {

                label: props.title,
                data: props.values,
                // you can set indiviual colors for each bar
                backgroundColor: 'rgb(107, 100, 223)',
                borderColor: 'rgb(157, 150, 273)',
                borderWidth: 1,
                fill: true,
                tension: 0.3,
                pointRadius: 1,
                spanGaps: false
            }
        ]
    }
    return (
        <>
            <div className='graphCont'>
                <Line

                    data={data}
                    options={{

                        responsive: true,
                        resizeDelay: 200,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    title: function (this: TooltipModel<"line">, tooltipItems: TooltipItem<"line">[]) {
                                        const labelStr = tooltipItems[0].label
                                        var filtered = ''
                                        for (let i = 0; i < labelStr.length; i++) {
                                            if (labelStr[i] != ',') {
                                                filtered += labelStr[i]
                                            }
                                        }

                                        const timeNum = Number(filtered)
                                        const date = new Date(timeNum)
                                        return date.toLocaleString()
                                    },

                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                type: 'linear',
                                max: props.max,
                                ticks: {
                                    callback: function (dataLabel) {
                                        // Apply logic to remove name of the month
                                        var gb = Number(dataLabel).toFixed(0)
                                        return gb + props.unit
                                    }

                                }

                            },
                            x: {
                                display: false,
                                type: 'linear',
                                min: props.time[0],
                                max: props.time[props.time.length - 1]

                            }
                        },

                    }}
                />
            </div>
        </>
    )
}


export default Double