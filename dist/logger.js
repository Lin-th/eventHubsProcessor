"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const banpu_framework_1 = require("@banpudev/banpu-framework");
const env_1 = __importDefault(require("./env"));
const { AzureApplicationInsightsLogger } = require('winston-azure-application-insights');
const appInsights = require('applicationinsights');
class Logger {
    constructor() { }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = banpu_framework_1.createLogger(Logger.config);
            if (env_1.default.APP_INSIGHT_KEY != null && env_1.default.APP_INSIGHT_KEY != "") {
                appInsights.setup(env_1.default.APP_INSIGHT_KEY)
                    .setAutoDependencyCorrelation(true)
                    .setAutoCollectRequests(true)
                    .setAutoCollectPerformance(true, true)
                    .setAutoCollectExceptions(true)
                    .setAutoCollectDependencies(true)
                    .setAutoCollectConsole(true)
                    .setUseDiskRetryCaching(true)
                    .setSendLiveMetrics(false)
                    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C);
                appInsights.defaultClient.config.disableAppInsights = false;
                appInsights.defaultClient.config.samplingPercentage = 100;
                appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = "evc-event-api";
                appInsights.start();
                Logger.instance.add(new AzureApplicationInsightsLogger({
                    insights: appInsights
                }));
            }
        }
        return Logger.instance;
    }
}
Logger.config = {
    consoleLoggerConfig: {
        logLevel: "verbose"
    },
    azTableLoggerConfig: {
        logLevel: env_1.default.LOG_AZ_TABLE_STORAGE_LOG_LEVEL || "info",
        table: env_1.default.LOG_AZ_TABLE_STORAGE_TABLE || "logs",
        partition: env_1.default.LOG_AZ_TABLE_STORAGE_PATITION || "evc-event-api",
        accountName: env_1.default.LOG_AZ_TABLE_STORAGE_ACC_NAME,
        accountKey: env_1.default.LOG_AZ_TABLE_STORAGE_ACC_KEY
    }
};
exports.default = Logger.getInstance();
//# sourceMappingURL=logger.js.map