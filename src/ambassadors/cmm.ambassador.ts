import axios from 'axios'
import env from '../env';
import {httpClient} from '../utils/httpClient';

export class CmmAmbassador {

    constructor() {
    }

    public async sendEmail(data: any) {
        const url = `${env.AAD_CMM_API_ENDPOINT}/sendemail`
        // const data = {
        //     from: 'anupong_s@banpu.co.th',
        //     to: 'anupong_s@banpu.co.th; janenarong_k@banpu.co.th; gun_l@banpu.co.th',
        //     subject: 'Transaction End',
        //     html: `<div>Transaction Id: ${orderId}<br/>Card NO: ${idTag}<br/>Energy: ${energy} ${unit}</div>`
        // };
        const result = "PPP"
        return result;
    }
}