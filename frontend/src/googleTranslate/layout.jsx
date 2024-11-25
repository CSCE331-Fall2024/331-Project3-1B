import React from "react";
import GoogleTranslate from "./googleTranslate.jsx";

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

