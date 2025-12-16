export default async function fetchApi(method, path, body, headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', }) {
    let opotion = { method: method, headers: headers, body: body, credentials: "include" }
    let url = `${location.protocol}//${location.hostname}${path}`
    try {
        let res = await fetch(url, opotion)
        if (!res.ok) throw new Error(`${res.status} ${res.statusText} ${url}`)
        return res.json()
    } catch (error) {
        return error
    }
};
