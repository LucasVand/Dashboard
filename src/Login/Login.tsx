import './Login.css'

function Login() {
    return (
        <>
            <div className='loginCont'>
                <div className='loginBG'>
                    <div className='inputCont'>
                        <div className='userLabel'>Username</div>
                        <input></input>
                    </div>
                    <div className='inputCont'>
                        <div className='passwordLabel'>Password</div>
                        <input></input>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login