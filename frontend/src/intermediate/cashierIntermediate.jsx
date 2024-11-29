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

    return (
        <div className="signInButton">
            <GoogleOAuthProvider clientId="951146386191-ahvp9rj7ivufakq78iiiaphs9ndj1au8.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={onSuccess}
                    onError={() => {
                        alert('Login Failed: Login in with approved employee email...');
                    }}
                />
            </GoogleOAuthProvider>
        </div>
    );
}

export default CashierIntermediate;