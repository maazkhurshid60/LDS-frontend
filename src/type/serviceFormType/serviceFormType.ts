import { maillingType } from "../maillingAddressType/maillingAddressType"

export interface serviceFormType{
    jobNo?:number
    name?:string
    isActive?:boolean
    inputDate?:string
    clientId?:string
    serviceType?:string
    caseNo: number
    caption: string
    lTServiceType: string
    otherLTServiceTypeData:any
    lTServiceDetail:lTServiceDetailtype
    noOfAddLMailings:number
    mailingAddresses:maillingType[]
    standardServiceType:string
    otherStandardServiceTypeData:any
    standardServiceDetail:standardServiceDetailType
}

export interface lTServiceDetailtype{
            fullName: string
        businessName: string
        address : string
        apt :string
        city: string
        state: string
        zip: string
        description:string     
}

export interface standardServiceDetailType{
    court:string
    defendants:string
    plaintiff:string
    country:string
    serveTo:serveToType
}

export interface serveToType{
    firstName:string
    address:string
    city:string
    state:string
    apt:string
    zip:string
}
