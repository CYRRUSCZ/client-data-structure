export interface ClientDataMapInterface {
    prenominal: string
    firstName: string
    lastName: string
    postnominal: string
    birthNumber: string
    dateOfBirth: string
    noBirthNumber: string
    birthNumberCountry: string
    taxDomicile: string
    placeOfBirth: string
    citizenship: string
    email: string
    phoneNumber: string
    phonePassword: string
    primaryAddressRecipient: string
    primaryAddressStreet: string
    primaryAddressCity: string
    primaryAddressPostalCode: string
    primaryAddressCountry: string
    mailingAddressRecipient: string
    mailingAddressStreet: string
    mailingAddressCity: string
    mailingAddressPostalCode: string
    mailingAddressCountry: string
    idCardNumber: string
    idCardIssuedBy: string
    idCardCountry: string
    idCardValidity: string
    type: string
    dataOrigin: string
    dataOriginId: string
    ic: string
    dic: string
    companyAddressRecipient: string
    companyAddressStreet: string
    companyAddressCity: string
    companyAddressPostalCode: string
    companyAddressCountry: string
}

type ClientDataMapKeys = keyof ClientDataMapInterface

export declare class ClientDataMap {
    private _map: ClientDataMapInterface

    constructor ()

    keys (): ClientDataMapKeys[]

    getMappedEntry (
        key: ClientDataMapKeys,
        clientData: Record<string, any>
    ): Record<string, any>
}
