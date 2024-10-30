

import './ProgressBar.css'

interface props {

    progress: number,

}

function ProgressBar({ progress }: props) {

    const percent = () => {
        if (progress > 1) {
            return 100
        }
        else if (progress <= 0) {
            return 2
        }
        return progress * 100
    }
    return (
        <>
            <div className='progressCont'>
                <div className='sliderBG'>
                    <div className='slider' style={{ left: `${100 - percent()}%`, width: `${percent()}%` }}></div>
                </div>
            </div>
        </>
    )
}

export default ProgressBar