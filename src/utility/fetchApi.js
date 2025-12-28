export default async function fetchApi(method, path, body, headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', }) {
    let opotion = { method: method, headers: headers, body: body, credentials: "include" }
    let url = `${location.protocol}//${location.hostname}${path}`
    return await fetch(url, opotion).then(res => res.json())
};
