import { getStringOrNull, getValidDate, getInstanceOfClass } from './helpers'
import { InvestmentService, type InvestmentServiceInput, type InvestmentServiceOutput } from './InvestmentService'

/**
 * Input of the InvestmentProfile class that is used to create the object
 * @deprecated
 */
export interface InvestmentProfileInput {
    version: string | null
    uid: string | null
    name: string | null
    added: Date | string | null
    groupUid: string | null
    services: Array<InvestmentService | Partial<InvestmentServiceInput>>
    weight: number
}

/**
 * Output of the InvestmentProfile class that is used to serialize the object to JSON
 * @deprecated
 */
export interface InvestmentProfileOutput {
    version: string | null
    uid: string | null
    name: string | null
    added: Date | null
    groupUid: string | null
    services: InvestmentServiceOutput[]
    weight: number
}

/**
 * Class that represents an investment profile
 * @deprecated investment profiles are not used anymore
 */
export class InvestmentProfile {
    readonly #version: string | null = null
    readonly #uid: string | null = null
    readonly #name: string | null = null
    readonly #added: Date = new Date()
    readonly #groupUid: string | null = null
    #services: InvestmentService[] = []
    readonly #weight: number = 0

    constructor (input: Partial<InvestmentProfileInput> = {}) {
        const {
            version,
            uid,
            name,
            added,
            groupUid,
            services = [],
            weight
        } = input

        this.#version = getStringOrNull(version)
        this.#uid = getStringOrNull(uid)
        this.#name = getStringOrNull(name)
        this.#added = getValidDate(added)
        this.#groupUid = getStringOrNull(groupUid)
        this.#services = []
        this.#weight = isNaN(Number(weight)) ? 0 : Number(weight)

        if (Array.isArray(services)) {
            for (const service of services) {
                const instance = getInstanceOfClass(service, InvestmentService)
                if ((instance instanceof InvestmentService) && instance.uid !== null) {
                    this.#services.push(instance)
                }
            }
        }
    }

    /**
     * Create a new instance of the InvestmentProfile class using positional arguments
     *
     * @param version version of the investment questionaire evaluator
     * @param uid unique identifier of the investment profile in the context of the version
     * @param name name of the investment profile
     * @param added date when the investment profile was added
     * @param groupUid unique identifier of the investment profile group
     * @param services list of investment services that are part of the investment profile
     * @param weight weight of the investment profile
     * @deprecated
     */
    static create (
        version: string | null | undefined,
        uid: string | null | undefined,
        name: string | null | undefined,
        added: Date | string | null | undefined,
        groupUid: string | null | undefined,
        services: Array<InvestmentService | Partial<InvestmentServiceInput>> = [],
        weight: number | null | undefined = 0
    ): InvestmentProfile {
        const plain: Partial<InvestmentProfileInput> = {
            version,
            uid,
            name,
            added,
            groupUid,
            services,
            weight: weight ?? 0
        }
        return new InvestmentProfile(plain)
    }

    /**
     * Weight of the investment profile
     * @deprecated
     */
    get weight (): number {
        return this.#weight
    }

    /**
     * Unique identifier of the investment profile
     * @deprecated
     */
    get uid (): string | null {
        return this.#uid
    }

    /**
     * Version of the investment questionaire evaluator
     * @deprecated
     */
    get version (): string | null {
        return this.#version
    }

    /**
     * Name of the investment profile
     * @deprecated
     */
    get name (): string | null {
        return this.#name
    }

    /**
     * Date when the investment profile was added
     * @deprecated
     */
    get added (): Date {
        return this.#added
    }

    /**
     * List of investment services that are part of the investment profile
     * @deprecated
     */
    get services (): InvestmentService[] {
        return this.#services
    }

    /**
     * Unique identifier of the investment profile group
     * @deprecated
     */
    get groupUid (): string | null {
        return this.#groupUid
    }

    /**
     * Converts the InvestmentProfile object to a plain object
     * @deprecated
     */
    toJSON (): InvestmentProfileOutput {
        const plainObject = {
            version: this.version,
            uid: this.uid,
            name: this.name,
            added: this.added,
            groupUid: this.groupUid,
            services: this.services.map((entry) => entry.toJSON()),
            weight: this.weight
        }
        return plainObject
    }

    /**
     * Converts the InvestmentProfile object to a plain object
     * @deprecated
     */
    toPlainObject (): InvestmentProfileOutput {
        return this.toJSON()
    }

    /**
     * Method that removes a service from the investment profile
     *
     * @param service investment service that should be removed
     * @deprecated
     */
    removeService (service: InvestmentService | Partial<InvestmentServiceInput>): void {
        const serviceInstance = (!(service instanceof InvestmentService)) ? new InvestmentService(service) : service
        if (serviceInstance.uid === null) {
            throw new Error('Invalid investment service definition. Missing uid.')
        }
        this.#services = this.#services.filter((item) => (serviceInstance.uid !== item.uid))
    }

    /**
     * Method that adds a service to the investment profile
     *
     * @param service investment service that should be added
     * @deprecated
     */
    addService (service: InvestmentService | Partial<InvestmentServiceInput>): void {
        const serviceInstance = (!(service instanceof InvestmentService)) ? new InvestmentService(service) : service
        if (serviceInstance.uid === null) {
            throw new Error('Invalid investment service definition. Missing uid.')
        }
        this.removeService(serviceInstance)
        this.#services.push(serviceInstance)
    }

    /**
     * Method that checks if the investment profile contains a specific service
     *
     * @param service investment service that should be checked
     * @deprecated
     */
    containsService(service: InvestmentService | Partial<InvestmentServiceInput>): boolean {
        const serviceInstance = (!(service instanceof InvestmentService)) ? new InvestmentService(service) : service
        if (serviceInstance.uid === null) {
            throw new Error('Invalid investment service definition. Missing uid.')
        }
        for (const item of this.services) {
            if (item.uid === serviceInstance.uid) {
                return true
            }
        }
        return false
    }

    /**
     * Static method that creates an InvestmentProfile object from a plain object
     *
     * @param plainObject - Partial<InvestmentProfileInput> object that is used to create the InvestmentProfile instance
     * @deprecated
     */
    static fromPlainObject (plainObject: Partial<InvestmentProfileInput>): InvestmentProfile {
        return new InvestmentProfile(plainObject)
    }
}
