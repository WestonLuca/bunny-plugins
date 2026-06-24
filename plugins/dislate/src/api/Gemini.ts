const GEMINI_API_KEY = "AQ.Ab8RN6ITpFs6CiKJI6wVyTxP-y_B_PyXbH3QZle9Etf9Ax1MXw"

const translate = async (text: string, source_lang: string = "auto", target_lang: string, original: boolean = false) => {
    try {
        if (original) return { source_lang, text }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Translate this text to Arabic. Return only translation:\n\n${text}`
                        }]
                    }]
                })
            }
        )

        const data = await response.json()

        if (!response.ok) {
            throw Error(JSON.stringify(data))
        }

        const translatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text

        if (!translatedText) throw Error(JSON.stringify(data))

        return { source_lang, text: translatedText.trim() }
    } catch (e) {
        throw Error(`Gemini error: ${e}`)
    }
}

export default { translate }
