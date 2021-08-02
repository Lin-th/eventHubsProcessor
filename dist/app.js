"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processError = exports.processEvent = void 0;
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
const processError = async (err) => {
    console.log("ProcessError: ", err.message);
    // logger.error(err.message);
};
exports.processError = processError;
const processEvent = async (messages, context) => {
    if (messages.length === 0) {
        return;
    }
    for (const message of messages) {
        // logger.info(`Telemetry received: ${JSON.stringify(message.body)}`);
        console.log("========");
        console.log("On Message =>", Math.round(process_1.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100, "MB");
        saveMessage(message);
    }
    // try {
    // await context.updateCheckpoint(messages[messages.length-1]);
    // } catch (err) {
    //   console.log(`Error when checkpointing on partition ${context.partitionId}: `, err);
    //   throw err;
    // }
    // console.log(
    //   `Successfully checkpointed event with sequence number: ${
    //     messages[messages.length-1].sequenceNumber
    //   } from partition: 'partitionContext.partitionId'`
    // );
};
exports.processEvent = processEvent;
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
            // const headers = {
            //   'Authorization': await generateToken()
            // }
            //  axios.post(url, <IEventMessage>{
            //     chargerId: chargerId,
            //     method: method,
            //     payload: payload,
            //     additional_payload: additional_payload,
            //   }, {
            // headers: headers
            // })
            await httpClient_1.httpClient.post(url, {
                chargerId: chargerId,
                method: method,
                payload: payload,
                additional_payload: additional_payload,
            });
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
//# sourceMappingURL=app.js.map