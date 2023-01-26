import { UI_ELEMENTS } from "./views.js";

UI_ELEMENTS.SETTINGS_BTN.addEventListener('click', settings_popup);
UI_ELEMENTS.SETTINGS_CLOSE_BTN.addEventListener('click', settings_popup_close)
UI_ELEMENTS.MESSAGE_SEND_FORM.addEventListener('submit', function(event)  {
    event.preventDefault();
    send_message();
})

function settings_popup()   {
    UI_ELEMENTS.SETTINGS_POPUP.style.display = 'flex';
}

function settings_popup_close()    {
    UI_ELEMENTS.SETTINGS_POPUP.style.display = 'none';
}

function send_message()     {
    let message = UI_ELEMENTS.MESSAGE_INPUT.value;
    let date_now = new Date();
    let hoursAndMinutes = date_now.getHours() + ':' + date_now.getMinutes();

        if(message.length === 0)    {
            return 0;
        }

    let clon = UI_ELEMENTS.MESSAGE_SEND_TEMPLATE.content.cloneNode(true);
    clon.firstElementChild.firstElementChild.firstElementChild.textContent = "Me: " + message;
    clon.firstElementChild.firstElementChild.lastElementChild.textContent = hoursAndMinutes;
    UI_ELEMENTS.MESSAGES_PAGE.append(clon);
}