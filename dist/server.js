"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_hubs_1 = require("@azure/event-hubs");
// import logger from "./logger";
const env_1 = __importDefault(require("./env"));
const app_1 = require("./app");
const connectionString = env_1.default.CONNECTIONSTRING || "";
const storageAccountName = env_1.default.LOG_AZ_TABLE_STORAGE_ACC_NAME || "";
const storageAccountKey = env_1.default.LOG_AZ_TABLE_STORAGE_ACC_KEY || "";
const storageContainerUrl = env_1.default.STORAGE_CONTAINER_URL || "";
// const eventHubName = process.env["EVENT_HUB_NAME"] || "<eventHubName>";
const consumerGroup = env_1.default.EVENT_HUB_CONSUMER_GROUP || "";
const main = async () => {
    try {
        // logger.info("IoT Hub Quickstarts - Read device to cloud messages.");
        // const storageCredential = new StorageSharedKeyCredential(
        //   storageAccountName,
        //   storageAccountKey
        // );
        // const containerClient = new ContainerClient(
        //   storageContainerUrl,
        //   storageCredential
        // );
        // if (!(await containerClient.exists())) {
        //   await containerClient.create();
        // }
        // const checkpointStore: CheckpointStore = new BlobCheckpointStore(
        //   containerClient
        // );
        const consumerClient = new event_hubs_1.EventHubConsumerClient(consumerGroup, connectionString);
        const partitionIds = await consumerClient.getPartitionIds();
        console.log("On Message =>Server");
        consumerClient.subscribe({
            processEvents: app_1.processEvent,
            processError: app_1.processError,
        }
        // { startPosition: earliestEventPosition }
        );
    }
    catch (ex) {
        console.log("### ERROR ###", ex);
        // logger.error(ex);
    }
};
main().catch((error) => {
    // logger.error("Error running sample:", error);
});
//# sourceMappingURL=server.js.map