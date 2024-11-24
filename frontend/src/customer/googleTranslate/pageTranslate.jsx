import React, { useEffect } from 'react';

export default function pageTranslate() {
    useEffect(() => {
        // Load the Google Translate script
        const addGoogleTranslateScript = () => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
        };

        // Initialize the Google Translate widget
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en', // Default language of the page
                    includedLanguages: 'en,es,fr,de,zh-CN,hi,ar,ru,ja,bn', // Add more languages as needed
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                },
                'google_translate_element'
            );
        };

        addGoogleTranslateScript();
    }, []); // Run once when the component mounts

    return (
        <div id="google_translate_element" style={{ marginTop: '10px' }}></div>
    );
};


