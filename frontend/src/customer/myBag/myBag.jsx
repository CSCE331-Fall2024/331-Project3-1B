import { useCart } from "./CartContext.jsx";
export default function () {
    const { cart } = useCart();

    return (
        <>
            {cart.map((item, index) => (
                <li key={index}>
                    {item}
                </li>
            ))}
        </>
    );
}
