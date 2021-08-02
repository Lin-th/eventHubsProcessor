"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onError = exports.onMessage = void 0;
const env_1 = __importDefault(require("./env"));
const MessageType_1 = require("./utils/MessageType");
const meter_value_service_1 = __importDefault(require("./services/meter.value.service"));
const stopTransaction_service_1 = __importDefault(require("./services/stopTransaction.service"));
const statusNotification_service_1 = __importDefault(require("./services/statusNotification.service"));
const chargerStatus_service_1 = __importDefault(require("./services/chargerStatus.service"));
const validateCard_service_1 = __importDefault(require("./services/validateCard.service"));
const httpClient_1 = require("./utils/httpClient");
const process_1 = require("process");
var xl = require("excel4node");
var wb = new xl.Workbook();
var ws = wb.addWorksheet("Sheet 1");
let i = 0;
const processMessage = async (method, payload, chargerId, systemProperties, additional_payload) => {
    console.log("Method: ", method);
    console.log("chargerId: ", chargerId);
    console.log("payload: ", payload);
    switch (method) {
        case MessageType_1.MessageTypes.MeterValues:
            meter_value_service_1.default.init(payload);
        case MessageType_1.MessageTypes.StopTransaction:
            stopTransaction_service_1.default.init(payload);
        case MessageType_1.MessageTypes.StatusNotification:
            statusNotification_service_1.default.init(chargerId, payload);
        case MessageType_1.MessageTypes.ChargerStatus:
            chargerStatus_service_1.default.init(chargerId, payload);
        case MessageType_1.MessageTypes.ValidateCard:
            validateCard_service_1.default.init(payload, chargerId, systemProperties);
        case MessageType_1.MessageTypes.Heartbeat:
            let url = `${env_1.default.AAD_EVC_BO_API_ENDPOINT}/iot/charger/transaction`;
            await httpClient_1.httpClient.post(url, {
                chargerId: chargerId,
                method: method,
                payload: payload,
                additional_payload: additional_payload,
            });
            console.log("On Heatbeat =>", Math.round(process_1.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100, "MB");
        default:
            break;
    }
};
const saveMessage = (message) => {
    try {
        if (message) {
            if (!message.body.OcppMethod) {
                console.log("data from hub =>", message.body);
            }
            else {
                console.log("################# process message #################");
                processMessage(message.body.OcppMethod, message.body.data, message.body.ChargerID, message.systemProperties, message.body.additional_payload);
            }
        }
    }
    catch (error) {
        // logger.error(error);
    }
};
let count = 0;
const onMessage = async (context, event) => {
    // console.log(">>>>> Rx message from '%s': '%s'", context.partitionId, event.body);
    console.log("On Message =>", Math.round(process_1.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100, "MB");
    saveMessage(event);
    count++;
    // let us checkpoint every 100th message that is received across all the partitions.
    if (count % 100 === 0) {
        return await context.checkpoint();
    }
};
exports.onMessage = onMessage;
// Error handler
const onError = (error) => {
    console.log("Received Error: %O", error);
};
exports.onError = onError;
//# sourceMappingURL=app1.js.map