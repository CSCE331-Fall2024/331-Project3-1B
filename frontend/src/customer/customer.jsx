import PageHeader from "./header/pageHeader.jsx";
import MenuItemTypes from "./menuItemTypes/menuItemTypes.jsx";
import { CartProvider } from "./myBag/CartContext.jsx";

export default function customer() {
    return (
        <CartProvider>
            <PageHeader />
            <MenuItemTypes />
        </CartProvider>
    )
}   


