import { UI_ELEMENTS } from "./views.js";
import { renderMessages } from "./render.js";
import { 
    message,
} from "./interfaces.js";

import { 
    SERVER_DATA,
    authorization,
    confirmation,
    get_name,
    set_name,
    sendMessage,
} from "./server.js";

import { 
    show_popup, 
    close_popup,
    checkPosition,
    save_messages,
    addMessages,        
} from "./helpers.js";

UI_ELEMENTS.SETTINGS_BTN!.addEventListener('click', function()   {
    show_popup(UI_ELEMENTS.SETTINGS_POPUP)
});
UI_ELEMENTS.SETTINGS_CLOSE_BTN!.addEventListener('click', function()  {
    close_popup(UI_ELEMENTS.SETTINGS_POPUP)
});
UI_ELEMENTS.AUTHORIZATION_CLOSE_BUTTON!.addEventListener('click', function() {
    console.log(1)
    close_popup(UI_ELEMENTS.AUTHORIZATION_PAGE)
});
UI_ELEMENTS.CONFIRMATION_CLOSE_BUTTON!.addEventListener('click', async function()  {
    close_popup(UI_ELEMENTS.CONFIRMATION_PAGE)
    await save_messages();
    addMessages();
    UI_ELEMENTS.MESSAGES_PAGE!.scrollTo(0, UI_ELEMENTS.MESSAGES_PAGE!.scrollHeight)
})
UI_ELEMENTS.MESSAGE_SEND_FORM!.addEventListener('submit', function(event)  {
    event.preventDefault();
    sendMessage();
})
UI_ELEMENTS.FORM_SEND_EMAIL!.addEventListener('submit', function(event)  {
    event.preventDefault();
    authorization();
})
UI_ELEMENTS.CONFIRMATION_FORM!.addEventListener('submit', function(event) {
    event.preventDefault();
    confirmation();
})
UI_ELEMENTS.SETTINGS_FORM!.addEventListener('submit', function(event) {
    event.preventDefault();
    set_name();
})
UI_ELEMENTS.SETTINGS_GET_NAME_BUTTON!.addEventListener('click', function()   {
    get_name()
})
UI_ELEMENTS.MESSAGES_PAGE!.addEventListener('scroll', function() {
    checkPosition();
})

SERVER_DATA.SOCKET.onmessage = async function(event) { 
    let user = JSON.parse(event.data);
    messages.push(user);
    
    renderMessages(messages[messages.length-1], true);
    UI_ELEMENTS.MESSAGES_PAGE!.scrollTo(0, UI_ELEMENTS.MESSAGES_PAGE!.scrollHeight);

};

const messages:message[] = [];

export { messages }


