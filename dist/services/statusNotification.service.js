"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cmm_ambassador_1 = require("../ambassadors/cmm.ambassador");
const MessageType_1 = require("../utils/MessageType");
const lodash_1 = __importDefault(require("lodash"));
const bo_ambassador_1 = require("../ambassadors/bo.ambassador");
// import { logger } from '@azure/event-hubs';
class MeterValueService {
    constructor() {
        this.emails = [
            'sirapat_b@banpunext.co.th',
            'gun_l@banpu.co.th',
            'preecha_s@banpu.co.th',
            'rattapong_s@banpu.co.th',
            'tisan_p@banpu.co.th'
        ];
        this.cmmAmbassador = new cmm_ambassador_1.CmmAmbassador();
        this.boAmbassador = new bo_ambassador_1.BOAmbassador();
    }
    async processEmergency(chargerId) {
        const data = {
            from: 'tisan_p@banpu.co.th',
            to: this.emails.join(';'),
            subject: 'Charger Emergency',
            html: `<div>Someone press EMERGENCY button of ${chargerId}</div>`
        };
        await this.boAmbassador.updateChargerState(chargerId, 'OUT_OF_SERVICE');
        await this.cmmAmbassador.sendEmail(data);
    }
    async handleFaulted(chargerId, data) {
        const context = lodash_1.default.get(data, "info");
        switch (context) {
            case MessageType_1.NotificationInfo.Emergency:
                await this.processEmergency(chargerId);
                break;
            default:
                // logger.info(`Info notification message not match: ${context}`);
                break;
        }
    }
    async init(chargerId, data) {
        const context = lodash_1.default.get(data, "status");
        switch (context) {
            case MessageType_1.NotificationStatus.Available:
                await this.boAmbassador.updateChargerState(chargerId, 'AVAILABLE');
                break;
            case MessageType_1.NotificationStatus.Charging:
                await this.boAmbassador.updateChargerState(chargerId, 'USING');
            case MessageType_1.NotificationStatus.Faulted:
                await this.handleFaulted(chargerId, data);
                break;
            default:
                // logger.info(`Status notification message not match: ${context}`);
                break;
        }
    }
}
exports.default = new MeterValueService();
//# sourceMappingURL=statusNotification.service.js.map