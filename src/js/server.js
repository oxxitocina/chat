import Cookies from 'js-cookie'

const SERVER_DATA = {
    SERVER_URL: 'https://edu.strada.one/api/user',
    SOCKET: new WebSocket(`wss://edu.strada.one/websockets?${Cookies.get('token')}`),
}

export { SERVER_DATA }