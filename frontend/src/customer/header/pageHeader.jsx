import "./pageHeader.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// PageHeader component, includes myBag component => allows user to view what is in their bag.
export default function PageHeader() {
    let currURL = window.location.href;

    const navigate = useNavigate();

    // State to show or hide the MyBag component
    const [showMyBag, setShowMyBag] = useState(false);

    // Function to toggle the myBag component be displayed or not
    const goToMyBag = () => {
        navigate("/myBag");
    };

    return (
        <>
            <div id="header-container">
                <h1 id="header-title">Panda Express</h1>
                {currURL.includes("cashier") ? (
                    <></>
                ) : (
                    <button onClick={goToMyBag} id="header-button">
                        <h1 className="header-button-title">My Bag</h1>
                    </button>
                )}
            </div>
        </>
    );
}
