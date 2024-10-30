import PageHeader from "./header/pageHeader.jsx";
import MenuItemTypes from "./menuItemTypes/menuItemTypes.jsx";
import { CartProvider } from "./myBag/CartContext.jsx";


// This is the main customer component that will be rendered when the customer visits the website
export default function customer() {
    return (

        // Wraps the components that need access to the cart with the CartProvider
        <CartProvider>
            {/* Renders the PageHeader component */}
            <PageHeader />
            {/* Renders the MenuItemTypes component */}
            <MenuItemTypes />
        </CartProvider>
    )
}   


