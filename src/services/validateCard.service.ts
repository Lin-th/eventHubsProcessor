import { BOAmbassador } from '../ambassadors/bo.ambassador';
import _ from 'lodash';
import logger from '../logger';

class StartTransactionService {
    private boAmbassador: BOAmbassador;

    constructor() {
        this.boAmbassador = new BOAmbassador();
    }

    public async init(payload, chargerId, systemProperties): Promise<void> {
        await this.processStartTransaction(payload, chargerId, systemProperties);
    }

    private async processStartTransaction(payload, chargerId, systemProperties): Promise<void> {
        let chargerSerailNumber = chargerId
        let idTag = payload.idTag
        let deviceId = systemProperties['iothub-connection-device-id']
        
        if (!chargerSerailNumber) {
            logger.info('Error: chargerSerailNumber not found')
            return
        }
        if (!idTag) {
            logger.info('Error: idTag not found')
            return
        }
        if (!deviceId) {
            logger.info('Error: deviceId not found')
            return
        }
        
        await this.startTransaction(chargerSerailNumber, idTag, deviceId)
    }
    private async startTransaction(chargerSerailNumber: string, idTag: string, deviceId:string): Promise<void> {
        try {
            await this.boAmbassador.cardWalkin(chargerSerailNumber, idTag, deviceId)
        } catch (error) {
            logger.error(`Cannot cardWalkin chargerSerailNumber: ${chargerSerailNumber}`, `${error}`);
        }
    }

    

    
}

export default new StartTransactionService();