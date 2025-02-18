import { AbstractBase, type JSONSchema, type JSONSchemaObject } from './AbstractBase'
import { getStringOrNull } from './helpers'
import { bankCodes } from '@cyrrus/locale-utils'
import { electronicFormatIBAN, isValidBIC, isValidIBAN } from 'ibantools'

/**
 * Input of the BankAccount class that is used to create the object
 */
export interface BankAccountInput {
    id: string | number | null
    prefix: string | null
    account: string | null
    code: string | null
    currency: string | null
    iban: string | null
    swift: string | null
    bankNameAddress: string | null
    accountName: string | null
    foreign?: boolean
    capitolId?: string | number | null
    _id?: string | null
}

/**
 * Output of the BankAccount class that is used to serialize the object to JSON
 */
export interface BankAccountOutput {
    id: string | null
    prefix: string | null
    account: string | null
    code: string | null
    currency: string | null
    iban: string | null
    swift: string | null
    bankNameAddress: string | null
    accountName: string | null
    foreign: boolean
    capitolId: string | number | null
}

export interface BankAccountJSONSchema extends JSONSchemaObject {
    type: 'object',
    properties: {
        foreign: JSONSchema,
        currency: JSONSchema,
        prefix?: JSONSchema,
        account?: JSONSchema,
        code?: JSONSchema,
        iban?: JSONSchema,
        swift?: JSONSchema,
        bankNameAddress?: JSONSchema,
        accountName?: JSONSchema
    }

    required: string[]
}

/**
 * Class that represents a bank account information
 */
export class BankAccount extends AbstractBase {
    readonly #id: string | null = null
    readonly #prefix: string | null = null
    readonly #account: string | null = null
    readonly #code: string | null = null
    readonly #currency: string | null = null
    readonly #iban: string | null = null
    readonly #swift: string | null = null
    readonly #bankNameAddress: string | null = null
    readonly #accountName: string | null = null
    readonly #foreign: boolean = false
    readonly #capitolId: string | number | null = null

    constructor (input: Partial<BankAccountInput> = {}) {
        super()
        const {
            id,
            prefix,
            account,
            code,
            currency,
            iban,
            swift,
            bankNameAddress,
            accountName,
            foreign,
            capitolId,
            _id
        } = input
        this.#prefix = getStringOrNull(prefix)
        this.#account = getStringOrNull(account)
        this.#code = getStringOrNull(code)
        this.#currency = getStringOrNull(currency)
        this.#iban = getStringOrNull(iban)
        this.#swift = getStringOrNull(swift)
        this.#bankNameAddress = getStringOrNull(bankNameAddress)
        this.#accountName = getStringOrNull(accountName)
        this.#foreign = (foreign === true)
        this.#id = (id !== undefined && id !== null) ? getStringOrNull(id) : getStringOrNull(_id)
        this.#capitolId = capitolId ?? null
    }

    /**
     * Static method that creates a BankAccount object from positional parameters
     *
     * @param id id of the bank account
     * @param prefix bank account prefix
     * @param account bank account number
     * @param code bank code
     * @param currency currency of the bank account
     * @param iban iban of the bank account if the bank account is foreign
     * @param swift swift code of the bank account if the bank account is foreign
     * @param bankNameAddress bank name and address if the bank account is foreign
     * @param accountName name of the account holder if the bank account is foreign
     * @param foreign flag that indicates if the bank account is foreign
     * @param capitolId id of the capitol bank account record
     */
    static create (
        id: string | number | null | undefined,
        prefix: string | null | undefined,
        account: string | null | undefined,
        code: string | null | undefined,
        currency: string | null | undefined,
        iban: string | null | undefined,
        swift: string | null | undefined,
        bankNameAddress: string | null | undefined,
        accountName: string | null | undefined,
        foreign: boolean | undefined = false,
        capitolId: string | number | null | undefined = null
    ): BankAccount {
        const plain: Partial<BankAccountInput> = {
            id,
            prefix,
            account,
            code,
            currency,
            iban,
            swift,
            bankNameAddress,
            accountName,
            foreign,
            capitolId
        }
        return new BankAccount(plain)
    }

    /**
     * The internal id of the bank account
     */
    get id (): string | null {
        return this.#id
    }

    /**
     * The prefix of the bank account
     */
    get prefix (): string | null {
        return this.#prefix
    }

