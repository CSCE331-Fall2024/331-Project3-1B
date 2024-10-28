import "./itemCardPage.css";

export default function itemPageCard({ type }) {
    const handleClick = (type) => {
        return () => {
            console.log(type);
        };
    };
    return (
        <>
            <button onClick={handleClick(type)} className="item-page-container">
                    <img
                        className="item-page-card-image"
                        src={`images/${type}.jpg`}
                        alt="image could not be found"
                    />
                <h2 className="item-page-card-title">{type}</h2>
            </button>
        </>
    );
}
