const GEMINI_API_KEY = "AQ.Ab8RN6Kv5-M0fHZSsBttRKwFNR9WQJuhuzoknAJggG3taOiCTA"

const translate = async (text: string, source_lang = "auto", target_lang: string, original = false) => {
    if (original) return { source_lang, text }

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": GEMINI_API_KEY
        },
        body: JSON.stringify({
            model: "gemini-3.5-flash",
            input: `Translate this text to ${target_lang}. Return only the translation:\n\n${text}`
        })
    })

    const data = await response.json()

    if (!response.ok) throw Error(JSON.stringify(data))

    const translatedText = data?.output_text

    if (!translatedText) throw Error(JSON.stringify(data))

    return { source_lang, text: translatedText.trim() }
}

export default { translate }
