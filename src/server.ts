import { EventHubConsumerClient, CheckpointStore } from "@azure/event-hubs";
import {
  ContainerClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { BlobCheckpointStore } from "@azure/eventhubs-checkpointstore-blob";
// import logger from "./logger";
import env from "./env";
import { processEvent, processError } from "./app";
import { delay } from "@azure/event-processor-host";

const connectionString = env.CONNECTIONSTRING || "";
const storageAccountName = env.LOG_AZ_TABLE_STORAGE_ACC_NAME || "";
const storageAccountKey = env.LOG_AZ_TABLE_STORAGE_ACC_KEY || "";
const storageContainerUrl = env.STORAGE_CONTAINER_URL || "";
// const eventHubName = process.env["EVENT_HUB_NAME"] || "<eventHubName>";
const consumerGroup = env.EVENT_HUB_CONSUMER_GROUP || "";

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

    const consumerClient = new EventHubConsumerClient(
      consumerGroup,
      connectionString,
      // checkpointStore
    );

    const partitionIds = await consumerClient.getPartitionIds();
    console.log("On Message =>Server");

   consumerClient.subscribe(
      {
        processEvents: processEvent,
        processError: processError,
      }
      // { startPosition: earliestEventPosition }
    );

   
  } catch (ex) {
    console.log("### ERROR ###",ex);
    // logger.error(ex);
  }
};

main().catch((error) => {
  // logger.error("Error running sample:", error);
});
