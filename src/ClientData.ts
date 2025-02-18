import { AddressInformation, type AddressInformationInput, type AddressInformationOutput } from './AddressInformation'
import { ContactInformation, type ContactInformationInput, type ContactInformationOutput } from './ContactInformation'
import { PersonalInformation, type PersonalInformationInput, type PersonalInformationOutput } from './PersonalInformation'
import { ClientInformation, type ClientInformationInput, type ClientInformationOutput } from './ClientInformation'
import { IdCardInformation, type IdCardInformationInput, type IdCardInformationOutput } from './IdCardInformation'
import { CompanyInformation, type CompanyInformationInput, type CompanyInformationOutput } from './CompanyInformation'
import { BankAccount, type BankAccountInput, type BankAccountOutput } from './BankAccount'
import { getInstanceOfClass } from './helpers'
import { Address, type AddressInput } from '.'
import { AbstractBase, type JSONSchema, type JSONSchemaObject } from './AbstractBase'

export const PLAIN_OBJECT_KEY_CLIENT = 'client'
export const PLAIN_OBJECT_KEY_PERSONAL = 'personal'
export const PLAIN_OBJECT_KEY_ID_CARD = 'idCard'
export const PLAIN_OBJECT_KEY_CONTACT = 'contact'
export const PLAIN_OBJECT_KEY_BANK_ACCOUNTS = 'bankAccounts'
export const PLAIN_OBJECT_KEY_ADDRESS = 'address'
export const PLAIN_OBJECT_KEY_COMPANY = 'company'

export const PLAIN_OBJECT_KEYS = [
    PLAIN_OBJECT_KEY_CLIENT,
    PLAIN_OBJECT_KEY_PERSONAL,
    PLAIN_OBJECT_KEY_ID_CARD,
    PLAIN_OBJECT_KEY_CONTACT,
    PLAIN_OBJECT_KEY_BANK_ACCOUNTS,
    PLAIN_OBJECT_KEY_ADDRESS,
    PLAIN_OBJECT_KEY_COMPANY
]

/**
 * Input of the ClientData class that is used to create the object
 */
export interface ClientDataInput {
    client: Partial<ClientInformationInput>
    personal: Partial<PersonalInformationInput>
    idCard: Partial<IdCardInformationInput>
    address: Partial<AddressInformationInput>
    contact: Partial<ContactInformationInput>
    bankAccounts: Array<Partial<BankAccountInput>>
    company: Partial<CompanyInformationInput>
}

/**
 * Output of the ClientData class that is used to serialize the object to JSON
 */
export interface ClientDataOutput {
    client: ClientInformationOutput
    personal: PersonalInformationOutput
    idCard: IdCardInformationOutput
    address: AddressInformationOutput
    contact: ContactInformationOutput
    bankAccounts: BankAccountOutput[]
    company: CompanyInformationOutput
}

export interface ClientDataJSONSchema extends JSONSchemaObject {
    type: 'object'
    properties: {
        client: JSONSchema
        personal: JSONSchema
        idCard: JSONSchema
        address: JSONSchema
        contact: JSONSchema
        bankAccounts: JSONSchema
        company?: JSONSchema
    }
    required: string[]
}

/**
 * Class that represents the client data
 */
export class ClientData extends AbstractBase {
    readonly #client: ClientInformation = new ClientInformation()
    readonly #personal: PersonalInformation = new PersonalInformation()
    readonly #idCard: IdCardInformation = new IdCardInformation()
    readonly #address: AddressInformation = new AddressInformation()
    readonly #contact: ContactInformation = new ContactInformation()
    readonly #bankAccounts: BankAccount[] = []
    readonly #company: CompanyInformation = new CompanyInformation()

    constructor (
        input: Partial<ClientDataInput> = {}
    ) {
        super()
        const {
            client,
            personal,
            idCard,
            address,
            contact,
            bankAccounts,
            company
        } = input

        this.#client = getInstanceOfClass<ClientInformation>(client, ClientInformation)
        this.#personal = getInstanceOfClass<PersonalInformation>(personal, PersonalInformation)
        this.#address = getInstanceOfClass<AddressInformation>(address, AddressInformation)
        this.#idCard = getInstanceOfClass<IdCardInformation>(idCard, IdCardInformation)
        this.#contact = getInstanceOfClass<ContactInformation>(contact, ContactInformation)
        this.#bankAccounts = []
        if (Array.isArray(bankAccounts)) {
            for (const bankAccount of bankAccounts) {
                this.#bankAccounts.push((bankAccount instanceof BankAccount) ? bankAccount : getInstanceOfClass<BankAccount>(bankAccount, BankAccount))
            }
        }
        this.#company = getInstanceOfClass<CompanyInformation>(company, CompanyInformation)
    }