    /**
     * The account number
     */
    get account (): string | null {
        return this.#account
    }

    /**
     * The bank code
     */
    get code (): string | null {
        return this.#code
    }

    /**
     * The name of the bank based on the bank code
     */
    get bankNameFromCode (): string | null {
        if (this.#code === null) {
            return null
        }
        return bankCodes[this.#code] ?? null
    }

    /**
     * The currency of the bank account
     */
    get currency (): string | null {
        return this.#currency
    }

    /**
     * The iban of the foreign bank account
     */
    get iban (): string | null {
        return this.#iban
    }

    /**
     * The swift code of the foreign bank account
     */
    get swift (): string | null {
        return this.#swift
    }

    /**
     * The name and address of the bank for foreign bank accounts
     */
    get bankNameAddress (): string | null {
        return this.#bankNameAddress
    }

    /**
     * The name of the account holder for foreign bank accounts
     */
    get accountName (): string | null {
        return this.#accountName
    }

    /**
     * Flag that indicates if the bank account is foreign
     */
    get foreign (): boolean {
        return this.#foreign
    }

    /**
     * The id of the capitol bank account record
     */
    get capitolId (): string | number | null {
        return this.#capitolId
    }

    /**
     * Converts the BankAccount object to a plain object
     */
    toJSON (): BankAccountOutput {
        return {
            id: this.#id,
            prefix: this.#prefix,
            account: this.#account,
            code: this.#code,
            currency: this.#currency,
            iban: this.#iban,
            swift: this.#swift,
            bankNameAddress: this.#bankNameAddress,
            accountName: this.#accountName,
            foreign: this.#foreign,
            capitolId: this.#capitolId
        }
    }

    // @TODO maybe add validation which checks first 2 letters of IBAN and tries to find
    // occurence in SWIFT country code part to validate they are compatible
    toJSONSchema (): BankAccountJSONSchema {
        const randomString = Math.random().toString(36).substring(7)

        return {
            type: 'object',
            properties: {
                currency: { type: 'string', enum: ['CZK', 'EUR', 'USD'] },
                foreign: { type: 'boolean' },
                ...(!this.#foreign ? {
                    prefix: { type: 'string', minLength: 6, maxLength: 6 },
                    account: { type: 'string', minLength: 10, maxLength: 10 },
                    code: { type: 'string' }
                } : {
                    iban: {
                        type: 'string',
                        ...(() => {
                            const invalidSchema = {
                                description: 'Internally validated IBAN',
                                pattern: `^Invalid IBAN guard, (${randomString})$`,
                            }

                            const iban = electronicFormatIBAN(this.#iban ?? '')
                            if (!iban) {
                                return invalidSchema
                            }

                            try {
                                const isValid = isValidIBAN(iban)
                                if (!isValid) {
                                    throw new Error('Invalid IBAN')
                                }

                                return { description: 'Internally validated IBAN' }
                            } catch (error) {
                                return invalidSchema
                            }
                        })()
                    },
                    swift: {
                        type: 'string',
                        ...(() => {
                            const invalidSchema = {
                                description: 'Internally validated SWIFT',
                                pattern: `^Invalid SWIFT guard, (${randomString})$`,
                            }
                            if (!this.#swift) {
                                return invalidSchema
                            }
                            try {
                                const isValid = isValidBIC(this.#swift)
                                if (!isValid) {
                                    throw new Error('Invalid SWIFT/BIC')
                                }

                                return { description: 'Internally validated SWIFT' }
                            } catch (error) {
                                return invalidSchema
                            }
                        })()
                    },
                    accountName: { type: 'string' },
                    bankNameAddress: { type: 'string' },
                })
            },
            required: [
                'foreign', 'currency',
                ...(!this.#foreign
                    ? ['prefix', 'account', 'code']
                    : ['iban', 'swift', 'bankNameAddress', 'accountName', ]
                )
            ]
        }
    }

    /**
     * Converts the BankAccount object to a plain object
     */
    toPlainObject (): BankAccountOutput {
        return this.toJSON()
    }

    /**
     * Creates a BankAccount object from a plain object
     *
     * @param plainObject the plain object that is used to create the BankAccount object
     */
    static fromPlainObject (plainObject: Partial<BankAccountInput>): BankAccount {
        return new BankAccount(plainObject)
    }
}
