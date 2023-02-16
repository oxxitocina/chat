import { UI_ELEMENTS } from "./views.js";
import { renderMessages } from "./render.js";
import { get_messages } from "./server.js";
import { messages } from "./index.js";

function show_popup(page)   {
    page.classList.remove('popup-hide')
 }
 
 function close_popup(page)    {
     page.classList.add('popup-hide')
 }

 function addMessages()  {

    for(let i = 0; i < 20; i++)   {
        renderMessages(messages[i])
    }

    messages.splice(0, 20);
    
}

async function save_messages()    {
    let result = await get_messages();

    messages.length = 0;

    for(let i = 0; i < result.messages.length; i++)   {
        messages.push(result.messages[i])
    }

    container = document.createElement('div');
    container.classList.add('messages-main-container')
    UI_ELEMENTS.MESSAGES_PAGE.append(container)

}

function checkPosition() {
    if(UI_ELEMENTS.MESSAGES_PAGE.scrollTop <= 0)    {
        addMessages();
        UI_ELEMENTS.MESSAGES_PAGE.scrollTo(0, 1270)
    } 
}

 export { show_popup, close_popup, checkPosition, save_messages, addMessages }

