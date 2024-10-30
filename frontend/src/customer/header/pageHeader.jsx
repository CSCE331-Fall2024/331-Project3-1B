import "./pageHeader.css";

export default function PageHeader() {
    return (
        <>
            <div id="header-container">
                <h1 id="header-title">Panda Express</h1>
                <button id="header-button">
                    <h1 className="header-button-title">My Bag</h1>
                </button>
            </div>
        </>
    );
}

