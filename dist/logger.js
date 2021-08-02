"use strict";
// import { createLogger, LoggerConfig } from '@banpudev/banpu-framework';
// import env from './env';
Object.defineProperty(exports, "__esModule", { value: true });
// const { AzureApplicationInsightsLogger } = require('winston-azure-application-insights');
// const appInsights = require('applicationinsights');
// class Logger {
//     private static config: LoggerConfig = {
//         consoleLoggerConfig: {
//             logLevel: "verbose"
//         }, 
//         azTableLoggerConfig: {
//             logLevel: env.LOG_AZ_TABLE_STORAGE_LOG_LEVEL || "info",
//             table: env.LOG_AZ_TABLE_STORAGE_TABLE || "logs",
//             partition: env.LOG_AZ_TABLE_STORAGE_PATITION || "evc-event-api",
//             accountName: env.LOG_AZ_TABLE_STORAGE_ACC_NAME,
//             accountKey: env.LOG_AZ_TABLE_STORAGE_ACC_KEY
//         }
//     };
//     private static instance: any;
//     private constructor(){}
//     static getInstance(): any{
//         if(!Logger.instance){
//             Logger.instance = createLogger(Logger.config);
//             if (env.APP_INSIGHT_KEY != null && env.APP_INSIGHT_KEY != "") {
//                 appInsights.setup(env.APP_INSIGHT_KEY)
//                     .setAutoDependencyCorrelation(true)
//                     .setAutoCollectRequests(true)
//                     .setAutoCollectPerformance(true, true)
//                     .setAutoCollectExceptions(true)
//                     .setAutoCollectDependencies(true)
//                     .setAutoCollectConsole(true)
//                     .setUseDiskRetryCaching(true)
//                     .setSendLiveMetrics(false)
//                     .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C);
//                 appInsights.defaultClient.config.disableAppInsights = false;
//                 appInsights.defaultClient.config.samplingPercentage = 100;
//                 appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = "evc-event-api";
//                 appInsights.start();
//                 Logger.instance.add(new AzureApplicationInsightsLogger({
//                     insights: appInsights
//                 }));
//             }            
//         }
//         return Logger.instance;
//     }
// }
exports.default = "";
// export default Logger.getInstance();
//# sourceMappingURL=logger.js.map