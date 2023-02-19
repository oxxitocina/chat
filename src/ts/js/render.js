"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMessages = void 0;
const views_js_1 = require("./views.js");
const js_cookie_1 = __importDefault(require("js-cookie"));
function renderMessages(messages, lastMessage = false) {
    if (views_js_1.UI_ELEMENTS.MESSAGE_SEND_TEMPLATE && views_js_1.UI_ELEMENTS.MESSAGE_GET_TEMPLATE !== null) {
        let clon = views_js_1.UI_ELEMENTS.MESSAGE_SEND_TEMPLATE.content.cloneNode(true);
        let clonGetMessage = views_js_1.UI_ELEMENTS.MESSAGE_GET_TEMPLATE.content.cloneNode(true);
        let container = document.querySelector('.messages-main-container');
        if (container !== null) {
            if (js_cookie_1.default.get('email') === messages.user.email) {
                clon.querySelector('.text').textContent = messages.text;
                clon.querySelector('.date').textContent = messages.createdAt;
                if (lastMessage === true) {
                    container.append(clon);
                }
                else {
                    container.prepend(clon);
                }
            }
            else {
                clonGetMessage.querySelector('.text').textContent = messages.text;
                clonGetMessage.querySelector('.date').textContent = messages.createdAt;
                if (lastMessage === true) {
                    container.append(clonGetMessage);
                }
                else {
                    container.prepend(clonGetMessage);
                }
            }
        }
    }
}
exports.renderMessages = renderMessages;
