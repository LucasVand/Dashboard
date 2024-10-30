import './FileColumns.css'

function FileColumns() {
    return (
        <>
            <div className='fileColumnsCont'>
                <div className='fileColumn name'>Name</div>
                <div className='fileColumn written'>Last Written</div>
                <div className='fileColumn size'>Size</div>
            </div>
            <div className='fileDivider' style={{ marginTop: '0.3em' }}></div>
        </>
    )
}

export default FileColumns