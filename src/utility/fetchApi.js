export default async function fetchApi(method, path, body, headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', }) {
    let opotion = { method: method, headers: headers, body: body, credentials: "include" }
    let host = location.hostname === "pathompongpa.github.io" ? "carrent88.com" : location.hostname
    let url = `${location.protocol}//${host}${path}`
    return await fetch(url, opotion).then(res => res.json())
};
