import { AbstractBase, type JSONSchema, type JSONSchemaObject } from './AbstractBase'
import { getStringOrNull, getInstanceOfClass } from './helpers'
import { type InvestmentParameterOutput , type InvestmentParameterInput , InvestmentParameter } from './InvestmentParameter'
import { type InvestmentProfileInput , type InvestmentProfileOutput , InvestmentProfile } from './InvestmentProfile'
import { InvestmentService } from './InvestmentService'

export const CLIENT_TYPE_PERSON = 'person'
export const CLIENT_TYPE_COMPANY = 'company'
export const CLIENT_TYPE_SELFEMPLOYED = 'osvc'
export const CLIENT_ORIGIN_INTERNAL = 'internal'
export const CLIENT_ORIGIN_CAPITOL = 'capitol'
export const CLIENT_ORIGIN_CRM = 'crm'
export const CLIENT_ORIGIN_WEB = 'web'

export const CLIENT_ORIGIN_NAMES: Record<string, string> = {
    internal: 'Interní DB',
    capitol: 'Capitol',
    crm: 'CRM',
    web: 'Web'
}

export const CLIENT_TYPE_NAMES: Record<string, string> = {
    person: 'Fyzická osoba',
    company: 'Právnická osoba',
    osvc: 'OSVČ'
}

export const CLIENT_TYPES: string[] = [
    CLIENT_TYPE_PERSON,
    CLIENT_TYPE_COMPANY,
    CLIENT_TYPE_SELFEMPLOYED
]

export const CLIENT_ORIGINS: string[] = [
    CLIENT_ORIGIN_INTERNAL,
    CLIENT_ORIGIN_CAPITOL,
    CLIENT_ORIGIN_CRM,
    CLIENT_ORIGIN_WEB
]

/**
 * Input of the ClientInformation class that is used to create the object
 */
export interface ClientInformationInput {
    type: string | null | undefined,
    dataOrigin: string | null | undefined,
    dataOriginId: string | null | undefined,
    capitolId: string | null | undefined,
    crmId: string | null | undefined,
    investmentProfiles: Array<Partial<InvestmentProfileInput>> | undefined,
    residency: boolean | null | undefined,
    economicalSectorCode: string | null | undefined,
    brokerId: string | null | undefined,
    externalBrokerCapitolId: string | null | undefined,
    externalBrokerAgentCapitolId: string | null | undefined,
    legislation: string | null | undefined,
    investmentParameters: Array<Partial<InvestmentParameterInput>> | undefined,
    bankAccountsConfirmedByAffidavit: boolean | null | undefined
}

/**
 * Output of the ClientInformation class that is used to serialize the object to JSON
 */
export interface ClientInformationOutput {
    type: string | null,
    dataOrigin: string | null,
    dataOriginId: string | null,
    capitolId: string | null,
    crmId: string | null,
    investmentProfiles: InvestmentProfileOutput[],
    residency: boolean,
    economicalSectorCode: string | null,
    brokerId: string | null,
    externalBrokerCapitolId: string | null,
    externalBrokerAgentCapitolId: string | null,
    legislation: string | null,
    investmentParameters: InvestmentParameterOutput[],
    bankAccountsConfirmedByAffidavit: boolean
}

export interface ClientInformationJSONSchema extends JSONSchemaObject {
    type: 'object',
    properties: {
        type: JSONSchema,
        dataOrigin: JSONSchema,
        dataOriginId: JSONSchema,
        capitolId: JSONSchema,
        crmId: JSONSchema,
        investmentProfiles: JSONSchema,
        residency: JSONSchema,
        economicalSectorCode: JSONSchema,
        brokerId: JSONSchema,
        externalBrokerCapitolId: JSONSchema,
        externalBrokerAgentCapitolId: JSONSchema,
        legislation: JSONSchema,
        investmentParameters: JSONSchema,
        bankAccountsConfirmedByAffidavit: JSONSchema
    }
    required: string[]
}

