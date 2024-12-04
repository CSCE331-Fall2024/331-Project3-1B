import "./intermediate.css"
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

    // Play Sound Effect on button click
    function playSound(file) {
        var audio = new Audio(file);
        audio.play();
    }

    return (
        <div className="signInButton">
            <h1 id="label">Manager Login:</h1>
            <GoogleOAuthProvider clientId="951146386191-ahvp9rj7ivufakq78iiiaphs9ndj1au8.apps.googleusercontent.com">
                <div className="oauth-button">
                    <GoogleLogin
                        onSuccess= {onSuccess}
                        onError={() => {
                            alert('Login Failed: Login in with approved employee email...');
                        }}
                    />
                </div>
            </GoogleOAuthProvider>
            <button onClick={() => {back();playSound('/Sounds/ButtonSound.mp3')}} className="back-button">
                <i className="fa-solid fa-chevron-left icons"/>{' '}Back
            </button>
        </div>
    );
}

export default ManagerIntermediate;