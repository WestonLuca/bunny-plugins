import { settings } from "AQ.Ab8RN6L1okZAbduIfUUx6uewtfbGOBuah9xI5p_KiOlxptFx9w"

const GEMINI_API_KEY = ""

const translate = async (
    text: string,
    source_lang: string = "auto",
    target_lang: string,
    original: boolean = false
) => {
    try {
        if (original) return { source_lang, text }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Translate the following text to "${target_lang}". Return only the translated text, no explanation:\n\n${text}`
                                }
                            ]
                        }
                    ]
                })
            }
        )

        const data = await response.json()
        const translatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text

        if (!translatedText) {
            throw Error("No translation returned from Gemini")
        }

        return {
            source_lang,
            text: translatedText.trim()
        }
    } catch (e) {
        throw Error(`Failed to fetch from Gemini AI: ${e}`)
    }
}

export default { translate }
