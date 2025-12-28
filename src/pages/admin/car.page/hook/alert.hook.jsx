import { useState } from "react"

export default function useAlertMsg() {
    const [msg, setMsg] = useState()
    let event = {
        sendAlert: (msg) => setMsg(msg),
        clear: () => setMsg(null)
    }
    return { state: { msg }, event }
}