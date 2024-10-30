import "./itemPage.css";
import ItemPageCard from "./itemPageCard.jsx";
import Nav from "../header/pageHeader.jsx";
import BackToMenu from "../backToMenuButton/backToMenu.jsx";

export default function ItemPage() {
    const sides = ["White Steamed Rice", "Fried Rice", "Chow Mein", "Super Greens"];
    const entrees = [
        "Original Orange Chicken",
        "Beijing Beef",
        "Grilled Teriyaki Chicken",
        "Broccoli Beef",
        "Kung Pao Chicken",
        "Honey Sesame Chicken Breast",
        "Beijing Beef",
        "Black Pepper Chicken",
        "String Bean Chicken Breast",
        "Mushroom Beef",
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
                        return (
                            <ItemPageCard
                                type={"Sides"}
                                item={side}
                                key={index}
                            />
                        );
                    })}
                </div>
                <h1 className="item-page-title">Entrees</h1>
                <div className="item-page-type-container">
                    {entrees.map((entree, index) => {
                        return (
                            <ItemPageCard
                                type={"Entrees"}
                                item={entree}
                                key={index}
                            />
                        );
                    })}
                </div>
            </div>
            <BackToMenu />
        </>
    );
}
