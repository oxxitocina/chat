const UI_ELEMENTS = {
    SETTINGS_BTN: document.querySelector('#settings-button'),
    SETTINGS_POPUP: document.querySelector('.settings-popup-container'),
    SETTINGS_CLOSE_BTN: document.querySelector('#settings-close-button'),

    MESSAGE_SEND_FORM: document.querySelector('#message-send-form'),
    MESSAGE_SEND_TEMPLATE: document.querySelector('#send-message-tmp'),
    MESSAGES_PAGE: document.querySelector('.messages-body'),
    MESSAGE_INPUT: document.querySelector('#input-message'),
    
    LAST_MESSAGE: document.querySelector('.messages-body').lastElementChild.firstElementChild,
}

export { UI_ELEMENTS }