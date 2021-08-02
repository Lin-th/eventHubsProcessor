const {
  EventHubConsumerClient,
  earliestEventPosition,
} = require("@azure/event-hubs");
import env from "./env";
import { IEventMessage } from "./models/IEventMessage";
import { MessageTypes } from "./utils/MessageType";
import MeterValueService from "./services/meter.value.service";
import StopTransactionService from "./services/stopTransaction.service";
import StatusNotificationService from "./services/statusNotification.service";
import ChargerStatusService from "./services/chargerStatus.service";
import ValidateCard from "./services/validateCard.service";
import { memoryUsage } from "process";
import { httpClient } from "./utils/httpClient";
import { Sentry } from "./utils/senTry";

async function main() {
  let url: string = `${env.AAD_EVC_BO_API_ENDPOINT}/iot/charger/transaction`;
  const client = new EventHubConsumerClient(
    "telemetrylocalmonitoring",
    "Endpoint=sb://iothub-ns-bpnsgte-ev-5534530-72f3a51912.servicebus.windows.net/;SharedAccessKeyName=service;SharedAccessKey=eLDdComO5qtprghsA1ibGYP0Puq/iDwDHhq1yquvM4M=;EntityPath=bpnsgte-evc-iothub"
  );

  // In this sample, we use the position of earliest available event to start from
  // Other common options to configure would be `maxBatchSize` and `maxWaitTimeInSeconds`

  const subscription = client.subscribe({
    processEvents: async (events, context) => {
      if (events.length === 0) {
        return;
      }
     
      for (const iterator of events) {
        console.log("On Message =>", Math.round(memoryUsage().heapUsed / 1024 / 1024 * 100) / 100 ,"MB" );
        Sentry.captureMessage("Swich Message",iterator.data);
        switch (iterator.data.OcppMethod) {
          case MessageTypes.MeterValues:
            MeterValueService.init(iterator.data);
          case MessageTypes.StopTransaction:
            StopTransactionService.init(iterator.data);
          case MessageTypes.StatusNotification:
            StatusNotificationService.init(
              iterator.data.ChargerID,
              iterator.data
            );
          case MessageTypes.ChargerStatus:
            ChargerStatusService.init(iterator.data.ChargerID, iterator.data);
          case MessageTypes.ValidateCard:
            ValidateCard.init(
              iterator.data,
              iterator.data.ChargerID,
              iterator.systemProperties
            );
          case MessageTypes.Heartbeat:
            await httpClient.post(url, <IEventMessage>{
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
      Sentry.captureException("Recive Message",err);
    },
  });
}

main();
