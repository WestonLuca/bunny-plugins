import { getAssetIDByName } from "@vendetta/ui/assets"
import { ReactNative } from "@vendetta/metro/common"
import { Forms } from "@vendetta/ui/components"
import { showToast } from "@vendetta/ui/toasts"
import { useProxy } from "@vendetta/storage"
import { settings } from ".."

const { FormRow } = Forms
const { ScrollView } = ReactNative

export default () => {
    useProxy(settings)

    return (
        <ScrollView style={{ flex: 1 }}>
            <FormRow
                label="DeepL"
                onPress={() => {
                    settings.translator = 0
                    showToast("Saved Translator to DeepL", getAssetIDByName("check"))
                }}
            />

            <FormRow
                label="Google Translate"
                onPress={() => {
                    settings.translator = 1
                    showToast("Saved Translator to Google Translate", getAssetIDByName("check"))
                }}
            />

            <FormRow
                label="Gemini AI"
                onPress={() => {
                    settings.translator = 2
                    showToast("Saved Translator to Gemini AI", getAssetIDByName("check"))
                }}
            />
        </ScrollView>
    )
}
