import { maillingType } from "../maillingAddressType/maillingAddressType"

export interface serviceFormType {
    _id?: string
    jobNo?: number
    name?: string
    isActive?: boolean
    inputDate?: string
    clientId?: any
    serviceType?: any
    caseNo?: any
    caption?: string
    lTServiceType?: string
    otherLTServiceTypeData?: any
    noOfAddLMailings?: number
    mailingAddresses?: maillingType[]
    standardServiceType?: string
    otherStandardServiceTypeData?: any
    oSSTIndexNo?: any,
    oSSTDescription?: string,
    // standardServiceDetail,
    sSDCourt?: string,
    sSDDefendants?: string,
    sSDPlaintiff?: string,
    sSDCountry?: string,
    firstNameServe?: string,
    addressServe?: string,
    cityServe?: string,
    stateServe?: string,
    aptServe?: string,
    zipServe?: string
    // otherLTServiceTypeData,
    oLTIndexNo?: any,
    oLTDescription?: string,
    // lTServiceDetail?:string,
    lTSFirstName?: string,
    lTSBusinessName?: string,
    lTSZip?: string,
    lTSState?: string,
    lTSCity?: string,
    lTSApt?: string,
    lTSAddress?: string,
    lTSDescription?: string,
}

