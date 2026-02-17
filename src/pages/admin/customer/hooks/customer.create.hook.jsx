import { useState } from "react"
import { useLoaderData } from "react-router"

export default function useCustomerCreate() {
    const { Customer } = useLoaderData();
    console.log(Customer);
    const [some, setSome] = useState(null)
    let event = {}
    let state = { some, setSome }
    return {
        Customer,
        event,
        state
    }
};
