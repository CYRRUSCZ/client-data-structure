import { getStringOrNull, getValidDate } from './helpers'

/**
 * Input of the InvestmentService class that is used to create the object
 * @deprecated
 */
export interface InvestmentServiceInput {
    uid: string | null
    name: string | null
    added: Date | string | null
}

/**
 * Output of the InvestmentService class that is used to serialize the object to JSON
 * @deprecated
 */
export interface InvestmentServiceOutput {
    uid: string | null
    name: string | null
    added: Date | null
}

/**
 * Class that represents an investment profile service
 * @deprecated investment profiles are not used anymore
 */
export class InvestmentService {
    readonly #uid: string | null = null
    readonly #name: string | null = null
    readonly #added: Date = new Date()

    constructor (input: Partial<InvestmentServiceInput> = {}) {
        const {
            uid,
            name,
            added
        } = input
        this.#uid = getStringOrNull(uid)
        this.#name = getStringOrNull(name)
        this.#added = getValidDate(added)
    }

    /**
     * Create a new instance of the InvestmentService class using positional arguments
     *
     * @param uid unique identifier of the investment service
     * @param name name of the investment service
     * @param added date when the service was added
     * @deprecated
     */
    static create (
        uid: string | null | undefined,
        name: string | null | undefined,
        added: Date | string | null | undefined
    ): InvestmentService {
        const plain: Partial<InvestmentServiceInput> = {
            uid,
            name,
            added
        }
        return new InvestmentService(plain)
    }

    /**
     * Unique identifier of the investment service
     * @deprecated
     */
    get uid (): string | null {
        return this.#uid
    }

    /**
     * Name of the investment service
     * @deprecated
     */
    get name (): string | null {
        return this.#name
    }

    /**
     * Date when the service was added
     * @deprecated
     */
    get added (): Date {
        return this.#added
    }

    /**
     * Method that serializes the investment service to JSON
     * @deprecated
     */
    toJSON (): InvestmentServiceOutput {
        const plainObject: InvestmentServiceOutput = {
            uid: this.uid,
            name: this.name,
            added: this.added
        }
        return plainObject
    }

    /**
     * Method that converts a plain object to an InvestmentService object
     * @deprecated
     */
    toPlainObject (): InvestmentServiceOutput {
        return this.toJSON()
    }

    /**
     * Method that creates an InvestmentService object from a plain object
     *
     * @param plainObject the plain object that is used to create the InvestmentService object
     * @deprecated
     */
    static fromPlainObject (plainObject: Partial<InvestmentServiceOutput>): InvestmentService {
        return new InvestmentService(plainObject)
    }
}
