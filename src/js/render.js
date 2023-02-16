import { UI_ELEMENTS } from "./views.js";
import Cookies from 'js-cookie';

function renderMessagesLast(...messages)     {
    let clon = UI_ELEMENTS.MESSAGE_SEND_TEMPLATE.content.cloneNode(true);
    let clonGetMessage = UI_ELEMENTS.MESSAGE_GET_TEMPLATE.content.cloneNode(true);
    let container = document.querySelector('.messages-main-container');

    if(Cookies.get('email') === messages[0].user.email)    {
        clon.querySelector('.text').textContent = messages[0].text; 
        clon.querySelector('.date').textContent = messages[0].createdAt;
        container.append(clon);

    }else{
        clonGetMessage.querySelector('.text').textContent = messages[0].text; 
        clonGetMessage.querySelector('.date').textContent = messages[0].createdAt; 
        container.append(clonGetMessage);

    }
    
}

function renderMessages(...messages)     {
    let clon = UI_ELEMENTS.MESSAGE_SEND_TEMPLATE.content.cloneNode(true);
    let clonGetMessage = UI_ELEMENTS.MESSAGE_GET_TEMPLATE.content.cloneNode(true);
    let container = document.querySelector('.messages-main-container');

    if(Cookies.get('email') === messages[0].user.email)    {
        clon.querySelector('.text').textContent = messages[0].text; 
        clon.querySelector('.date').textContent = messages[0].createdAt;
        container.prepend(clon);
    }else{
        clonGetMessage.querySelector('.text').textContent = messages[0].text; 
        clonGetMessage.querySelector('.date').textContent = messages[0].createdAt; 
        container.prepend(clonGetMessage);
    }
    
}

export { renderMessages, renderMessagesLast }