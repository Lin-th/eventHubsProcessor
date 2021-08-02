import _ from 'lodash'
// import { logger } from '@azure/event-hubs';
import { BOAmbassador } from '../ambassadors/bo.ambassador';

class ChargerStatusService {
    private boAmbassador: BOAmbassador;

    constructor() {
        this.boAmbassador = new BOAmbassador()
    }

    public async init(chargerId, data) {
        const status = data

        if (!status) {
          // logger.info(`Status charger not found`);
          return
        }

        try {
          await this.boAmbassador.updateChargerState(chargerId, status)
        } catch (error) {
          // logger.error(`Update charger status error: ${status}`);
        }
    }
}

export default new ChargerStatusService();