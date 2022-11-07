export function send(url, key, value) {
    fetch(url, {
        method: 'POST',
        body: `${key},${value}`
    })
}

export function get(url, key) {
    return fetch(url + "/get", {
        method: 'POST',
        body: `${key}`
    })
}