/**
 * Class that represents the client system information
 */
export class ClientInformation extends AbstractBase {
    readonly #type: string | null = null
    readonly #dataOrigin: string | null = null
    readonly #dataOriginId: string | null = null
    readonly #capitolId: string | null = null
    readonly #crmId: string | null = null
    #investmentProfiles: InvestmentProfile[] = []
    readonly #residency: boolean = false
    readonly #economicalSectorCode: string | null = null
    readonly #brokerId: string | null = null
    readonly #externalBrokerCapitolId: string | null = null
    readonly #externalBrokerAgentCapitolId: string | null = null
    readonly #legislation: string | null = null
    #investmentParameters: InvestmentParameter[] = []
    readonly #bankAccountsConfirmedByAffidavit: boolean = false

    constructor (
        input: Partial<ClientInformationInput> = {}
    ) {
        super()
        const {
            type,
            dataOrigin,
            dataOriginId,
            capitolId,
            crmId,
            investmentProfiles,
            residency,
            economicalSectorCode,
            brokerId,
            externalBrokerCapitolId,
            externalBrokerAgentCapitolId,
            legislation,
            investmentParameters,
            bankAccountsConfirmedByAffidavit
        } = input
        this.#type = getStringOrNull(type)
        this.#dataOrigin = getStringOrNull(dataOrigin)
        this.#dataOriginId = getStringOrNull(dataOriginId)
        this.#capitolId = getStringOrNull(capitolId)
        this.#crmId = getStringOrNull(crmId)
        this.#capitolId = getStringOrNull(capitolId)
        this.#crmId = getStringOrNull(crmId)
        this.#investmentProfiles = []
        this.#residency = residency === true
        this.#economicalSectorCode = getStringOrNull(economicalSectorCode)
        this.#brokerId = getStringOrNull(brokerId)
        this.#externalBrokerCapitolId = getStringOrNull(externalBrokerCapitolId)
        this.#externalBrokerAgentCapitolId = getStringOrNull(externalBrokerAgentCapitolId)
        this.#legislation = getStringOrNull(legislation)
        this.#investmentParameters = []
        this.#bankAccountsConfirmedByAffidavit = bankAccountsConfirmedByAffidavit === true

        if (Array.isArray(investmentProfiles)) {
            for (const profile of investmentProfiles) {
                const instance = getInstanceOfClass<InvestmentProfile>(profile, InvestmentProfile)
                if ((instance instanceof InvestmentProfile) && instance.uid) {
                    this.#investmentProfiles.push(instance)
                }
            }
        }

        if (Array.isArray(investmentParameters)) {
            for (const parameter of investmentParameters) {
                const instance = getInstanceOfClass<InvestmentParameter>(parameter, InvestmentParameter)
                if (instance instanceof InvestmentParameter && instance.uid) {
                    this.#investmentParameters.push(instance)
                }
            }
        }
    }

    /**
     * Create a new instance of the ClientInformation class using positional arguments
     */
    static create (
        type: string | null | undefined,
        dataOrigin: string | null | undefined,
        dataOriginId: string | null | undefined,
        capitolId: string | null | undefined,
        crmId: string | null | undefined,
        investmentProfiles: Array<Partial<InvestmentProfileInput>> | undefined = [],
        residency: boolean | null | undefined,
        economicalSectorCode: string | null | undefined,
        brokerId: string | null | undefined,
        externalBrokerCapitolId: string | null | undefined,
        externalBrokerAgentCapitolId: string | null | undefined,
        legislation: string | null | undefined,
        investmentParameters: Array<Partial<InvestmentParameterInput>> | undefined = [],
        bankAccountsConfirmedByAffidavit: boolean | undefined = false
    ): ClientInformation {
        const plain: Partial<ClientInformationInput> = {
            type,
            dataOrigin,
            dataOriginId,
            capitolId,
            crmId,
            investmentProfiles,
            residency,
            economicalSectorCode,
            brokerId,
            externalBrokerCapitolId,
            externalBrokerAgentCapitolId,
            legislation,
            investmentParameters,
            bankAccountsConfirmedByAffidavit
        }
        return new ClientInformation(plain)
    }

