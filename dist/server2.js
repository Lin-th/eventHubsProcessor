"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { EventHubConsumerClient, earliestEventPosition, } = require("@azure/event-hubs");
const env_1 = __importDefault(require("./env"));
const MessageType_1 = require("./utils/MessageType");
const meter_value_service_1 = __importDefault(require("./services/meter.value.service"));
const stopTransaction_service_1 = __importDefault(require("./services/stopTransaction.service"));
const statusNotification_service_1 = __importDefault(require("./services/statusNotification.service"));
const chargerStatus_service_1 = __importDefault(require("./services/chargerStatus.service"));
const validateCard_service_1 = __importDefault(require("./services/validateCard.service"));
const process_1 = require("process");
const httpClient_1 = require("./utils/httpClient");
const senTry_1 = require("./utils/senTry");
async function main() {
    let url = `${env_1.default.AAD_EVC_BO_API_ENDPOINT}/iot/charger/transaction`;
    const client = new EventHubConsumerClient("telemetrylocalmonitoring", "Endpoint=sb://iothub-ns-bpnsgte-ev-5534530-72f3a51912.servicebus.windows.net/;SharedAccessKeyName=service;SharedAccessKey=eLDdComO5qtprghsA1ibGYP0Puq/iDwDHhq1yquvM4M=;EntityPath=bpnsgte-evc-iothub");
    // In this sample, we use the position of earliest available event to start from
    // Other common options to configure would be `maxBatchSize` and `maxWaitTimeInSeconds`
    const subscription = client.subscribe({
        processEvents: async (events, context) => {
            if (events.length === 0) {
                return;
            }
            for (const iterator of events) {
                console.log("On Message =>", Math.round(process_1.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100, "MB");
                senTry_1.Sentry.captureMessage("Swich Message", iterator.data);
                switch (iterator.data.OcppMethod) {
                    case MessageType_1.MessageTypes.MeterValues:
                        meter_value_service_1.default.init(iterator.data);
                    case MessageType_1.MessageTypes.StopTransaction:
                        stopTransaction_service_1.default.init(iterator.data);
                    case MessageType_1.MessageTypes.StatusNotification:
                        statusNotification_service_1.default.init(iterator.data.ChargerID, iterator.data);
                    case MessageType_1.MessageTypes.ChargerStatus:
                        chargerStatus_service_1.default.init(iterator.data.ChargerID, iterator.data);
                    case MessageType_1.MessageTypes.ValidateCard:
                        validateCard_service_1.default.init(iterator.data, iterator.data.ChargerID, iterator.systemProperties);
                    case MessageType_1.MessageTypes.Heartbeat:
                        await httpClient_1.httpClient.post(url, {
                            chargerId: iterator.data.ChargerID,
                            method: iterator.data.OcppMethod,
                            payload: iterator.data,
                            additional_payload: iterator.additional_payload,
                        });
                    default:
                        break;
                }
            }
        },
        processError: async (err, context) => {
            senTry_1.Sentry.captureException("Recive Message", err);
        },
    });
}
main();
//# sourceMappingURL=server2.js.map