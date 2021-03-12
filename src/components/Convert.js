import React, { useState, useEffect } from "react"
import axios from "axios"

// de-structure language and text props
const Convert = ({ language, text }) => {
    const [results, setResults] = useState("")

    useEffect(() => {
        const translate = async () => {
            const translation = await axios.post(
                "https://translation.googleapis.com/language/translate/v2",
                {},
                {
                    params: {
                        q: text,
                        target: language.value,
                        key: "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM",
                    },
                }
            )

            setResults(translation.data.data.translations[0].translatedText)
        }
        // run search immediately if this is initial page load
        if (text && !results.length) {
            translate()
            // else throttle search requests with timer
        } else {
            // wait 500ms before executing search
            let timeoutID = setTimeout(() => {
                // do not search if input is empty
                if (text) {
                    translate()
                }
            }, 500)

            // CLEANUP: clear current timer
            return () => {
                clearTimeout(timeoutID)
            }
        }
        
    }, [language, text])

    return (
        <div>
            <p>{results}</p>
        </div>
    )
}

export default Convert