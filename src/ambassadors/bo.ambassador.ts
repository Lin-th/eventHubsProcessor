import axios from 'axios'
import env from '../env';
import {httpClient} from '../utils/httpClient';

export class BOAmbassador {

    constructor() {
    }

    public async updateEnergyByOrderId(orderId: string, energy: string, unit: string) {
        // const used = process.memoryUsage();
        // for (let key in used) {
        //     console.log(`(updateEnergyByOrderId)=>${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
        //   }
        // console.log("(updateEnergyByOrderId)=>",process.memoryUsage());
        
        // const uri = `${env.AAD_EVC_BO_API_ENDPOINT}/iot/charger/${orderId}/chargerUsage`;
        // const response = await httpClient.patch(uri, { energy: energy, unit: unit });
        // return response;
    }

    public async cardWalkin(chargerSerailNumber: string, idTag: string, deviceId: string) {
        // const used = process.memoryUsage();
        // for (let key in used) {
        //     console.log(`(cardWalkin)=>${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
        //   }
        // console.log("(cardWalkin)=>",process.memoryUsage());
        // const uri = `${env.AAD_EVC_BO_API_ENDPOINT}/iot/charger/${idTag}/validation/${chargerSerailNumber}/${deviceId}`;
        // const result = await httpClient.get(uri)
        // return result;
    }

    public async cardCheckout(orderId: string, isEmergencyStop: boolean = false) {
        // const used = process.memoryUsage();
        // for (let key in used) {
        //     console.log(`(cardCheckout)=>${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
        //   }
        // console.log("(cardCheckout)=>",process.memoryUsage());
        // const uri = `${env.AAD_EVC_APP_API_ENDPOINT}/reserve/${orderId}/card/checkout`;
        // const result = await httpClient.post(uri, { isEmergencyStop });
        // return result;
    }

    public async updateChargerState(chargerId: string, status: string) {
        // const used = process.memoryUsage();
        // for (let key in used) {
        //     console.log(`(updateChargerState)=>${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
        //   }
        // console.log("(updateChargerState)=>",process.memoryUsage());
        // const uri = `${env.AAD_EVC_APP_API_ENDPOINT}/iot/charger/${chargerId}/state`;
        // const result = await httpClient.patch(uri, { state: status });
        // return result;
    }
    
}