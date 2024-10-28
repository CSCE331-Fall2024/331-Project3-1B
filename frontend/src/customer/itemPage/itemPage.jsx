import "./itemPage.css";
import ItemPageCard from "./itemPageCard.jsx";
import Nav from "../header/pageHeader.jsx";
import BackToMenu from "../backToMenuButton/backToMenu.jsx";

export default function ItemPage() {

    const sides = ["White Rice", "Fried Rice", "Chow Mein", "Super Greens"];
    const entrees = [
        "Orange Chicken",
        "Beijing Beef",
        "Teriyaki Chicken",
        "Broccoli Beef",
        "Kung Pao Chicken",
        "Honey Sesame Chicken Breast",
        "Beijing Beef",
        "Black Pepper Chicken",
        "String Bean Chicken Breast",
        "Mushroom Chicken",
        "Honey Walnut Shrimp",
        "Black Pepper Sirloin Steak",
    ];

    

    return (
        <>
            <Nav />
            <div>
                <h1 className="item-page-title extra-space">Sides</h1>
                <div className="item-page-type-container">
                    {sides.map((side, index) => {

                        return <ItemPageCard type={side} key={index} />})}
                </div>
                <h1 className="item-page-title">Entrees</h1>
                <div className="item-page-type-container">
                    {entrees.map((entree, index) => {
                        return <ItemPageCard type={entree} key={index} />;
                    })}
                </div>
            </div>
            <BackToMenu/>
            
        </>
    );
}
