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
exports.addMessages = exports.save_messages = exports.checkPosition = exports.close_popup = exports.show_popup = void 0;
const views_js_1 = require("./views.js");
const render_js_1 = require("./render.js");
const server_js_1 = require("./server.js");
const index_js_1 = require("./index.js");
function show_popup(page) {
    if (page !== null) {
        page.classList.remove('popup-hide');
    }
}
exports.show_popup = show_popup;
function close_popup(page) {
    if (page !== null) {
        page.classList.add('popup-hide');
    }
}
exports.close_popup = close_popup;
function addMessages() {
    for (let i = 0; i < 20; i++) {
        (0, render_js_1.renderMessages)(index_js_1.messages[i]);
    }
    index_js_1.messages.splice(0, 20);
}
exports.addMessages = addMessages;
function save_messages() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield (0, server_js_1.get_messages)();
        // let result:any = await get_messages();
        index_js_1.messages.length = 0;
        for (let i = 0; i < result.messages.length; i++) {
            index_js_1.messages.push(result.messages[i]);
        }
        console.log(index_js_1.messages);
        let container = document.createElement('div');
        container.classList.add('messages-main-container');
        if (views_js_1.UI_ELEMENTS.MESSAGES_PAGE !== null) {
            views_js_1.UI_ELEMENTS.MESSAGES_PAGE.append(container);
        }
    });
}
exports.save_messages = save_messages;
function checkPosition() {
    if (views_js_1.UI_ELEMENTS.MESSAGES_PAGE !== null) {
        if (views_js_1.UI_ELEMENTS.MESSAGES_PAGE.scrollTop <= 0) {
            addMessages();
            views_js_1.UI_ELEMENTS.MESSAGES_PAGE.scrollTo(0, 1270);
        }
    }
}
exports.checkPosition = checkPosition;
