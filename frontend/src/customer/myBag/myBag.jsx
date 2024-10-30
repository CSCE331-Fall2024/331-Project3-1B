import { useCart } from "./CartContext.jsx";

// This component will display the items in the cart, functionality not complete yet. 
export default function () {
    const { cart } = useCart();

    return (
        <>
        {/* will map all of the items => to be displayed */}
            {cart.map((item, index) => (
                <li key={index}>
                    {item}
                </li>
            ))}
        </>
    );
}
