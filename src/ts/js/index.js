"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = void 0;
const views_js_1 = require("./views.js");
const render_js_1 = require("./render.js");
const server_js_1 = require("./server.js");
const helpers_js_1 = require("./helpers.js");
views_js_1.UI_ELEMENTS.SETTINGS_BTN.addEventListener('click', function () {
    (0, helpers_js_1.show_popup)(views_js_1.UI_ELEMENTS.SETTINGS_POPUP);
});
views_js_1.UI_ELEMENTS.SETTINGS_CLOSE_BTN.addEventListener('click', function () {
    (0, helpers_js_1.close_popup)(views_js_1.UI_ELEMENTS.SETTINGS_POPUP);
});
views_js_1.UI_ELEMENTS.AUTHORIZATION_CLOSE_BUTTON.addEventListener('click', function () {
    (0, helpers_js_1.close_popup)(views_js_1.UI_ELEMENTS.AUTHORIZATION_PAGE);
});
views_js_1.UI_ELEMENTS.CONFIRMATION_CLOSE_BUTTON.addEventListener('click', function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, helpers_js_1.close_popup)(views_js_1.UI_ELEMENTS.CONFIRMATION_PAGE);
        yield (0, helpers_js_1.save_messages)();
        (0, helpers_js_1.addMessages)();
        views_js_1.UI_ELEMENTS.MESSAGES_PAGE.scrollTo(0, views_js_1.UI_ELEMENTS.MESSAGES_PAGE.scrollHeight);
    });
});
views_js_1.UI_ELEMENTS.MESSAGE_SEND_FORM.addEventListener('submit', function (event) {
    event.preventDefault();
    (0, server_js_1.sendMessage)();
});
views_js_1.UI_ELEMENTS.FORM_SEND_EMAIL.addEventListener('submit', function (event) {
    event.preventDefault();
    (0, server_js_1.authorization)();
});
views_js_1.UI_ELEMENTS.CONFIRMATION_FORM.addEventListener('submit', function (event) {
    event.preventDefault();
    (0, server_js_1.confirmation)();
});
views_js_1.UI_ELEMENTS.SETTINGS_FORM.addEventListener('submit', function (event) {
    event.preventDefault();
    (0, server_js_1.set_name)();
});
views_js_1.UI_ELEMENTS.SETTINGS_GET_NAME_BUTTON.addEventListener('click', function () {
    (0, server_js_1.get_name)();
});
views_js_1.UI_ELEMENTS.MESSAGES_PAGE.addEventListener('scroll', function () {
    (0, helpers_js_1.checkPosition)();
});
server_js_1.SERVER_DATA.SOCKET.onmessage = function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = JSON.parse(event.data);
        messages.push(user);
        (0, render_js_1.renderMessages)(messages[messages.length - 1], true);
        views_js_1.UI_ELEMENTS.MESSAGES_PAGE.scrollTo(0, views_js_1.UI_ELEMENTS.MESSAGES_PAGE.scrollHeight);
    });
};
const messages = [];
exports.messages = messages;
