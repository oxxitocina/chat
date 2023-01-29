import { UI_ELEMENTS } from "./views.js";
import { SERVER_DATA } from "./server.js";
import Cookies from 'js-cookie'


UI_ELEMENTS.SETTINGS_BTN.addEventListener('click', function()   {
    show_popup(UI_ELEMENTS.SETTINGS_POPUP)
});
UI_ELEMENTS.SETTINGS_CLOSE_BTN.addEventListener('click', function()  {
    close_popup(UI_ELEMENTS.SETTINGS_POPUP)
});
UI_ELEMENTS.AUTHORIZATION_CLOSE_BUTTON.addEventListener('click', function() {
    close_popup(UI_ELEMENTS.AUTHORIZATION_PAGE)
});
UI_ELEMENTS.CONFIRMATION_CLOSE_BUTTON.addEventListener('click', function()  {
    close_popup(UI_ELEMENTS.CONFIRMATION_PAGE)
})
UI_ELEMENTS.MESSAGE_SEND_FORM.addEventListener('submit', function(event)  {
    event.preventDefault();
    send_message();
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

function show_popup(page)   {
   page.classList.remove('popup-hide')
}

function close_popup(page)    {
    page.classList.add('popup-hide')
}

function send_message()     {
    let message = UI_ELEMENTS.MESSAGE_INPUT.value;
    let date_now = new Date();
    let hoursAndMinutes = date_now.getHours() + ':' + date_now.getMinutes();

        if(message.length === 0)    {
            return 0;
        }

    let clon = UI_ELEMENTS.MESSAGE_SEND_TEMPLATE.content.cloneNode(true);
    clon.querySelector('.text').textContent = "Me: " + message;
    clon.querySelector('.date').textContent = hoursAndMinutes;
    UI_ELEMENTS.MESSAGES_PAGE.append(clon);
}

async function authorization()  {

    let user = {
        email: null,
    };

    user.email = UI_ELEMENTS.EMAIL_INPUT.value;

    try   {

        let response = await fetch(SERVER_DATA.ENDPOINT, {
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

function confirmation()   {
    let code = UI_ELEMENTS.CONFIRMATION_INPUT_CODE.value;
    console.log(code)
    Cookies.set('token', code)
}

async function set_name()   {
    let user = {
        name: null,
    }

    user.name = UI_ELEMENTS.SETTINGS_INPUT.value;
    console.log(user)

    let response = await fetch(SERVER_DATA.ENDPOINT, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user)
    });

    let result = await response.json();
    console.log(result);
}

async function get_name()   {
    console.log('Start')
    let response = await fetch(`${SERVER_DATA.ENDPOINT}/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
    });

    let result = await response.json();
    console.log(result);
}

