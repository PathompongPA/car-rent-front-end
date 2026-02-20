import { useLoaderData } from "react-router";

export default function useBtnLine() {
    const loader = useLoaderData();
    return {
        state: {
            line: loader.Content?.contact?.card?.filter(item => item.title === "line")[0]?.list[0]
        }
    }

};
