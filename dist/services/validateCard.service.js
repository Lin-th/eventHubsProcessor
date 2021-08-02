"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bo_ambassador_1 = require("../ambassadors/bo.ambassador");
// import logger from '../logger';
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
            // logger.info('Error: chargerSerailNumber not found')
            return;
        }
        if (!idTag) {
            // logger.info('Error: idTag not found')
            return;
        }
        if (!deviceId) {
            // logger.info('Error: deviceId not found')
            return;
        }
        await this.startTransaction(chargerSerailNumber, idTag, deviceId);
    }
    async startTransaction(chargerSerailNumber, idTag, deviceId) {
        try {
            await this.boAmbassador.cardWalkin(chargerSerailNumber, idTag, deviceId);
        }
        catch (error) {
            // logger.error(`Cannot cardWalkin chargerSerailNumber: ${chargerSerailNumber}`, `${error}`);
        }
    }
}
exports.default = new StartTransactionService();
//# sourceMappingURL=validateCard.service.js.map