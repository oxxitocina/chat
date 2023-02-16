import { UI_ELEMENTS } from "./views.js";
import { SERVER_DATA,
        authorization,
        confirmation,
        get_name,
        set_name,
        get_messages,
} from "./server.js";
import { renderMessages, renderMessagesLast } from "./render.js";


UI_ELEMENTS.SETTINGS_BTN.addEventListener('click', function()   {
    show_popup(UI_ELEMENTS.SETTINGS_POPUP)
});
UI_ELEMENTS.SETTINGS_CLOSE_BTN.addEventListener('click', function()  {
    close_popup(UI_ELEMENTS.SETTINGS_POPUP)
});
UI_ELEMENTS.AUTHORIZATION_CLOSE_BUTTON.addEventListener('click', function() {
    close_popup(UI_ELEMENTS.AUTHORIZATION_PAGE)
});
UI_ELEMENTS.CONFIRMATION_CLOSE_BUTTON.addEventListener('click', async function()  {
    close_popup(UI_ELEMENTS.CONFIRMATION_PAGE)
    await save_messages();
    await addMessages();
    let container = document.querySelector('.messages-main-container');
    UI_ELEMENTS.MESSAGES_PAGE.append(container)
    UI_ELEMENTS.MESSAGES_PAGE.scrollTo(0, UI_ELEMENTS.MESSAGES_PAGE.scrollHeight)
})
UI_ELEMENTS.MESSAGE_SEND_FORM.addEventListener('submit', function(event)  {
    event.preventDefault();
    sendMessage();
})
UI_ELEMENTS.FORM_SEND_EMAIL.addEventListener('submit', function(event)  {
    event.preventDefault();
    authorization();
})
UI_ELEMENTS.CONFIRMATION_FORM.addEventListener('submit', function(event) {
    event.preventDefault();
    confirmation();
})
UI_ELEMENTS.SETTINGS_FORM.addEventListener('submit', function(event) {
    event.preventDefault();
    set_name();
})
UI_ELEMENTS.SETTINGS_GET_NAME_BUTTON.addEventListener('click', function()   {
    get_name()
})
UI_ELEMENTS.SETTINGS_GET_CHAT_HISTORY.addEventListener('click', function()  {
    save_messages()
})
UI_ELEMENTS.GET_POSITION_BUTTON.addEventListener('click', function()    {
    checkPosition()
})
UI_ELEMENTS.ADD_MESSAGES.addEventListener('click', function()   {
    addMessages();
})
UI_ELEMENTS.MESSAGES_PAGE.addEventListener('scroll', function() {
    checkPosition();
})

function show_popup(page)   {
   page.classList.remove('popup-hide')
}

function close_popup(page)    {
    page.classList.add('popup-hide')
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

const messages = [];

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


