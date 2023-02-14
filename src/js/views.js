const UI_ELEMENTS = {
    SETTINGS_BTN: document.querySelector('#settings-button'),
    SETTINGS_POPUP: document.querySelector('.settings-popup-container'),
    SETTINGS_CLOSE_BTN: document.querySelector('#settings-close-button'),
    SETTINGS_FORM: document.querySelector('#settings-form'),
    SETTINGS_INPUT: document.querySelector('#input-name'),
    SETTINGS_GET_NAME_BUTTON: document.querySelector('#get-name-button'),
    SETTINGS_GET_CHAT_HISTORY: document.querySelector('#get-chat-history'),

    MESSAGE_SEND_FORM: document.querySelector('#message-send-form'),
    MESSAGE_SEND_TEMPLATE: document.querySelector('#send-message-tmp'),
    MESSAGE_GET_TEMPLATE: document.querySelector('#get-message-tmp'),
    MESSAGES_PAGE: document.querySelector('.messages-body'),
    MESSAGE_INPUT: document.querySelector('#input-message'),
    MESSAGE_MAIN_CONTAINER: document.querySelector('.messages-main-container'),

    AUTHORIZATION_PAGE: document.querySelector('.authorization-popup-container'),
    AUTHORIZATION_CLOSE_BUTTON: document.querySelector('#authorization-close-button'),
    EMAIL_INPUT: document.querySelector('#input-send-email'),
    FORM_SEND_EMAIL: document.querySelector('#send-email'),

    CONFIRMATION_PAGE: document.querySelector('.confirmation-popup-container'),
    CONFIRMATION_CLOSE_BUTTON: document.querySelector('#confirmation-close-button'),
    CONFIRMATION_INPUT_CODE: document.querySelector('#input-code'),
    CONFIRMATION_FORM: document.querySelector('#confirmation-form'),

    GET_POSITION_BUTTON: document.querySelector('#get-position'),
    ADD_MESSAGES: document.querySelector('#add-messages'),
    DELETE_MESSAGES: document.querySelector('#delete-messages'),

    TEMPLATE_MESSAGES_CONTAINER: document.querySelector('#messages-main-container'),
    TEMPLATE_MESSAGES_SCROLL_CONTAINER: document.querySelector('#messages-scroll-container'),

}

export { UI_ELEMENTS }