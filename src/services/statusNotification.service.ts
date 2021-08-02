import { CmmAmbassador } from '../ambassadors/cmm.ambassador';
import { NotificationStatus, NotificationInfo } from "../utils/MessageType";
import _ from 'lodash';
import { BOAmbassador } from '../ambassadors/bo.ambassador';
// import { logger } from '@azure/event-hubs';

class MeterValueService {
    private cmmAmbassador: CmmAmbassador;
    private boAmbassador: BOAmbassador;

    private emails = [
        'sirapat_b@banpunext.co.th',
        'gun_l@banpu.co.th',
        'preecha_s@banpu.co.th',
        'rattapong_s@banpu.co.th',
        'tisan_p@banpu.co.th'
    ];

    constructor() {
        this.cmmAmbassador = new CmmAmbassador();
        this.boAmbassador = new BOAmbassador()
    }

    private async processEmergency(chargerId) {

        const data = {
            from: 'tisan_p@banpu.co.th',
            to: this.emails.join(';'),
            subject: 'Charger Emergency',
            html: `<div>Someone press EMERGENCY button of ${chargerId}</div>`
        };

        await this.boAmbassador.updateChargerState(chargerId, 'OUT_OF_SERVICE')
        await this.cmmAmbassador.sendEmail(data);
        
    }

    private async handleFaulted(chargerId, data) {
        const context = _.get(data, "info");
        switch (context) {
            case NotificationInfo.Emergency:
                await this.processEmergency(chargerId);
                break;
            default:
                // logger.info(`Info notification message not match: ${context}`);
                break;
        }
    }

    public async init(chargerId, data) {
        const context = _.get(data, "status");
        switch (context) {
            case NotificationStatus.Available:
                await this.boAmbassador.updateChargerState(chargerId, 'AVAILABLE')
                break;
            case NotificationStatus.Charging:
                await this.boAmbassador.updateChargerState(chargerId, 'USING')
            case NotificationStatus.Faulted:
                await this.handleFaulted(chargerId, data);
                break;
            default:
                // logger.info(`Status notification message not match: ${context}`);
                break;
        }
    }

}

export default new MeterValueService();