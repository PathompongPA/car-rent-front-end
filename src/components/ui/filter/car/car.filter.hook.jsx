import { useState } from "react"

export default function useCarFilter() {
    const [isOpen, setIsOpen] = useState(false)
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)

    return {
        isOpen,
        state: {
            start: start && start?.format("DD / MM / YYYY"),
            end
        },
        on: {
            click: {
                btn: {
                    pickup: {
                        start: () => { setIsOpen(!isOpen) }
                    }
                }
            },
            toggle: {
                calendar: {
                    pickup: (date) => { setIsOpen(!isOpen); setStart(date) }
                }
            },
            close: {
                calendar: () => { setIsOpen(!isOpen) }
            }


        },
    }
};
