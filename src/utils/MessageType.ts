export enum MessageTypes {
    MeterValues = "MeterValues",
    Heartbeat = "Heartbeat",
    StopTransaction = "StopTransaction",
    StatusNotification = "StatusNotification",
    ChargerStatus = 'ChargerStatus', // data is payload
    ValidateCard = 'ValidateCard'

}

export enum NotificationInfo {
    NoError = "NoError",
    Emergency = "Emergency",
    otherError = "otherError"
}

export enum NotificationStatus {
    NoError = "NoError",
    Charging = "Charging",
    Available = "Available",
    Unavailable = "Unavailable",
    Faulted = "Faulted",
}

export enum MeterValuesContextType {
    TransactionStart = "Transaction.Start",
    TransactionEnd = "Transaction.End"
}

export enum StopTransactionReason {
    Local = "Local",
    Remote = "Remote",
    EmergencyStop = "EmergencyStop",
    Other = "Other",
}
