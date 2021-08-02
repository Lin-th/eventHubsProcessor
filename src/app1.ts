import { ProcessEventsHandler, ProcessErrorHandler } from "@azure/event-hubs";
import axios from "axios";
import env from "./env";
import logger from "./logger";
import { IEventMessage } from "./models/IEventMessage";
import { MessageTypes } from "./utils/MessageType";
import MeterValueService from "./services/meter.value.service";
import StopTransactionService from "./services/stopTransaction.service";
import StatusNotificationService from "./services/statusNotification.service";
import ChargerStatusService from "./services/chargerStatus.service";
import ValidateCard from "./services/validateCard.service";
import { httpClient } from "./utils/httpClient";
import { EventData, OnReceivedError, OnReceivedMessage, PartitionContext } from "@azure/event-processor-host";
import { memoryUsage } from 'process';



var xl = require("excel4node");
var wb = new xl.Workbook();
var ws = wb.addWorksheet("Sheet 1");

let i = 0;

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
      await httpClient.post(url, <IEventMessage>{
        chargerId: chargerId,
        method: method,
        payload: payload,
        additional_payload: additional_payload,
      });
      console.log("On Heatbeat =>", Math.round(memoryUsage().heapUsed / 1024 / 1024 * 100) / 100 ,"MB" );
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
    logger.error(error);
  }
};

let count = 0;
const onMessage: OnReceivedMessage = async (context: PartitionContext, event: EventData) => {
    // console.log(">>>>> Rx message from '%s': '%s'", context.partitionId, event.body);
    console.log("On Message =>", Math.round(memoryUsage().heapUsed / 1024 / 1024 * 100) / 100 ,"MB" );
    saveMessage(event)

    count++;
    // let us checkpoint every 100th message that is received across all the partitions.
    if (count % 100 === 0) {
      return await context.checkpoint();
    }
  };
  // Error handler
  const onError: OnReceivedError = (error: any) => {
    console.log("Received Error: %O", error);
  };
export { onMessage, onError };
