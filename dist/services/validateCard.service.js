"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bo_ambassador_1 = require("../ambassadors/bo.ambassador");
const logger_1 = __importDefault(require("../logger"));
class StartTransactionService {
    constructor() {
        this.boAmbassador = new bo_ambassador_1.BOAmbassador();
    }
    async init(payload, chargerId, systemProperties) {
        await this.processStartTransaction(payload, chargerId, systemProperties);
    }
    async processStartTransaction(payload, chargerId, systemProperties) {
        let chargerSerailNumber = chargerId;
        let idTag = payload.idTag;
        let deviceId = systemProperties['iothub-connection-device-id'];
        if (!chargerSerailNumber) {
            logger_1.default.info('Error: chargerSerailNumber not found');
            return;
        }
        if (!idTag) {
            logger_1.default.info('Error: idTag not found');
            return;
        }
        if (!deviceId) {
            logger_1.default.info('Error: deviceId not found');
            return;
        }
        await this.startTransaction(chargerSerailNumber, idTag, deviceId);
    }
    async startTransaction(chargerSerailNumber, idTag, deviceId) {
        try {
            await this.boAmbassador.cardWalkin(chargerSerailNumber, idTag, deviceId);
        }
        catch (error) {
            logger_1.default.error(`Cannot cardWalkin chargerSerailNumber: ${chargerSerailNumber}`, `${error}`);
        }
    }
}
exports.default = new StartTransactionService();
//# sourceMappingURL=validateCard.service.js.map