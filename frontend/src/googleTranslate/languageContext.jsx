import React, { createContext, useState } from "react";

// Create the context
export const languageContext = createContext();

// Create the provider component
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // Initialize language from local storage or default to English
        return localStorage.getItem("selectedLanguage") || "en";
    });

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem("selectedLanguage", newLanguage); // Persist language to local storage
    };

    return (
        <languageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </languageContext.Provider>
    );
};
