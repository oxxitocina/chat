import Cookies from 'js-cookie'
import { UI_ELEMENTS } from "./views.js";

const SERVER_DATA = {
    SERVER_URL: 'https://edu.strada.one/api/user',
    SOCKET: new WebSocket(`wss://edu.strada.one/websockets?${Cookies.get('token')}`),
}

async function authorization()  {
    let user = {
        email: null,
    };

    user.email = UI_ELEMENTS.EMAIL_INPUT.value;

    try   {

        let response = await fetch(SERVER_DATA.SERVER_URL, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(user)
        });

        let result = await response.json();
        console.log(result);

        close_popup(UI_ELEMENTS.AUTHORIZATION_PAGE);

    }   catch(error)   {
        alert(`${error} 
        Wrong email!
        `);
    }
      
}

async function confirmation()   {
    let code = UI_ELEMENTS.CONFIRMATION_INPUT_CODE.value;
    Cookies.set('token', code)

    let user;

    async function setCookiesEmail()    {
        user = await get_name();
        Cookies.set('email', user.email)
    }

    await setCookiesEmail(); 
}

async function get_name()   {
    let response = await fetch(`${SERVER_DATA.SERVER_URL}/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
    });

    let result = await response.json();
    console.log(result)
    return result;
}

async function set_name()   {
    let user = {
        name: null,
    }

    user.name = UI_ELEMENTS.SETTINGS_INPUT.value;

    let response = await fetch(SERVER_DATA.SERVER_URL, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user)
    });

    let result = await response.json();
    console.log(result)
}

async function get_messages()   {
    let response = await fetch('https://edu.strada.one/api/messages/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        }
    });

    let result = await response.json();
    console.log(result)
    return result;
}

SERVER_DATA.SOCKET.onmessage = async function(event) { 
    let user = JSON.parse(event.data);
    messages.push(user);
    
    renderMessagesLast(messages[messages.length-1]);
    UI_ELEMENTS.MESSAGES_PAGE.scrollTo(0, UI_ELEMENTS.MESSAGES_PAGE.scrollHeight);

};

function sendMessage()  {
    let text = UI_ELEMENTS.MESSAGE_INPUT.value;
    SERVER_DATA.SOCKET.send(JSON.stringify({text}));
}

export { SERVER_DATA,
        authorization,
        confirmation,
        get_name,
        set_name,
        get_messages,
        sendMessage,
}