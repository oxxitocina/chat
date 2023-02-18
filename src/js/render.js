import { UI_ELEMENTS } from "./views.js";
import Cookies from 'js-cookie';

function renderMessages(messages, lastMessage = false)     {
    
    let clon = UI_ELEMENTS.MESSAGE_SEND_TEMPLATE.content.cloneNode(true);
    let clonGetMessage = UI_ELEMENTS.MESSAGE_GET_TEMPLATE.content.cloneNode(true);
    let container = document.querySelector('.messages-main-container');

    if(Cookies.get('email') === messages.user.email)    {
        clon.querySelector('.text').textContent = messages.text; 
        clon.querySelector('.date').textContent = messages.createdAt;

        if(lastMessage === true)    {
            container.append(clon);
        }else{
            container.prepend(clon);
        }
    }else{
        clonGetMessage.querySelector('.text').textContent = messages.text; 
        clonGetMessage.querySelector('.date').textContent = messages.createdAt; 
        
        if(lastMessage === true)    {
            container.append(clonGetMessage);
        }else{
            container.prepend(clonGetMessage);
        }
    }
    
}

export { renderMessages }