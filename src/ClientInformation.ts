import { PartialDeep } from 'type-fest'
import { AbstractBase, type JSONSchema, type JSONSchemaObject } from './AbstractBase'
import { ClientDataDifference } from './ClientData'
import { getStringOrNull, getInstanceOfClass } from './helpers'
import { type InvestmentParameterOutput, type InvestmentParameterInput, InvestmentParameter } from './InvestmentParameter'

export const CLIENT_TYPE_PERSON = 'person'
export const CLIENT_TYPE_COMPANY = 'company'
export const CLIENT_TYPE_SELFEMPLOYED = 'selfemployed'

export const CLIENT_TYPE_NAMES: Record<string, string> = {
    person: 'Fyzická osoba',
    company: 'Právnická osoba',
    selfemployed: 'OSVČ'
}

export const CLIENT_TYPES: string[] = [
    CLIENT_TYPE_PERSON,
    CLIENT_TYPE_COMPANY,
    CLIENT_TYPE_SELFEMPLOYED
]

/**
 * Input of the ClientInformation class that is used to create the object
 */
export interface ClientInformationInput {
    type: string | null | undefined
    dataOrigin: string | null | undefined
    internalId: string | null | undefined
    contactId: string | null | undefined
    isResident: boolean
    economicalSectorCode: string | null | undefined
    brokerContactId: string | null | undefined
    externalBrokerContactId: string | null | undefined
    externalBrokerAgentContactId: string | null | undefined
    legislation: string | null | undefined
    preferredLanguage: string | null | undefined
    investmentParameters: Array<PartialDeep<InvestmentParameterInput>> | undefined
}

/**
 * Output of the ClientInformation class that is used to serialize the object to JSON
 */
export interface ClientInformationOutput {
    type: string | null
    dataOrigin: string | null
    internalId: string | null
    contactId: string | null
    isResident: boolean
    economicalSectorCode: string | null
    brokerContactId: string | null
    externalBrokerContactId: string | null
    externalBrokerAgentContactId: string | null
    legislation: string | null
    preferredLanguage: string | null | undefined
    investmentParameters: InvestmentParameterOutput[]
}

export interface ClientInformationJSONSchema extends JSONSchemaObject {
    type: 'object'
    properties: {
        type: JSONSchema
        isResident: JSONSchema
        economicalSectorCode: JSONSchema
        legislation: JSONSchema
        preferredLanguage: JSONSchema
        investmentParameters: JSONSchema
        dataOrigin?: JSONSchema
        internalId?: JSONSchema
        contactId?: JSONSchema
        brokerContactId?: JSONSchema
        externalBrokerContactId?: JSONSchema
        externalBrokerAgentContactId?: JSONSchema
    }
    required: string[]
}

/**
 * Class that represents the client system information
 */
export class ClientInformation extends AbstractBase {
    readonly #type: string | null = null
    readonly #dataOrigin: string | null = null
    readonly #internalId: string | null = null
    readonly #contactId: string | null = null
    readonly #isResident: boolean = false
    readonly #economicalSectorCode: string | null = null
    readonly #brokerContactId: string | null = null
    readonly #externalBrokerContactId: string | null = null
    readonly #externalBrokerAgentContactId: string | null = null
    readonly #legislation: string | null = null
    readonly #preferredLanguage: string | null = null
    #investmentParameters: InvestmentParameter[] = []

