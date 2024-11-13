import "./itemPage.css";
import ItemPageCard from "./itemPageCard.jsx";
import {CashierPageHeader} from "../cashier.jsx";
import BackToMenu from "../backToMenuButton/backToMenu.jsx";


// CashierItemPage is the component that displays the items that the user can select to add to their order
export default function CashierItemPage() {

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
            <CashierPageHeader />
            <div className="cashier-item-page">
                <div>
                <h1 className="cashier-item-page-title extra-space">Sides</h1>

                <div className="cashier-item-page-type-container">
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
                <h1 className="cashier-item-page-title">Entrees</h1>
                <div className="cashier-item-page-type-container extra-space-bottom">
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
            </div>
            <footer className="item-page-footer">
                    <div>
                        {/* <h1 className="footer-type">{currType}</h1>
                        {constEntrees > 0 && constSides > 0 && (
                            <>
                                <h3 className="footer-type-info">
                                    Entrees ({constEntrees}), Sides (
                                    {constSides})
                                </h3>
                            </>
                        )} */}
                    </div>
                    <div>
                        
                        <BackToMenu />
                    </div>
                </footer>
            
        </>
    );
}
