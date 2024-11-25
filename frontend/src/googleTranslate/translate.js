export const translateText = async (textArray, targetLanguage) => {
    const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY; // Store in .env for security
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    
    const data = {
        q: textArray, // Array of strings to translate
        target: targetLanguage,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch translation");
        }

        const result = await response.json();
        return result.data.translations.map((translation) => translation.translatedText);
    } catch (error) {
        console.error("Error translating text:", error);
        return [];
    }
};
