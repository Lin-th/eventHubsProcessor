import { BOAmbassador } from '../ambassadors/bo.ambassador';
import { MeterValuesContextType } from "../utils/MessageType";
import _ from 'lodash';
// import { logger } from '@azure/event-hubs';

class MeterValueService {
    private boAmbassador: BOAmbassador;

    constructor() {
        this.boAmbassador = new BOAmbassador();
    }

    private async processTransactionEnd(payload): Promise<void> {
        const sampledValue = _.get(payload, "meterValue[0].sampledValue[0]");
        if (sampledValue.measurand === "Energy.Active.Import.Register") {
            console.log(`updateEnergyByOrderId: ${payload.orderId}, ${sampledValue.value}, ${sampledValue.unit}`)
            await this.boAmbassador.updateEnergyByOrderId(payload.orderId, sampledValue.value, sampledValue.unit)
                .catch(ex => {
                    console.log(ex);
                    // logger.error(`Update energy order: ${payload.orderId} failure: `, `${ex}`);
                })
        }
    }

    public async init(payload): Promise<void> {
        const context = _.get(payload, "meterValue[0].sampledValue[0].context");
        switch (context) {
            case MeterValuesContextType.TransactionEnd:
                await this.processTransactionEnd(payload);
                break;
            default:
                // logger.info(`Meter value message not match: ${context}`);
                break;
        }
    }
}

export default new MeterValueService();