"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { logger } from '@azure/event-hubs';
const bo_ambassador_1 = require("../ambassadors/bo.ambassador");
class ChargerStatusService {
    constructor() {
        this.boAmbassador = new bo_ambassador_1.BOAmbassador();
    }
    async init(chargerId, data) {
        const status = data;
        if (!status) {
            // logger.info(`Status charger not found`);
            return;
        }
        try {
            await this.boAmbassador.updateChargerState(chargerId, status);
        }
        catch (error) {
            // logger.error(`Update charger status error: ${status}`);
        }
    }
}
exports.default = new ChargerStatusService();
//# sourceMappingURL=chargerStatus.service.js.map