    constructor(
        input: PartialDeep<ClientInformationInput> = {}
    ) {
        super()
        const {
            type,
            dataOrigin,
            internalId,
            contactId,
            isResident,
            economicalSectorCode,
            brokerContactId,
            externalBrokerContactId,
            externalBrokerAgentContactId,
            legislation,
            preferredLanguage,
            investmentParameters
        } = input
        this.#type = getStringOrNull(type)
        this.#dataOrigin = getStringOrNull(dataOrigin)
        this.#internalId = getStringOrNull(internalId)
        this.#contactId = getStringOrNull(contactId)
        this.#isResident = isResident === true
        this.#economicalSectorCode = getStringOrNull(economicalSectorCode)
        this.#brokerContactId = getStringOrNull(brokerContactId)
        this.#externalBrokerContactId = getStringOrNull(externalBrokerContactId)
        this.#externalBrokerAgentContactId = getStringOrNull(externalBrokerAgentContactId)
        this.#legislation = getStringOrNull(legislation)
        this.#preferredLanguage = getStringOrNull(preferredLanguage)
        this.#investmentParameters = []

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
    static create(
        type: string | null | undefined,
        dataOrigin: string | null | undefined,
        internalId: string | null | undefined,
        contactId: string | null | undefined,
        isResident: boolean,
        economicalSectorCode: string | null | undefined,
        brokerContactId: string | null | undefined,
        externalBrokerContactId: string | null | undefined,
        externalBrokerAgentContactId: string | null | undefined,
        legislation: string | null | undefined,
        preferredLanguage: string | null | undefined,
        investmentParameters: Array<PartialDeep<InvestmentParameterInput>> | undefined = []
    ): ClientInformation {
        const plain: PartialDeep<ClientInformationInput> = {
            type,
            dataOrigin,
            internalId,
            contactId,
            isResident,
            economicalSectorCode,
            brokerContactId,
            externalBrokerContactId,
            externalBrokerAgentContactId,
            legislation,
            preferredLanguage,
            investmentParameters
        }
        return new ClientInformation(plain)
    }

    /**
     * legislation iso code
     */
    get legislation(): string | null {
        return this.#legislation
    }

    /**
     * preferred language
     */
    get preferredLanguage(): string | null {
        return this.#preferredLanguage
    }

    /**
     * external broker capitol id
     */
    get externalBrokerContactId(): string | null {
        return this.#externalBrokerContactId
    }

    /**
     * external broker agent capitol id
     */
    get externalBrokerAgentContactId(): string | null {
        return this.#externalBrokerAgentContactId
    }

    /**
     * name of type of the client
     */
    get typeName(): string | null {
        if (this.#type) {
            return CLIENT_TYPE_NAMES[this.#type] ?? null
        }
        return null
    }

    /**
     * economical sector code
     */
    get economicalSectorCode(): string | null {
        return this.#economicalSectorCode
    }

    /**
     * type of the client
     */
    get type(): string | null {
        return this.#type
    }

    /**
     * data origin
     */
    get dataOrigin(): string | null {
        return this.#dataOrigin
    }

    /**
     * internal id of the client
     */
    get internalId(): string | null {
        return this.#internalId
    }

    /**
     * internal capitol id of the client
     */
    get contactId(): string | null {
        return this.#contactId
    }

    /**
     * investment categories list
     */
    get investmentCategories(): InvestmentParameter[] {
        return this.#investmentParameters.filter(item => item.isInvestmentCategory)
    }

    /**
     * all investment parameters list
     */
    get investmentParameters(): InvestmentParameter[] {
        return this.#investmentParameters
    }

    /**
     * flag indicating that the client is a resident in the Czech Republic
     */
    get isResident(): boolean {
        return this.#isResident
    }

    /**
     * internal capitol user broker id - personal broker of the client
     */
    get brokerContactId(): string | null {
        return this.#brokerContactId
    }

    /**
     * Converts the ClientInformation object to a plain object
     */
    toJSON(): ClientInformationOutput {
        const result: ClientInformationOutput = {
            type: this.#type,
            dataOrigin: this.#dataOrigin,
            internalId: this.#internalId,
            contactId: this.#contactId,
            isResident: this.#isResident,
            economicalSectorCode: this.#economicalSectorCode,
            brokerContactId: this.#brokerContactId,
            externalBrokerContactId: this.#externalBrokerContactId,
            externalBrokerAgentContactId: this.#externalBrokerAgentContactId,
            legislation: this.#legislation,
            preferredLanguage: this.#preferredLanguage,
            investmentParameters: this.#investmentParameters.map(parameter => parameter.toJSON())
        }
        return result
    }

    toJSONSchema(): ClientInformationJSONSchema {
        return {
            type: 'object',
            properties: {
                type: { type: 'string', enum: CLIENT_TYPES },
                isResident: { type: 'boolean' },
                economicalSectorCode: { type: 'string' },
                legislation: { type: 'string' },
                preferredLanguage: { type: 'string', nullable: true },
                investmentParameters: { type: 'array', items: InvestmentParameter.prototype.toJSONSchema() },
                // Added missing optional system properties (bug 8)
                dataOrigin: { type: 'string', nullable: true },
                internalId: { type: 'string', nullable: true },
                contactId: { type: 'string', nullable: true },
                brokerContactId: { type: 'string', nullable: true },
                externalBrokerContactId: { type: 'string', nullable: true },
                externalBrokerAgentContactId: { type: 'string', nullable: true }
            },
            required: [
                // Removed non-existent 'bankAccountsConfirmedByAffidavit' (bug 1)
                'type', 'isResident', 'economicalSectorCode', 'legislation', 'investmentParameters'
            ]
        }
    }

    /**
     * Converts a plain object to a ClientInformation object
     */
    toPlainObject(): ClientInformationOutput {
        return this.toJSON()
    }

    /**
     * remove specific investment parameter
     */
    removeParameter(parameter: PartialDeep<InvestmentParameterInput>): void {
        const parameterInstance = (!(parameter instanceof InvestmentParameter)) ? new InvestmentParameter(parameter) : parameter
        if (parameterInstance.uid === null) {
            throw new Error('Invalid investment parameter definition. Missing uid.')
        }
        this.#investmentParameters = this.#investmentParameters.filter(item => (parameterInstance.uid !== item.uid))
    }

    /**
     * add investment parameter
     */
    addParameter(parameter: PartialDeep<InvestmentParameterInput>): void {
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
    containsParameter(parameter: PartialDeep<InvestmentParameterInput>): boolean {
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
     * create instance of the ClientInformation class from the output object
     */
    static fromPlainObject(plainObject: PartialDeep<ClientInformationInput>): ClientInformation {
        return new ClientInformation(plainObject)
    }

    /**
     * constant for the person client type
     */
    static get CLIENT_TYPE_PERSON(): 'person' {
        return CLIENT_TYPE_PERSON
    }

    /**
     * constant for the company client type
     */
    static get CLIENT_TYPE_COMPANY(): 'company' {
        return CLIENT_TYPE_COMPANY
    }

    /**
     * constant for the self-employed client type
     */
    static get CLIENT_TYPE_SELFEMPLOYED(): 'selfemployed' {
        return CLIENT_TYPE_SELFEMPLOYED
    }

    /**
     * constant for the client types
     */
    static get CLIENT_TYPES(): string[] {
        return CLIENT_TYPES
    }

    compareWith(clientInformation: PartialDeep<ClientInformationOutput>): ClientDataDifference[] {
        const differences: ClientDataDifference[] = []
        const ownKeys = Object.keys(this.toJSON())
        const currentEntries = Object.entries(this.toJSON())
        const passedEntries = Object.entries(clientInformation).filter(([key, value]) => value !== undefined && ownKeys.includes(key))
        for (const [modifiedKey, modifiedValue] of passedEntries) {
            const current = currentEntries.find(([currentKey]) => currentKey === modifiedKey)
            if (current) {
                const [, currentValue] = current
                if (modifiedKey === 'investmentParameters') {
                    if (!Array.isArray(modifiedValue)) {
                        continue
                    }
                    for (const param of modifiedValue) {
                        const matchingParam = (currentValue as InvestmentParameterOutput[]).find(item => item.uid === param.uid)
                        if (!matchingParam) {
                            differences.push(...Object.entries(param).map(([key, value]) => ({
                                path: `investmentParameters.[${param.uid}].${key}`,
                                originalValue: null,
                                changedValue: value,
                                uniqueIdProp: 'uid'
                            })))
                        } else {
                            differences.push(...new InvestmentParameter(matchingParam).compareWith(param).map(difference => ({
                                ...difference,
                                path: `investmentParameters.[${param.uid}].${difference.path}`
                            })))
                        }
                    }
                    continue
                }
                if (currentValue !== modifiedValue) {
                    differences.push({
                        path: modifiedKey,
                        originalValue: currentValue,
                        changedValue: modifiedValue
                    })
                }
            }
        }
        return differences
    }
}
