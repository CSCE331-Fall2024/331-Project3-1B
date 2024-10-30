import "./itemPage.css";
import ItemPageCard from "./itemPageCard.jsx";
import {CashierPageHeader, TotalContainer} from "../cashier.jsx";
import BackToMenu from "../backToMenuButton/backToMenu.jsx";

export default function CashierItemPage() {

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
            <CashierPageHeader />
            <div className="main-content">
                <div className="total-container2">
                    <TotalContainer />
                </div>
                <div>
                    <h1 className="cashier-item-page-title extra-space">Sides</h1>
                    <div className="cashier-item-page-type-container">
                        {sides.map((side, index) => {

                            return <ItemPageCard type={side} key={index} />})}
                    </div>
                    <h1 className="cashier-item-page-title">Entrees</h1>
                    <div className="cashier-item-page-type-container">
                        {entrees.map((entree, index) => {
                            return <ItemPageCard type={entree} key={index} />;
                        })}
                    </div>
                </div>
            </div>
            <BackToMenu/>
            
        </>
    );
}