    /**
     * Create a new instance of the ClientData class using positional arguments
     *
     * @param client system information about the client
     * @param personal personal information of the client like the name, birth date, etc.
     * @param idCard information about the client's identification card
     * @param address information about the client's postal and residency address
     * @param contact information about the client's contact details, like email, phone number, etc.
     * @param bankAccounts list of bank accounts of the client
     * @param company information about the client's company and its representatives
     * @param regularAddress client's regular address
     * @param mailingAddress client's mailing address
     */
    static create (
        client: Partial<ClientInformationInput> | undefined,
        personal: Partial<PersonalInformationInput> | undefined,
        idCard: Partial<IdCardInformationInput> | undefined,
        address: Partial<AddressInformationInput> | undefined,
        contact: Partial<ContactInformationInput> | undefined,
        bankAccounts: Array<Partial<BankAccountInput>> | undefined,
        company: Partial<CompanyInformationInput> | undefined,
        regularAddress?: Partial<AddressInput>,
        mailingAddress?: Partial<AddressInput>
    ): ClientData {
        const passedAddress = new AddressInformation(address).toPlainObject()
        if (regularAddress) {
            passedAddress[AddressInformation.ADDRESS_TYPE_REGULAR] = new Address(regularAddress).toPlainObject()
        }
        if (mailingAddress) {
            passedAddress[AddressInformation.ADDRESS_TYPE_MAILING] = new Address(mailingAddress).toPlainObject()
        }
        address = passedAddress

        const plain: Partial<ClientDataInput> = {
            [PLAIN_OBJECT_KEY_CLIENT]: client,
            [PLAIN_OBJECT_KEY_PERSONAL]: personal,
            [PLAIN_OBJECT_KEY_ID_CARD]: idCard,
            [PLAIN_OBJECT_KEY_ADDRESS]: (address instanceof AddressInformation) ? address.toPlainObject() : address,
            [PLAIN_OBJECT_KEY_CONTACT]: contact,
            [PLAIN_OBJECT_KEY_BANK_ACCOUNTS]: bankAccounts,
            [PLAIN_OBJECT_KEY_COMPANY]: (company instanceof CompanyInformation) ? company.toPlainObject() : company
        }

        return new ClientData(plain)
    }

    /**
     * The system information about the client
     */
    get client (): ClientInformation {
        return this.#client
    }

    /**
     * The personal information of the client like the name, birth date, etc.
     */
    get personal (): PersonalInformation {
        return this.#personal
    }

    /**
     * Information about the client's identification card
     */
    get idCard (): IdCardInformation {
        return this.#idCard
    }

    /**
     * Information about the client's postal and residency address
     */
    get address (): AddressInformation {
        return this.#address
    }

    /**
     * Information about the client's contact details, like email, phone number, etc.
     */
    get contact (): ContactInformation {
        return this.#contact
    }

    /**
     * Information about the client's company and its representatives
     */
    get company (): CompanyInformation {
        return this.#company
    }

    /**
     * List of bank accounts of the client
     */
    get bankAccounts (): BankAccount[] {
        return this.#bankAccounts
    }

    /**
     * The full address of the client, respects the useMailingAddress flag
     */
    get fullAddress (): string {
        return this.address.useMailingAddress ? this.address.mailingAddress.fullAddress : this.address.address.fullAddress
    }

    /**
     * The contact email address of the client
     */
    get email (): string | null {
        return this.contact.email
    }

    /**
     * Name of the client, respects the client type and returns the company name if the client is a company
     */
    get fullName (): string | null {
        return (this.client.type !== ClientInformation.CLIENT_TYPE_COMPANY) ? this.personal.fullName : this.company.name
    }

    /**
     * name of the company
     */
    get companyName (): string | null {
        return this.company.name
    }

    /**
     * name of the data origin
     * @deprecated
     */
    get dataOriginName (): string | null {
        return this.client.dataOriginName
    }

    /**
     * name of the data origin
     */
    get typeName (): string | null {
        return this.client.typeName
    }

    /**
     * internal id of the client
     */
    get dataOriginId (): string | null {
        return this.client.dataOriginId
    }

    /**
     * data origin key of the client
     * @deprecated
     */
    get dataOrigin (): string | null {
        return this.client.dataOrigin
    }

    /**
     * type key of the client
     */
    get type (): string | null {
        return this.client.type
    }

    /**
     * flag indicating if the client is a company
     */
    get isCompany (): boolean {
        return this.client.type === ClientInformation.CLIENT_TYPE_COMPANY
    }

    /**
     * flag indicating if the client is a person
     */
    get isPerson (): boolean {
        return this.client.type === ClientInformation.CLIENT_TYPE_PERSON
    }

    /**
     * flag indicating if the client is self-employed
     */
    get isSelfemployed (): boolean {
        return this.client.type === ClientInformation.CLIENT_TYPE_SELFEMPLOYED
    }

    /**
     * converts the ClientData class to a plain object
     */
    toJSON (): ClientDataOutput {
        const plainObject: ClientDataOutput = {
            client: this.client.toPlainObject(),
            personal: this.personal.toPlainObject(),
            idCard: this.idCard.toPlainObject(),
            address: this.address.toPlainObject(),
            contact: this.contact.toPlainObject(),
            bankAccounts: this.bankAccounts.map((account) => account.toPlainObject()),
            company: this.company.toPlainObject()
        }
        return plainObject
    }

