
interface UI {
    SETTINGS_BTN: HTMLButtonElement | null,
    SETTINGS_POPUP: HTMLElement | null,
    SETTINGS_CLOSE_BTN: HTMLButtonElement | null,
    SETTINGS_FORM: HTMLFormElement | null,
    SETTINGS_INPUT: HTMLInputElement | null,
    SETTINGS_GET_NAME_BUTTON: HTMLButtonElement | null,

    MESSAGE_SEND_FORM: HTMLFormElement | null,
    MESSAGE_SEND_TEMPLATE: HTMLTemplateElement | null,
    MESSAGE_GET_TEMPLATE: HTMLTemplateElement | null,
    MESSAGES_PAGE: HTMLElement | null,
    MESSAGE_INPUT: HTMLInputElement | null,
    MESSAGE_MAIN_CONTAINER: HTMLElement | null,

    AUTHORIZATION_PAGE: HTMLElement | null,
    AUTHORIZATION_CLOSE_BUTTON: HTMLButtonElement | null,
    EMAIL_INPUT: HTMLInputElement | null,
    FORM_SEND_EMAIL: HTMLFormElement | null,

    CONFIRMATION_PAGE: HTMLElement | null,
    CONFIRMATION_CLOSE_BUTTON: HTMLButtonElement | null,
    CONFIRMATION_INPUT_CODE: HTMLInputElement | null,
    CONFIRMATION_FORM: HTMLFormElement | null,
}

interface message {
    text: string;
    createdAt: string;
    user:{
        email: string;
        name: string;
  }
}

interface SERVER {
    SERVER_URL: string,
    SOCKET: WebSocket,
}

export {
    UI,
    message,
    SERVER,
 }