"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopTransactionReason = exports.MeterValuesContextType = exports.NotificationStatus = exports.NotificationInfo = exports.MessageTypes = void 0;
var MessageTypes;
(function (MessageTypes) {
    MessageTypes["MeterValues"] = "MeterValues";
    MessageTypes["Heartbeat"] = "Heartbeat";
    MessageTypes["StopTransaction"] = "StopTransaction";
    MessageTypes["StatusNotification"] = "StatusNotification";
    MessageTypes["ChargerStatus"] = "ChargerStatus";
    MessageTypes["ValidateCard"] = "ValidateCard";
})(MessageTypes = exports.MessageTypes || (exports.MessageTypes = {}));
var NotificationInfo;
(function (NotificationInfo) {
    NotificationInfo["NoError"] = "NoError";
    NotificationInfo["Emergency"] = "Emergency";
    NotificationInfo["otherError"] = "otherError";
})(NotificationInfo = exports.NotificationInfo || (exports.NotificationInfo = {}));
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["NoError"] = "NoError";
    NotificationStatus["Charging"] = "Charging";
    NotificationStatus["Available"] = "Available";
    NotificationStatus["Unavailable"] = "Unavailable";
    NotificationStatus["Faulted"] = "Faulted";
})(NotificationStatus = exports.NotificationStatus || (exports.NotificationStatus = {}));
var MeterValuesContextType;
(function (MeterValuesContextType) {
    MeterValuesContextType["TransactionStart"] = "Transaction.Start";
    MeterValuesContextType["TransactionEnd"] = "Transaction.End";
})(MeterValuesContextType = exports.MeterValuesContextType || (exports.MeterValuesContextType = {}));
var StopTransactionReason;
(function (StopTransactionReason) {
    StopTransactionReason["Local"] = "Local";
    StopTransactionReason["Remote"] = "Remote";
    StopTransactionReason["EmergencyStop"] = "EmergencyStop";
    StopTransactionReason["Other"] = "Other";
})(StopTransactionReason = exports.StopTransactionReason || (exports.StopTransactionReason = {}));
//# sourceMappingURL=MessageType.js.map