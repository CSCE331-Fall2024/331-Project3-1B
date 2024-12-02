import "./m_int.css"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
/** 
 * this function creates the login page component
 * @returns {HTML} login page
 */
function ManagerIntermediate(){

    const navigate = useNavigate();

    function onSuccess (response) {
        const decoded = jwtDecode(response.credential);
        const {name, email} = decoded;
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        navigate("/manager");
    }

    function back () {
        navigate("/");
    }

    return (
        <div className="signInButton">
            <h1>Manager Login:</h1>
            <GoogleOAuthProvider clientId="951146386191-ahvp9rj7ivufakq78iiiaphs9ndj1au8.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess= {onSuccess}
                    onError={() => {
                        alert('Login Failed: Login in with approved employee email...');
                    }}
                />
            </GoogleOAuthProvider>
            <button onClick={back}>Back</button>
        </div>
    );
}

export default ManagerIntermediate;