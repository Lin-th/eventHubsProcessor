interface IEventMessage {
    chargerId: string;
    method: string,
    payload: Object,
    additional_payload: Object
}

export { IEventMessage }