"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmmAmbassador = void 0;
const env_1 = __importDefault(require("../env"));
class CmmAmbassador {
    constructor() {
    }
    async sendEmail(data) {
        const url = `${env_1.default.AAD_CMM_API_ENDPOINT}/sendemail`;
        // const data = {
        //     from: 'anupong_s@banpu.co.th',
        //     to: 'anupong_s@banpu.co.th; janenarong_k@banpu.co.th; gun_l@banpu.co.th',
        //     subject: 'Transaction End',
        //     html: `<div>Transaction Id: ${orderId}<br/>Card NO: ${idTag}<br/>Energy: ${energy} ${unit}</div>`
        // };
        const result = "PPP";
        return result;
    }
}
exports.CmmAmbassador = CmmAmbassador;
//# sourceMappingURL=cmm.ambassador.js.map