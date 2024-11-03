import "./login.css"

export function Login(){
    return (
        <div className="login-page">
            <div className="main-container">
                <div className="login-box">
                    <div className="label">
                        <h1>Login</h1>
                    </div>
                    <div className="password-boxes">
                        <input type="text" id="username-field" name="username-field" minlength="3" maxlength="20" placeholder="Username" required></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;