    toJSONSchema (): ClientDataJSONSchema {
        return {
            type: 'object',
            properties: {
                client: this.client.toJSONSchema(),
                personal: this.personal.toJSONSchema(),
                idCard: this.idCard.toJSONSchema(),
                address: this.address.toJSONSchema(),
                contact: this.contact.toJSONSchema(),
                bankAccounts: {
                    type: 'array',
                    items: {
                        allOf: this.#bankAccounts.map((account) => account.toJSONSchema())
                    }
                },
                ...(this.#company.toJSON().ic ? { company: this.company.toJSONSchema() } : {})
            },
            required: [
                PLAIN_OBJECT_KEY_CLIENT,
                PLAIN_OBJECT_KEY_PERSONAL,
                PLAIN_OBJECT_KEY_ID_CARD,
                PLAIN_OBJECT_KEY_ADDRESS,
                PLAIN_OBJECT_KEY_CONTACT,
                PLAIN_OBJECT_KEY_BANK_ACCOUNTS,
                ...(this.#company.toJSON().ic ? [PLAIN_OBJECT_KEY_COMPANY] : [])
            ]
        }
    }

    /**
     * converts the ClientData class to a plain object
     */
    toPlainObject (): ClientDataOutput {
        return this.toJSON()
    }

    /**
     * Create a new instance of the ClientData class from a plain object
     */
    static fromPlainObject (plainObject: Partial<ClientDataInput>): ClientData {
        return new ClientData(plainObject)
    }

    /**
     * The key of the client object in the plain object
     */
    static get PLAIN_OBJECT_KEY_CLIENT (): 'client' {
        return PLAIN_OBJECT_KEY_CLIENT
    }

    /**
     * The key of the personal object in the plain object
     */
    static get PLAIN_OBJECT_KEY_PERSONAL (): 'personal' {
        return PLAIN_OBJECT_KEY_PERSONAL
    }

    /**
     * The key of the id card object in the plain object
     */
    static get PLAIN_OBJECT_KEY_ID_CARD (): 'idCard' {
        return PLAIN_OBJECT_KEY_ID_CARD
    }

    /**
     * The key of the contact object in the plain object
     */
    static get PLAIN_OBJECT_KEY_CONTACT (): 'contact' {
        return PLAIN_OBJECT_KEY_CONTACT
    }

    /**
     * The key of the bank accounts object in the plain object
     */
    static get PLAIN_OBJECT_KEY_BANK_ACCOUNTS (): 'bankAccounts' {
        return PLAIN_OBJECT_KEY_BANK_ACCOUNTS
    }

    /**
     * The key of the address object in the plain object
     */
    static get PLAIN_OBJECT_KEY_ADDRESS (): 'address' {
        return PLAIN_OBJECT_KEY_ADDRESS
    }

    /**
     * The key of the company object in the plain object
     */
    static get PLAIN_OBJECT_KEY_COMPANY (): 'company' {
        return PLAIN_OBJECT_KEY_COMPANY
    }

    /**
     * The key of the postal address object in the plain object
     */
    static get ADDRESS_TYPE_MAILING (): 'mailingAddress' {
        return AddressInformation.ADDRESS_TYPE_MAILING
    }

    /**
     * The key of the residency address object in the plain object
     */
    static get ADDRESS_TYPE_REGULAR (): 'address' {
        return AddressInformation.ADDRESS_TYPE_REGULAR
    }

    /**
     * The type key of the person
     */
    static get CLIENT_TYPE_PERSON (): 'person' {
        return ClientInformation.CLIENT_TYPE_PERSON
    }

    /**
     * The type key of the company
     */
    static get CLIENT_TYPE_COMPANY (): 'company' {
        return ClientInformation.CLIENT_TYPE_COMPANY
    }

    /**
     * The type key of the self-employed
     */
    static get CLIENT_TYPE_SELFEMPLOYED (): 'osvc' {
        return ClientInformation.CLIENT_TYPE_SELFEMPLOYED
    }

    /**
     * The origin key of the internal client
     * @deprecated
     */
    static get CLIENT_ORIGIN_INTERNAL (): string {
        return ClientInformation.CLIENT_ORIGIN_INTERNAL
    }

    /**
     * The origin key of the capitol client
     * @deprecated
     */
    static get CLIENT_ORIGIN_CAPITOL (): string {
        return ClientInformation.CLIENT_ORIGIN_CAPITOL
    }

    /**
     * The origin key of the crm client
     * @deprecated
     */
    static get CLIENT_ORIGIN_CRM (): string {
        return ClientInformation.CLIENT_ORIGIN_CRM
    }

    /**
     * The origin key of the web client
     * @deprecated
     */
    static get CLIENT_ORIGIN_WEB (): string {
        return ClientInformation.CLIENT_ORIGIN_WEB
    }

    /**
     * The list of client types
     */
    static get CLIENT_TYPES (): string[] {
        return ClientInformation.CLIENT_TYPES
    }

    /**
     * The list of client origins
     * @deprecated
     */
    static get CLIENT_ORIGINS (): string[] {
        return ClientInformation.CLIENT_ORIGINS
    }
}
