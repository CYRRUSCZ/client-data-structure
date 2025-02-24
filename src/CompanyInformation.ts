import { AbstractBase, type JSONSchemaObject, type JSONSchema } from './AbstractBase'
import { getInstanceOfClass, getStringOrNull } from './helpers'
import { Representative, type RepresentativeInput, type RepresentativeOutput } from './Representative'

export const PLAIN_OBJECT_KEY_IC = 'ic'
export const PLAIN_OBJECT_KEY_DIC = 'dic'
export const PLAIN_OBJECT_KEY_LEI = 'lei'
export const PLAIN_OBJECT_KEY_REPRESENTATIVES = 'representatives'
export const PLAIN_OBJECT_KEY_NAME = 'name'
export const PLAIN_OBJECT_KEY_TAX_DOMICILE = 'taxDomicile'

/**
 * Input of the CompanyInformation class that is used to create the object
 */
export interface CompanyInformationInput {
    ic: string | null,
    dic: string | null,
    lei: string | null,
    taxDomicile: string | null,
    representatives: Array<Partial<RepresentativeInput>>,
    name: string | null
}

/**
 * Output of the CompanyInformation class that is used to serialize the object to JSON
 */
export interface CompanyInformationOutput {
    ic: string | null,
    dic: string | null,
    lei: string | null,
    taxDomicile: string | null,
    representatives: RepresentativeOutput[],
    name: string | null
}

export interface CompanyInformationJSONSchema extends JSONSchemaObject {
    type: 'object',
    properties: {
        ic: JSONSchema,
        dic: JSONSchema,
        lei: JSONSchema,
        taxDomicile: JSONSchema,
        representatives: JSONSchema,
        name: JSONSchema
    }
    required: string[]
}

/**
 * Class that represents the company information and its representatives
 */
export class CompanyInformation extends AbstractBase {
    readonly #ic: string | null = null
    readonly #dic: string | null = null
    readonly #lei: string | null = null
    readonly #name: string | null = null
    readonly #taxDomicile: string | null = null
    readonly #representatives: Representative[] = []

    constructor (
        input: Partial<CompanyInformationInput> = {}
    ) {
        super()
        const {
            ic,
            dic,
            lei,
            taxDomicile,
            representatives,
            name
        } = input
        this.#ic = getStringOrNull(ic)
        this.#dic = getStringOrNull(dic)
        this.#lei = getStringOrNull(lei)
        this.#name = getStringOrNull(name)
        this.#taxDomicile = getStringOrNull(taxDomicile)
        if (Array.isArray(representatives)) {
            for (const data of representatives) {
                const entry = getInstanceOfClass<Representative>(data, Representative)
                if (entry instanceof Representative) {
                    this.#representatives.push(entry)
                }
            }
        }
    }

    /**
     * Create a new instance of the CompanyInformation class
     *
     * @param ic company identification number
     * @param dic VAT identification number
     * @param lei LEI idenfication number
     * @param taxDomicile country of tax domicile
     * @param representatives list of representatives
     * @param name name of the company
     */
    static create (
        ic: string | null | undefined,
        dic: string | null | undefined,
        lei: string | null | undefined,
        taxDomicile: string | null | undefined,
        representatives: Array<Partial<RepresentativeInput>>,
        name: string | null | undefined
    ): CompanyInformation {
        const plain: Partial<CompanyInformationInput> = {
            [PLAIN_OBJECT_KEY_IC]: ic,
            [PLAIN_OBJECT_KEY_DIC]: dic,
            [PLAIN_OBJECT_KEY_LEI]: lei,
            [PLAIN_OBJECT_KEY_REPRESENTATIVES]: representatives,
            [PLAIN_OBJECT_KEY_TAX_DOMICILE]: taxDomicile,
            [PLAIN_OBJECT_KEY_NAME]: name
        }

        return new CompanyInformation(plain)
    }

    /**
     * company identification number
     */
    get ic (): string | null {
        return this.#ic
    }

    /**
     * VAT identification number
     */
    get dic (): string | null {
        return this.#dic
    }

    /**
     * LEI idenfication number
     */
    get lei (): string | null {
        return this.#lei
    }

    /**
     * country of tax domicile
     */
    get taxDomicile (): string | null {
        return this.#taxDomicile
    }

    /**
     * list of representatives
     */
    get representatives (): Representative[] {
        return this.#representatives
    }

    /**
     * name of the company
     */
    get name (): string | null {
        return this.#name
    }

    /**
     * Convert the class to plain object
     */
    toJSON (): CompanyInformationOutput {
        const plain: CompanyInformationOutput = {
            [PLAIN_OBJECT_KEY_IC]: this.ic,
            [PLAIN_OBJECT_KEY_DIC]: this.dic,
            [PLAIN_OBJECT_KEY_LEI]: this.lei,
            [PLAIN_OBJECT_KEY_NAME]: this.name,
            [PLAIN_OBJECT_KEY_TAX_DOMICILE]: this.taxDomicile,
            [PLAIN_OBJECT_KEY_REPRESENTATIVES]: this.representatives.map((entry) => entry.toJSON())
        }
        return plain
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this -- This method is required by the AbstractBase class
    toJSONSchema (): CompanyInformationJSONSchema {
        return {
            type: 'object',
            properties: {
                [PLAIN_OBJECT_KEY_IC]: {
                    type: 'string'
                },
                [PLAIN_OBJECT_KEY_DIC]: {
                    type: 'string',
                    nullable: true
                },
                [PLAIN_OBJECT_KEY_LEI]: {
                    type: 'string',
                },
                [PLAIN_OBJECT_KEY_NAME]: {
                    type: 'string'
                },
                [PLAIN_OBJECT_KEY_TAX_DOMICILE]: {
                    type: 'string'
                },
                [PLAIN_OBJECT_KEY_REPRESENTATIVES]: {
                    type: 'array',
                    items: Representative.prototype.toJSONSchema()
                }
            },
            required: [
                PLAIN_OBJECT_KEY_IC,
                PLAIN_OBJECT_KEY_DIC,
                PLAIN_OBJECT_KEY_LEI,
                PLAIN_OBJECT_KEY_NAME,
                PLAIN_OBJECT_KEY_TAX_DOMICILE,
                PLAIN_OBJECT_KEY_REPRESENTATIVES
            ]
        }
    }

    /**
     * Convert the class to plain object
     */
    toPlainObject (): CompanyInformationOutput {
        return this.toJSON()
    }

    /**
     * Create a new instance of the CompanyInformation class from a plain object
     */
    static fromPlainObject (plainObject: Partial<CompanyInformationInput>): CompanyInformation {
        return new CompanyInformation(plainObject)
    }
}
