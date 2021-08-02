"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { EventHubConsumerClient, earliestEventPosition } = require("@azure/event-hubs");
const env_1 = __importDefault(require("./env"));
const process_1 = require("process");
const senTry_1 = require("./utils/senTry");
async function main() {
    let url = `${env_1.default.AAD_EVC_BO_API_ENDPOINT}/iot/charger/transaction`;
    const client = new EventHubConsumerClient("telemetrylocalmonitoring", "Endpoint=sb://iothub-ns-bpnsgte-ev-5534530-72f3a51912.servicebus.windows.net/;SharedAccessKeyName=service;SharedAccessKey=eLDdComO5qtprghsA1ibGYP0Puq/iDwDHhq1yquvM4M=;EntityPath=bpnsgte-evc-iothub");
    // In this sample, we use the position of earliest available event to start from
    // Other common options to configure would be `maxBatchSize` and `maxWaitTimeInSeconds`
    const subscription = client.subscribe({
        processEvents: async (events, context) => {
            senTry_1.Sentry.captureMessage("Resive Message");
            if (events.length === 0) {
                return;
            }
            console.log("On Message =>", Math.round(process_1.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100, "MB");
            for (const iterator of events) {
                senTry_1.Sentry.captureMessage("Swich Message");
                // if(iterator.data.OcppMethod === MessageTypes.MeterValues){
                //     MeterValueService.init(iterator.data);
                // }else if(MessageTypes.StopTransaction){
                //     StopTransactionService.init(iterator.data);
                // }else if(MessageTypes.StatusNotification){
                //     StatusNotificationService.init(iterator.data.ChargerID,iterator.data);
                // }else if(MessageTypes.ChargerStatus){
                //     ChargerStatusService.init(iterator.data.ChargerID,iterator.data);
                // }else if(MessageTypes.ValidateCard){
                //     ValidateCard.init(iterator.data,iterator.data.ChargerID,iterator.systemProperties);
                // }else if(iterator.data.OcppMethod === MessageTypes.Heartbeat){
                //     await httpClient.post(url, <IEventMessage>{
                //         chargerId: iterator.data.ChargerID,
                //         method: iterator.data.OcppMethod,
                //         payload: iterator.data,
                //         additional_payload: iterator.additional_payload,
                //       })
                // }else{
                // }
            }
        },
        processError: async (err, context) => {
            // error reporting/handling code here
        }
    });
}
main();
//# sourceMappingURL=server2.js.map