import { ProcessEventsHandler, ProcessErrorHandler } from "@azure/event-hubs";
import axios from "axios";
import env from "./env";
// import logger from "./logger";
import { IEventMessage } from "./models/IEventMessage";
import { MessageTypes } from "./utils/MessageType";
import MeterValueService from "./services/meter.value.service";
import StopTransactionService from "./services/stopTransaction.service";
import StatusNotificationService from "./services/statusNotification.service";
import ChargerStatusService from "./services/chargerStatus.service";
import ValidateCard from "./services/validateCard.service";
import { generateToken, httpClient } from "./utils/httpClient";
import { memoryUsage } from 'process';

var xl = require("excel4node");
var wb = new xl.Workbook();
var ws = wb.addWorksheet("Sheet 1");

let i = 0;

const processError: ProcessErrorHandler = async (err: any): Promise<void> => {
  console.log("ProcessError: ", err.message);
  // logger.error(err.message);
};
const processEvent: ProcessEventsHandler = async (
  messages: any,
  context: any
): Promise<void> => {
  if (messages.length === 0) {
    return;
  }
  for (const message of messages) {
    // logger.info(`Telemetry received: ${JSON.stringify(message.body)}`);
    console.log("========");
    console.log("On Message =>", Math.round(memoryUsage().heapUsed / 1024 / 1024 * 100) / 100 ,"MB" );
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
const processMessage = async  (
  method,
  payload,
  chargerId,
  systemProperties,
  additional_payload
) => {
  console.log("Method: ", method);
  console.log("chargerId: ", chargerId);
  console.log("payload: ", payload);
  switch (method) {
    case MessageTypes.MeterValues:
      MeterValueService.init(payload);
    case MessageTypes.StopTransaction:
      StopTransactionService.init(payload);
    case MessageTypes.StatusNotification:
      StatusNotificationService.init(chargerId, payload);
    case MessageTypes.ChargerStatus:
      ChargerStatusService.init(chargerId, payload);
    case MessageTypes.ValidateCard:
      ValidateCard.init(payload, chargerId, systemProperties);
    case MessageTypes.Heartbeat:
      let url: string = `${env.AAD_EVC_BO_API_ENDPOINT}/iot/charger/transaction`;
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
       await httpClient.post(url, <IEventMessage>{
        chargerId: chargerId,
        method: method,
        payload: payload,
        additional_payload: additional_payload,
      })
      
    default:
      break;
  }
};
const saveMessage = (message: any) => {
  try {
    if (message) {
      if (!message.body.OcppMethod) {
        console.log("data from hub =>", message.body);
      } else {
        console.log("################# process message #################");
        processMessage(
          message.body.OcppMethod,
          message.body.data,
          message.body.ChargerID,
          message.systemProperties,
          message.body.additional_payload
        );
      }
    }
  } catch (error) {
    // logger.error(error);
  }
};


export { processEvent, processError };
