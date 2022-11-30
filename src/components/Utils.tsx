const url = "http://192.168.4.1/api"

export function send(key, value) {
    fetch(url, {
        method: "POST",
        body: `${key},${value}`
    })
}

export function get(key) {
    return fetch(url + "/get", {
        method: "POST",
        body: `${key}`
    })
}