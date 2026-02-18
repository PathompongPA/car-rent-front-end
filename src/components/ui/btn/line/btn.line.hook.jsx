import { useLoaderData } from "react-router";

export default function useBtnLine() {
    const loader = useLoaderData();
    console.log(loader);
    return {
        state: {
            line: loader.Content?.contact?.card?.filter(item => item.title === "line")[0]?.list[0]
        }
    }

};
