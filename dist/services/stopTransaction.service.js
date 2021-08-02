"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bo_ambassador_1 = require("../ambassadors/bo.ambassador");
const MessageType_1 = require("../utils/MessageType");
const logger_1 = __importDefault(require("../logger"));
class StopTransactionService {
    constructor() {
        this.boAmbassador = new bo_ambassador_1.BOAmbassador();
    }
    async updateMeterValue(payload) {
        let orderId = payload.orderId;
        let unit = payload.unit || 'Wh';
        let energy = payload.meterStop || 0; // meterStop:
        try {
            await this.boAmbassador.updateEnergyByOrderId(orderId, energy, unit);
        }
        catch (error) {
            logger_1.default.error(`Update energy order: ${orderId} failure: `, `${error}`);
        }
    }
    async checkoutOrder(orderId, isEmergencyStop) {
        try {
            await this.boAmbassador.cardCheckout(orderId, isEmergencyStop);
        }
        catch (error) {
            logger_1.default.error(`Cannot checkout order: ${orderId}`, `${error}`);
        }
    }
    async processStopTransaction(payload) {
        let orderId = payload.orderId;
        let isEmergencyStop = payload.reason === MessageType_1.StopTransactionReason.EmergencyStop;
        if (!orderId) {
            logger_1.default.info('Error: orderId not found');
            return;
        }
        if (isEmergencyStop) {
            // TODO wait for test full loop again
            // await this.updateMeterValue(payload)
        }
        await this.checkoutOrder(orderId, isEmergencyStop);
    }
    async init(payload) {
        await this.processStopTransaction(payload);
    }
}
exports.default = new StopTransactionService();
//# sourceMappingURL=stopTransaction.service.js.map