import "./c_int.css"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

/** 
 * this function creates the login page component
 * @returns {HTML} login page
 */
export function CashierIntermediate(){

    const navigate = useNavigate();

    function onSuccess () {
        navigate("/cashier");
    }

    function back () {
        navigate("/");
    }

    return (
        <div className="signInButton">
            <h1>Cashier Login:</h1>
            <GoogleOAuthProvider clientId="951146386191-ahvp9rj7ivufakq78iiiaphs9ndj1au8.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={onSuccess}
                    onError={() => {
                        alert('Login Failed: Login in with approved employee email...');
                    }}
                />
            </GoogleOAuthProvider>
            <button onClick={back}>Back</button>
        </div>
    );
}

export default CashierIntermediate;