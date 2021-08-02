import { BOAmbassador } from '../ambassadors/bo.ambassador';
import _ from 'lodash';
import { StopTransactionReason } from '../utils/MessageType';
// import logger from '../logger';

class StopTransactionService {
    private boAmbassador: BOAmbassador;

    constructor() {
        this.boAmbassador = new BOAmbassador();
    }

    private async updateMeterValue(payload): Promise<void> {
        let orderId = payload.orderId;
        let unit = payload.unit || 'Wh';
        let energy = payload.meterStop || 0; // meterStop:
        
        try {
            await this.boAmbassador.updateEnergyByOrderId(orderId, energy, unit)
        } catch (error) {
            // logger.error(`Update energy order: ${orderId} failure: `, `${error}`);
        }
    }

    private async checkoutOrder(orderId: string, isEmergencyStop: boolean): Promise<void> {
        try {
            await this.boAmbassador.cardCheckout(orderId, isEmergencyStop)
        } catch (error) {
            // logger.error(`Cannot checkout order: ${orderId}`, `${error}`);
        }
    }

    private async processStopTransaction(payload): Promise<void> {
        let orderId = payload.orderId;
        let isEmergencyStop = payload.reason === StopTransactionReason.EmergencyStop

        if (!orderId) {
            // logger.info('Error: orderId not found')
            return
        }

        if (isEmergencyStop) {
            // TODO wait for test full loop again
            // await this.updateMeterValue(payload)
        }
        await this.checkoutOrder(orderId, isEmergencyStop)
    }

    public async init(payload): Promise<void> {
        await this.processStopTransaction(payload);
    }
}

export default new StopTransactionService();