    /**
     * legislation country code
     */
    get legislation (): string | null {
        return this.#legislation
    }

    /**
     * external broker capitol id
     */
    get externalBrokerCapitolId (): string | null {
        return this.#externalBrokerCapitolId
    }

    /**
     * external broker agent capitol id
     */
    get externalBrokerAgentCapitolId (): string | null {
        return this.#externalBrokerAgentCapitolId
    }

    /**
     * name of type of the client
     */
    get typeName (): string | null {
        if (this.#type) {
            return CLIENT_TYPE_NAMES[this.#type] ?? null
        }
        return null
    }

    /**
     * name of the data origin
     * @deprecated
     */
    get dataOriginName (): string | null {
        if (this.#dataOrigin) {
            return CLIENT_ORIGIN_NAMES[this.#dataOrigin] ?? null
        }
        return null
    }

    /**
     * economical sector code
     */
    get economicalSectorCode (): string | null {
        return this.#economicalSectorCode
    }

    /**
     * type of the client
     */
    get type (): string | null {
        return this.#type
    }

    /**
     * data origin
     * @deprecated
     */
    get dataOrigin (): string | null {
        return this.#dataOrigin
    }

    /**
     * data origin id - internal id of the client
     */
    get dataOriginId (): string | null {
        return this.#dataOriginId
    }

    /**
     * internal capitol id of the client
     */
    get capitolId (): string | null {
        return this.#capitolId
    }

    /**
     * internal dynamics crm id of the client
     */
    get crmId (): string | null {
        return this.#crmId
    }

    /**
     * investment profiles list
     * @deprecated
     */
    get investmentProfiles (): InvestmentProfile[] {
        return this.#investmentProfiles
    }

    /**
     * investment categories list
     */
    get investmentCategories (): InvestmentParameter[] {
        return this.#investmentParameters.filter(item => item.isInvestmentCategory)
    }

    /**
     * all investment parameters list
     */
    get investmentParameters (): InvestmentParameter[] {
        return this.#investmentParameters
    }

    /**
     * flag indicating that the client is a resident in the Czech Republic
     */
    get residency (): boolean {
        return this.#residency
    }

    /**
     * internal capitol user broker id - personal broker of the client
     */
    get brokerId (): string | null {
        return this.#brokerId
    }

    /**
     * flag indicating that the client has confirmed bank accounts by affidavit
     */
    get bankAccountsConfirmedByAffidavit (): boolean {
        return this.#bankAccountsConfirmedByAffidavit
    }

    /**
     * Converts the ClientInformation object to a plain object
     */
    toJSON (): ClientInformationOutput {
        const result: ClientInformationOutput = {
            type: this.#type,
            dataOrigin: this.#dataOrigin,
            dataOriginId: this.#dataOriginId,
            capitolId: this.#capitolId,
            crmId: this.#crmId,
            investmentProfiles: this.#investmentProfiles.map((profile) => profile.toJSON()),
            residency: this.#residency,
            economicalSectorCode: this.#economicalSectorCode,
            brokerId: this.#brokerId,
            externalBrokerCapitolId: this.#externalBrokerCapitolId,
            externalBrokerAgentCapitolId: this.#externalBrokerAgentCapitolId,
            legislation: this.#legislation,
            investmentParameters: this.#investmentParameters.map((parameter) => parameter.toJSON()),
            bankAccountsConfirmedByAffidavit: this.#bankAccountsConfirmedByAffidavit
        }
        return result
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this -- This method is required by the AbstractBase class
    toJSONSchema (): ClientInformationJSONSchema {
        return {
            type: 'object',
            properties: {
                type: { type: 'string', enum: CLIENT_TYPES },
                dataOrigin: { type: 'string', enum: CLIENT_ORIGINS },
                dataOriginId: { type: 'string' },
                capitolId: { type: 'string' },
                crmId: { type: 'string' },
                investmentProfiles: { type: 'array', items: InvestmentProfile.prototype.toJSONSchema() },
                residency: { type: 'boolean' },
                economicalSectorCode: { type: 'string' },
                brokerId: { type: 'string' },
                externalBrokerCapitolId: { type: 'string' },
                externalBrokerAgentCapitolId: { type: 'string' },
                legislation: { type: 'string' },
                investmentParameters: { type: 'array', items: InvestmentParameter.prototype.toJSONSchema() },
                bankAccountsConfirmedByAffidavit: { type: 'boolean' }
            },
            required: [
                'type', 'dataOrigin', 'dataOriginId', 'capitolId', 'crmId',
                'investmentProfiles', 'residency', 'economicalSectorCode',
                'brokerId', 'externalBrokerCapitolId', 'externalBrokerAgentCapitolId',
                'legislation', 'investmentParameters', 'bankAccountsConfirmedByAffidavit'
            ]
        }
    }

    /**
     * Converts a plain object to a ClientInformation object
     */
    toPlainObject (): ClientInformationOutput {
        return this.toJSON()
    }

    /**
     * get group of investment profiles
     * @param groupUid uid of the group
     * @deprecated
     */
    getProfilesGroup (groupUid: string): InvestmentProfile[] {
        if (!groupUid) {
            return []
        }
        return this.#investmentProfiles.filter((instance) => (groupUid === instance.groupUid))
    }

    /**
     * remove group of investment profiles
     * @param groupUid uid of the group
     * @return removed profiles
     * @deprecated
     */
    removeProfilesGroup (groupUid: string): InvestmentProfile[] {
        const removedProfiles: InvestmentProfile[] = []
        if (groupUid) {
            this.#investmentProfiles = this.#investmentProfiles.filter((instance) => {
                if (groupUid === instance.groupUid) {
                    removedProfiles.push(instance)
                    return false
                }
                return true
            })
        }
        return removedProfiles
    }

    /**
     * replace group of investment profiles
     * @param groupUid uid of the group
     * @param profilesArray array of profiles
     * @deprecated
     */
    replaceProfilesGroup (groupUid: string, profilesArray: Array<Partial<InvestmentProfileInput>>): void {
        const sanitized = []
        for (const item of profilesArray) {
            const instance = (item instanceof InvestmentProfile) ? item : new InvestmentProfile(item)
            if (instance.uid === null || instance.groupUid !== groupUid) {
                throw new Error('Invalid profile in passed profilesArray, bad uid or mismatched groupUid.')
            }
            sanitized.push(instance)
        }
        this.removeProfilesGroup(groupUid)
        for (const profile of sanitized) {
            this.addProfile(profile)
        }
    }

    /**
     * remove specific investment profile
     * @deprecated
     */
    removeProfile (profile: Partial<InvestmentProfileInput>): void {
        const profileInstance = (!(profile instanceof InvestmentProfile)) ? new InvestmentProfile(profile) : profile
        if (profileInstance.uid === null) {
            throw new Error('Invalid investment profile definition. Missing uid.')
        }
        this.#investmentProfiles = this.#investmentProfiles.filter((item) => (profileInstance.uid !== item.uid))
    }

    /**
     * add investment profile
     * @deprecated
     */
    addProfile (profile: Partial<InvestmentProfileInput>): void {
        const profileInstance = (!(profile instanceof InvestmentProfile)) ? new InvestmentProfile(profile) : profile
        if (profileInstance.uid === null) {
            throw new Error('Invalid investment profile definition. Missing uid.')
        }
        this.removeProfile(profileInstance)
        this.#investmentProfiles.push(profileInstance)
    }

    /**
     * check if the client has specific investment profile
     */
    containsProfile (profile: Partial<InvestmentProfileInput>): boolean {
        const profileInstance = (!(profile instanceof InvestmentProfile)) ? new InvestmentProfile(profile) : profile
        if (profileInstance.uid === null) {
            throw new Error('Invalid investment profile definition. Missing uid.')
        }
        for (const item of this.investmentProfiles) {
            if (item.uid === profileInstance.uid) {
                return true
            }
        }
        return false
    }

    /**
     * remove specific investment parameter
     */
    removeParameter (parameter: Partial<InvestmentParameterInput>): void {
        const parameterInstance = (!(parameter instanceof InvestmentParameter)) ? new InvestmentParameter(parameter) : parameter
        if (parameterInstance.uid === null) {
            throw new Error('Invalid investment parameter definition. Missing uid.')
        }
        this.#investmentParameters = this.#investmentParameters.filter((item) => (parameterInstance.uid !== item.uid))
    }

    /**
     * add investment parameter
     */
    addParameter (parameter: Partial<InvestmentParameterInput>): void {
        const parameterInstance = (!(parameter instanceof InvestmentParameter)) ? new InvestmentParameter(parameter) : parameter
        if (parameterInstance.uid === null) {
            throw new Error('Invalid investment parameter definition. Missing uid.')
        }
        this.removeParameter(parameterInstance)
        this.#investmentParameters.push(parameterInstance)
    }

    /**
     * check if the client has specific investment parameter
     */
    containsParameter (parameter: Partial<InvestmentParameterInput>): boolean {
        const parameterInstance = (!(parameter instanceof InvestmentParameter)) ? new InvestmentParameter(parameter) : parameter
        if (parameterInstance.uid === null) {
            throw new Error('Invalid investment parameter definition. Missing uid.')
        }
        for (const item of this.investmentParameters) {
            if (item.uid === parameterInstance.uid) {
                return true
            }
        }
        return false
    }

    /**
     * check if the client has specific investment service
     * @deprecated
    */
    hasInvestmentService (serviceUid: string): boolean {
        const service = new InvestmentService({ uid: serviceUid })
        if (serviceUid) {
            for (const profile of this.investmentProfiles) {
                if (profile.containsService(service)) {
                    return true
                }
            }
        }
        return false
    }

    /**
     * create instance of the ClientInformation class from the output object
     */
    static fromPlainObject (plainObject: Partial<ClientInformationInput>): ClientInformation {
        return new ClientInformation(plainObject)
    }

    /**
     * constant for the person client type
     */
    static get CLIENT_TYPE_PERSON (): 'person' {
        return CLIENT_TYPE_PERSON
    }

    /**
     * constant for the company client type
     */
    static get CLIENT_TYPE_COMPANY (): 'company' {
        return CLIENT_TYPE_COMPANY
    }

    /**
     * constant for the self-employed client type
     */
    static get CLIENT_TYPE_SELFEMPLOYED (): 'osvc' {
        return CLIENT_TYPE_SELFEMPLOYED
    }

    /**
     * constant for the internal data origin
     */
    static get CLIENT_ORIGIN_INTERNAL (): string {
        return CLIENT_ORIGIN_INTERNAL
    }

    /**
     * constant for the capitol data origin
     */
    static get CLIENT_ORIGIN_CAPITOL (): string {
        return CLIENT_ORIGIN_CAPITOL
    }

    /**
     * constant for the crm data origin
     */
    static get CLIENT_ORIGIN_CRM (): string {
        return CLIENT_ORIGIN_CRM
    }

    /**
     * constant for the web data origin
     */
    static get CLIENT_ORIGIN_WEB (): string {
        return CLIENT_ORIGIN_WEB
    }

    /**
     * constant for the client types
     */
    static get CLIENT_TYPES (): string[] {
        return CLIENT_TYPES
    }

    /**
     * constant for the client origins
     * @deprecated
     */
    static get CLIENT_ORIGINS (): string[] {
        return CLIENT_ORIGINS
    }
}
