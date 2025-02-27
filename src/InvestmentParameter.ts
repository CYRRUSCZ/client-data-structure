import { AbstractBase, type JSONSchema, type JSONSchemaObject } from './AbstractBase'
import { getStringOrNull, getValidDate } from './helpers'

/**
 * Input of the InvestmentParameter class that is used to create the object
 */
export interface InvestmentParameterInput {
    version: string | null
    uid: string | null
    name: string | null
    added: Date | string | null
    value: string | null
    isInvestmentCategory: boolean
}

/**
 * Output of the InvestmentParameter class that is used to serialize the object to JSON
 */
export interface InvestmentParameterOutput {
    version: string | null
    uid: string | null
    name: string | null
    added: Date | null
    value: string | null
    isInvestmentCategory: boolean
}

export interface InvestmentParameterJSONSchema extends JSONSchemaObject {
    type: 'object'
    properties: {
        version: JSONSchema
        uid: JSONSchema
        name: JSONSchema
        added: JSONSchema
        value: JSONSchema
        isInvestmentCategory: JSONSchema
    }
    required: string[]
}

/**
 * Class that represents an investment parameter
 */
export class InvestmentParameter extends AbstractBase {
    readonly #version: string | null = null
    readonly #uid: string | null = null
    readonly #name: string | null = null
    readonly #added: Date = new Date()
    readonly #value: string | null = null
    readonly #isInvestmentCategory: boolean

    constructor (input: Partial<InvestmentParameterInput> = {}) {
        super()
        const {
            version,
            uid,
            name,
            added,
            value,
            isInvestmentCategory
        } = input
        this.#version = getStringOrNull(version)
        this.#uid = getStringOrNull(uid)
        this.#name = getStringOrNull(name)
        this.#added = getValidDate(added)
        this.#value = getStringOrNull(value)
        this.#isInvestmentCategory = isInvestmentCategory === true
    }

    /**
     * Create a new instance of the InvestmentParameter class using positional arguments
     *
     * @param version version of the investment questionaire evaluator
     * @param uid unique identifier of the investment parameter in the context of the version
     * @param name name of the investment parameter
     * @param added date of the investment parameter addition
     * @param value value of the investment parameter
     * @param isInvestmentCategory flag that indicates if the parameter is an investment category
     */
    static create (
        version: string | null | undefined,
        uid: string | null | undefined,
        name: string | null | undefined,
        added: Date | string | null | undefined,
        value: string | null | undefined,
        isInvestmentCategory: boolean | undefined
    ): InvestmentParameter {
        const plain: Partial<InvestmentParameterInput> = {
            version,
            uid,
            name,
            added,
            value,
            isInvestmentCategory
        }
        return new InvestmentParameter(plain)
    }

    /**
     * Unique identifier of the investment parameter
     */
    get uid (): string | null {
        return this.#uid
    }

    /**
     * Version of the investment questionaire evaluator
     */
    get version (): string | null {
        return this.#version
    }

    /**
     * Name of the investment parameter
     */
    get name (): string | null {
        return this.#name
    }

    /**
     * Date of the investment parameter addition
     */
    get added (): Date {
        return this.#added
    }

    /**
     * Value of the investment parameter
     */
    get value (): string | null {
        return this.#value
    }

    /**
     * Flag that indicates if the parameter is an investment category
     */
    get isInvestmentCategory (): boolean {
        return this.#isInvestmentCategory
    }

    /**
     * Converts the InvestmentParameter object to a plain object
     */
    toJSON (): InvestmentParameterOutput {
        const plainObject = {
            version: this.version,
            uid: this.uid,
            name: this.name,
            added: this.added,
            value: this.value,
            isInvestmentCategory: this.isInvestmentCategory
        }
        return plainObject
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this -- This method is required by the AbstractBase class
    toJSONSchema (): InvestmentParameterJSONSchema {
        return {
            type: 'object',
            properties: {
                version: { type: 'string' },
                uid: { type: 'string' },
                name: { type: 'string' },
                added: { type: 'string', format: 'date-time' },
                value: { type: 'string' },
                isInvestmentCategory: { type: 'boolean' }
            },
            required: ['version', 'uid', 'name', 'added', 'value', 'isInvestmentCategory']
        }
    }

    /**
     * Converts a plain object to an InvestmentParameter object
     */
    toPlainObject (): InvestmentParameterOutput {
        return this.toJSON()
    }

    /**
     * Creates an InvestmentParameter object from a plain object
     */
    static fromPlainObject (plainObject: Partial<InvestmentParameterInput>): InvestmentParameter {
        return new InvestmentParameter(plainObject)
    }
}
