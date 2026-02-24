import { useLoaderData } from "react-router";

export default function useBtnLine() {
    const loader = useLoaderData();
    return {
        state: {
            line: loader.contents?.contact["th"].card.filter(item => item.title === "line")[0]?.list[0]
        }
    }

};
