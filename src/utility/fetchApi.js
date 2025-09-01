export default async function fetchApi(method, path, body, headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', }) {
    return (
        await fetch(
            `${location.protocol}//${location.hostname}${path}`,
            {
                method: method,
                headers: headers,
                body: body,
                credentials: "include"
            }
        )
            .then((res) => res.json())
    )

};
