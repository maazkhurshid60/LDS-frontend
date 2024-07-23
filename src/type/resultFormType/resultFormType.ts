export interface resultFormType {
    queryInformationLT?: queryInformationLTData,
    queryInformationStandard?:queryInformationStandardData,
    serviceResults?:serviceResultsData
}

export interface queryInformationLTData {
    fullName?: string,
    indexNo?: any,
    address?: string,
    businessName?: string,
    inputDate?: string
}

export interface queryInformationStandardData{
    serveTo?: string,
    plaintiff?: string,
    defendants?: string
}

export interface serviceResultsData{
    resultInputDate?: string,
    scvType?: string,
    clientId?:string,
    jobNo?: any,
    serverId?: string,
    results?:string,
    dateOfService?: string,
    firstTimeOfService?:string,
    firstAttemptDate?: string,
    secondTimeOfService?: string,
    secondAttemptDate?: string,
    thirdAttemptDate?: string,
    lTServed?: string,
    lTNotServed?: string,
    substituteDeliveredTo?: string,
    corporateRecipient?: string,
    recipientTitle?: string,
    description?:descriptionData
}

export interface descriptionData{
    door: any,
    doorLocks:any,
    entry:any,
    wall: any,
    floor: any,
    lock:any,
    otherDescription:string,
}