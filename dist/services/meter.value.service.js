"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bo_ambassador_1 = require("../ambassadors/bo.ambassador");
const MessageType_1 = require("../utils/MessageType");
const lodash_1 = __importDefault(require("lodash"));
// import { logger } from '@azure/event-hubs';
class MeterValueService {
    constructor() {
        this.boAmbassador = new bo_ambassador_1.BOAmbassador();
    }
    async processTransactionEnd(payload) {
        const sampledValue = lodash_1.default.get(payload, "meterValue[0].sampledValue[0]");
        if (sampledValue.measurand === "Energy.Active.Import.Register") {
            console.log(`updateEnergyByOrderId: ${payload.orderId}, ${sampledValue.value}, ${sampledValue.unit}`);
            await this.boAmbassador.updateEnergyByOrderId(payload.orderId, sampledValue.value, sampledValue.unit)
                .catch(ex => {
                console.log(ex);
                // logger.error(`Update energy order: ${payload.orderId} failure: `, `${ex}`);
            });
        }
    }
    async init(payload) {
        const context = lodash_1.default.get(payload, "meterValue[0].sampledValue[0].context");
        switch (context) {
            case MessageType_1.MeterValuesContextType.TransactionEnd:
                await this.processTransactionEnd(payload);
                break;
            default:
                // logger.info(`Meter value message not match: ${context}`);
                break;
        }
    }
}
exports.default = new MeterValueService();
//# sourceMappingURL=meter.value.service.js.map