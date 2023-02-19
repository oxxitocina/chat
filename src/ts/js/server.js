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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.get_messages = exports.set_name = exports.get_name = exports.confirmation = exports.authorization = exports.SERVER_DATA = void 0;
const js_cookie_1 = __importDefault(require("js-cookie"));
const views_js_1 = require("./views.js");
const helpers_js_1 = require("./helpers.js");
const SERVER_DATA = {
    SERVER_URL: 'https://edu.strada.one/api/user',
    SOCKET: new WebSocket(`wss://edu.strada.one/websockets?${js_cookie_1.default.get('token')}`),
};
exports.SERVER_DATA = SERVER_DATA;
function authorization() {
    return __awaiter(this, void 0, void 0, function* () {
        let user = {
            email: '',
        };
        if (views_js_1.UI_ELEMENTS.EMAIL_INPUT !== null) {
            user.email = views_js_1.UI_ELEMENTS.EMAIL_INPUT.value;
        }
        try {
            let response = yield fetch(SERVER_DATA.SERVER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(user)
            });
            let result = yield response.json();
            console.log(result);
            (0, helpers_js_1.close_popup)(views_js_1.UI_ELEMENTS.AUTHORIZATION_PAGE);
        }
        catch (error) {
            alert(`${error} 
        Wrong email!
        `);
        }
    });
}
exports.authorization = authorization;
function confirmation() {
    return __awaiter(this, void 0, void 0, function* () {
        if (views_js_1.UI_ELEMENTS.CONFIRMATION_INPUT_CODE !== null) {
            let code = views_js_1.UI_ELEMENTS.CONFIRMATION_INPUT_CODE.value;
            js_cookie_1.default.set('token', code);
        }
        let user;
        function setCookiesEmail() {
            return __awaiter(this, void 0, void 0, function* () {
                user = yield get_name();
                js_cookie_1.default.set('email', user.user.email);
            });
        }
        yield setCookiesEmail();
    });
}
exports.confirmation = confirmation;
function get_name() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(`${SERVER_DATA.SERVER_URL}/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${js_cookie_1.default.get('token')}`,
            },
        });
        let result = yield response.json();
        console.log(result);
        return result;
    });
}
exports.get_name = get_name;
function set_name() {
    return __awaiter(this, void 0, void 0, function* () {
        let user = {
            name: '',
        };
        user.name = views_js_1.UI_ELEMENTS.SETTINGS_INPUT.value;
        let response = yield fetch(SERVER_DATA.SERVER_URL, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${js_cookie_1.default.get('token')}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(user)
        });
        let result = yield response.json();
        console.log(result);
    });
}
exports.set_name = set_name;
function get_messages() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('https://edu.strada.one/api/messages/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${js_cookie_1.default.get('token')}`,
            }
        });
        let result = yield response.json();
        console.log(result);
        return result;
    });
}
exports.get_messages = get_messages;
function sendMessage() {
    let text = views_js_1.UI_ELEMENTS.MESSAGE_INPUT.value;
    SERVER_DATA.SOCKET.send(JSON.stringify({ text }));
}
exports.sendMessage = sendMessage;
