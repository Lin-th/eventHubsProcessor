"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./env"));
const { EventProcessorHost, delay } = require("@azure/event-processor-host");
const app1_1 = require("./app1");
//your eventhub name
const path = "bpnsgte-evc-iothub";
//your azure storage connection string
const storageCS = env_1.default.STORAGE_CONNECTION_STRING || "";
//your eventhub namespace connectionstring 
const ehCS = "Endpoint=sb://iothub-ns-bpnsgte-ev-5534530-72f3a51912.servicebus.windows.net/;SharedAccessKeyName=iothubowner;SharedAccessKey=ySwut87ypiX/gKS26bAsenCP5CFev6O+5y+TJiNr1/M=;EntityPath=bpnsgte-evc-iothub";
//your blob storage container name
const storageContainerName = "tao-test";
async function main() {
    // Create the Event Processo Host
    const eph = EventProcessorHost.createFromConnectionString(EventProcessorHost.createHostName("my-host"), storageCS, storageContainerName, ehCS, {
        eventHubPath: path
    });
    await eph.start(app1_1.onMessage, app1_1.onError);
}
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=server1.js.map