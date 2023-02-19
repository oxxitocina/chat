import { UI_ELEMENTS } from "./views.js";
import Cookies from 'js-cookie';
import { message } from "./interfaces.js";
import { messages } from "./index.js";

function renderMessages(messages:message, lastMessage:boolean = false)     {

    if(UI_ELEMENTS.MESSAGE_SEND_TEMPLATE && UI_ELEMENTS.MESSAGE_GET_TEMPLATE !== null)    {
        
        let clon = UI_ELEMENTS.MESSAGE_SEND_TEMPLATE.content.cloneNode(true) as HTMLElement;
        let clonGetMessage = UI_ELEMENTS.MESSAGE_GET_TEMPLATE.content.cloneNode(true) as HTMLElement;
        let container = document.querySelector('.messages-main-container');

        if(container !== null)    {

            if(Cookies.get('email') === messages.user.email)    {
                clon.querySelector('.text')!.textContent = messages.text; 
                clon.querySelector('.date')!.textContent = messages.createdAt;

                if(lastMessage === true)    {
                    container.append(clon);
                }else{
                    container.prepend(clon);
                }
            }else{
                clonGetMessage.querySelector('.text')!.textContent = messages.text; 
                clonGetMessage.querySelector('.date')!.textContent = messages.createdAt; 
                
                if(lastMessage === true)    {
                    container.append(clonGetMessage);
                }else{
                    container.prepend(clonGetMessage);
                }
            }
        }
    }
}

export { renderMessages }