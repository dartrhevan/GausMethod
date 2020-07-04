export default function getWSURL(resource) {
    let host = window.location.host;
    if(host === 'localhost:3000')
        host = 'localhost:8080';
    return `${window.location.protocol}//${host}/` + resource;
}//${window.location.protocol === "https:" ? 'wss': 'ws'}://