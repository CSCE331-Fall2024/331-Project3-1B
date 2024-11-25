import React from "react";
import GoogleTranslate from "./googleTranslate.jsx";

/**
 * generates the layout for the translate component
 * @return {HTML} Layout
 */
export default function Layout ({ children }) {
    return (
        <div>
            {/* Google Translate widget */}
            <GoogleTranslate />
            
            {/* Main content */}
            <main>{children}</main>
        </div>
    );
};

