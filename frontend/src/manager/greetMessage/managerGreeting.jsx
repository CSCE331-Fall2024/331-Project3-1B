import "./managerGreeting.css";
import { useEffect, useState } from "react";

// creates a greeting message for the manager
export default function ManagerGreeting() {
    const [name, setName] = useState("Manager");

    useEffect(() => {
        const name = localStorage?.getItem("name");
        if (name) {
            setName(name);
        }
    }, []);

    return (
        <>
            <div id="greeting-container">
                <h1>Hello{' '}{name}!</h1>
            </div>
        </>
    );
}
