import "./pageHeader.css";
import { useState } from "react";
import MyBag from "../myBag/myBag.jsx";

export default function PageHeader() {
    const [showMyBag, setShowMyBag] = useState(false);

    const goToMyBag = () => {
        setShowMyBag(!showMyBag);
    }  

    return (
        <>
            <div id="header-container">
                <h1 id="header-title">Panda Express</h1>
                <button onClick={goToMyBag} id="header-button">
                    <h1 className="header-button-title">My Bag</h1>
                </button>
            </div>
            {
                showMyBag && <MyBag />
            }
        </>
    );
}

