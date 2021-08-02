
import env from "./env";

const { EventProcessorHost, delay } = require("@azure/event-processor-host");

import { onMessage, onError } from "./app1"

//your eventhub name
const path = "bpnsgte-evc-iothub"; 

//your azure storage connection string
const storageCS = env.STORAGE_CONNECTION_STRING||"";

//your eventhub namespace connectionstring 
const ehCS = "Endpoint=sb://iothub-ns-bpnsgte-ev-5534530-72f3a51912.servicebus.windows.net/;SharedAccessKeyName=iothubowner;SharedAccessKey=ySwut87ypiX/gKS26bAsenCP5CFev6O+5y+TJiNr1/M=;EntityPath=bpnsgte-evc-iothub";

//your blob storage container name
const storageContainerName = "tao-test";

async function main() {
  // Create the Event Processo Host
  const eph = EventProcessorHost.createFromConnectionString(
    EventProcessorHost.createHostName("my-host"),
    storageCS,
    storageContainerName,
    ehCS,
    {
      eventHubPath: path
    }

  );
  await eph.start(onMessage, onError);

 
}

main().catch((err) => {
  console.log(err);
});