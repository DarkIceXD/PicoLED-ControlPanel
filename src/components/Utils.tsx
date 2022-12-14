const url = "http://192.168.4.1/api"
const delim = ";"

export function send(...keys) {
    return fetch(url, {
        method: "POST",
        body: keys.join(delim)
    })
}

export function get(...keys) {
    return fetch(url + "/get", {
        method: "POST",
        body: keys.join(delim)
    })
}