import Cookies from 'js-cookie'
import { UI_ELEMENTS } from "./views.js";
import { close_popup } from './helpers.js';
import { 
    message,
    SERVER, 
} from './interfaces.js';

const SERVER_DATA:SERVER = {
    SERVER_URL: 'https://edu.strada.one/api/user',
    SOCKET: new WebSocket(`wss://edu.strada.one/websockets?${Cookies.get('token')}`),
}

async function authorization():Promise<void>  {
    let user = {
        email: '',
    };

    if(UI_ELEMENTS.EMAIL_INPUT !== null)    {
        user.email = UI_ELEMENTS.EMAIL_INPUT.value;
    }

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

async function confirmation():Promise<void>   {

    if(UI_ELEMENTS.CONFIRMATION_INPUT_CODE !== null)    {
        let code = UI_ELEMENTS.CONFIRMATION_INPUT_CODE.value;
        Cookies.set('token', code)
    }
    
    let user:message;

    async function setCookiesEmail()    {
        user = await get_name();
        Cookies.set('email', user.user.email)
    }

    await setCookiesEmail(); 
}

async function get_name():Promise<message>   {
    let response = await fetch(`${SERVER_DATA.SERVER_URL}/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
    });

    let result:message = await response.json();
    console.log(result)
    return result;
}

async function set_name():Promise<void>   {
    let user:{name: string} = {
        name: '',
    }

    user.name = UI_ELEMENTS.SETTINGS_INPUT!.value;

    let response = await fetch(SERVER_DATA.SERVER_URL, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user)
    });

    let result:message = await response.json();
    console.log(result)
}

async function get_messages():Promise<message[]>   {
    let response = await fetch('https://edu.strada.one/api/messages/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        }
    });

    let result:message[] = await response.json();
    console.log(result)
    return result;
}

function sendMessage():void  {
    let text:string = UI_ELEMENTS.MESSAGE_INPUT!.value;
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