import { getInstanceOfClass, getStringOrNull } from './helpers'
import { Address, type AddressJSONSchema, type AddressInput, type AddressOutput } from './Address'
import { IdCardInformation, type IdCardInformationJSONSchema, type IdCardInformationInput, type IdCardInformationOutput } from './IdCardInformation'
import { PersonalInformation, type PersonalInformationJSONSchema, type PersonalInformationInput, type PersonalInformationOutput } from './PersonalInformation'
import { ClientData } from './ClientData'
import { AbstractBase, type JSONSchema, type JSONSchemaObject } from './AbstractBase'
import { ContactInformation, ContactInformationInput, ContactInformationJSONSchema, ContactInformationOutput } from './ContactInformation'

export const PLAIN_OBJECT_KEY_ID = 'id'

/**
 * Input of the Representative class that is used to create the object
 */
export interface RepresentativeInput {
    personal: Partial<PersonalInformationInput>
    address: Partial<AddressInput>
    idCard: Partial<IdCardInformationInput>
    id: string | null
    contact: Partial<ContactInformationInput>
    isRepresentative?: boolean
    isRealOwner?: boolean
    realOwnerReasonChar?: string | null
    realOwnerReasonNumber?: string | null
    cytronId?: string | null
    contactId?: string | null
    hasPowerOfAttorney?: boolean
    _id?: string | null
}

/**
 * Output of the Representative class that is used to serialize the object to JSON
 */
export interface RepresentativeOutput {
    personal: PersonalInformationOutput
    address: AddressOutput
    idCard: IdCardInformationOutput
    id: string | null
    contact: ContactInformationOutput
    isRepresentative: boolean
    isRealOwner: boolean
    realOwnerReasonChar: string | null
    realOwnerReasonNumber: string | null
    cytronId: string | null
    contactId: string | null
    hasPowerOfAttorney: boolean
}

export interface RepresentativeJSONSchema extends JSONSchemaObject {
    type: 'object'
    properties: {
        personal: PersonalInformationJSONSchema
        address: AddressJSONSchema
        idCard: IdCardInformationJSONSchema
        id: JSONSchema
        contact: ContactInformationJSONSchema
        isRepresentative: JSONSchema
        isRealOwner: JSONSchema
        hasPowerOfAttorney: JSONSchema
    }
    if: {
        properties: {
            isRealOwner: {
                const: true
            }
        }
    }
    then: {
        properties: {
            realOwnerReasonChar: JSONSchema
            realOwnerReasonNumber: JSONSchema
        }
        required: string[]
    }
    required: string[]
}

/**
 * Class that represents a representative of a company
 */
export class Representative extends AbstractBase {
    readonly #personal: PersonalInformation = new PersonalInformation()
    readonly #address: Address = new Address()
    readonly #idCard: IdCardInformation = new IdCardInformation()
    readonly #id: string | null = null
    readonly #contact: ContactInformation = new ContactInformation()
    readonly #isRepresentative: boolean = false
    readonly #isRealOwner: boolean = false
    readonly #realOwnerReasonChar: string | null = null
    readonly #realOwnerReasonNumber: string | null = null
    readonly #cytronId: string | null = null
    readonly #contactId: string | null = null
    readonly #hasPowerOfAttorney: boolean = false

    constructor(
        input: Partial<RepresentativeInput> = {}
    ) {
        super()
        const {
            personal,
            address,
            idCard,
            id,
            contact,
            isRepresentative,
            isRealOwner,
            realOwnerReasonChar,
            realOwnerReasonNumber,
            cytronId,
            contactId,
            hasPowerOfAttorney,
            _id
        } = input
        this.#personal = getInstanceOfClass<PersonalInformation>(personal, PersonalInformation)
        this.#address = getInstanceOfClass<Address>(address, Address)
        this.#idCard = getInstanceOfClass<IdCardInformation>(idCard, IdCardInformation)
        this.#contact = getInstanceOfClass<ContactInformation>(contact, ContactInformation)
        this.#id = (id) ? getStringOrNull(id) : getStringOrNull(_id)
        this.#isRealOwner = isRealOwner === true
        this.#realOwnerReasonChar = realOwnerReasonChar ?? null
        this.#realOwnerReasonNumber = realOwnerReasonNumber ?? null
        this.#cytronId = cytronId ?? null
        this.#isRepresentative = isRepresentative === true
        this.#hasPowerOfAttorney = hasPowerOfAttorney === true
        this.#contactId = getStringOrNull(contactId)
    }

    /**
     * Create a new instance of the Representative class using positional arguments
     *
     * @param personal personal information of the representative
     * @param address address of the representative
     * @param idCard id card information of the representative
     * @param id internal id of the representative
     * @param contact contact information of the representative
     * @param isRepresentative flag indicating that the representative is a representative of the company
     * @param isRealOwner flag indicating that the representative is a real owner of the company
     * @param realOwnerReasonChar paragraph character of the real owner reason
     * @param realOwnerReasonNumber paragraph number of the real owner reason
     * @param cytronId internal cytron id of the representative
     * @param contactId internal cytron contact id of the representative
     * @param hasPowerOfAttorney flag indicating that the representative has a power of attorney
     */
    static create(
        personal: Partial<PersonalInformationInput> | undefined,
        address: Partial<AddressInput> | undefined,
        idCard: Partial<IdCardInformationInput> | undefined,
        id: string | null | undefined,
        contact: Partial<ContactInformationInput> | undefined,
        isRepresentative: boolean | undefined = true,
        isRealOwner: boolean | undefined = false,
        realOwnerReasonChar: string | null | undefined = null,
        realOwnerReasonNumber: string | null | undefined = null,
        cytronId: string | null | undefined = null,
        contactId: string | null | undefined = null,
        hasPowerOfAttorney: boolean | undefined = false
    ): Representative {
        const plain: Partial<RepresentativeInput> = {
            isRepresentative,
            isRealOwner,
            realOwnerReasonChar,
            realOwnerReasonNumber,
            cytronId,
            contactId,
            hasPowerOfAttorney,
            [ClientData.PLAIN_OBJECT_KEY_PERSONAL]: personal,
            [ClientData.PLAIN_OBJECT_KEY_ID_CARD]: idCard,
            [ClientData.PLAIN_OBJECT_KEY_ADDRESS]: address,
            [PLAIN_OBJECT_KEY_ID]: id,
            [ClientData.PLAIN_OBJECT_KEY_CONTACT]: contact
        }

        return new Representative(plain)
    }

    /**
     * Get the personal information of the representative
     */
    get personal(): PersonalInformation {
        return this.#personal
    }

    /**
     * Get the address of the representative
     */
    get idCard(): IdCardInformation {
        return this.#idCard
    }

    /**
     * Get the id of the representative
     */
    get id(): string | null {
        return this.#id
    }

    /**
     * Get the address information of the representative
     */
    get address(): Address {
        return this.#address
    }

    /**
     * Get the contact information of the representative
     */
    get contact(): ContactInformation {
        return this.#contact
    }

    /**
     * Flag indicating that the representative is a real owner of the company
     */
    get isRealOwner(): boolean {
        return this.#isRealOwner
    }

    /**
     * Get the paragraph character of the real owner reason
     */
    get realOwnerReasonChar(): string | null {
        return this.#realOwnerReasonChar
    }

    /**
     * Get the paragraph number of the real owner reason
     */
    get realOwnerReasonNumber(): string | null {
        return this.#realOwnerReasonNumber
    }

    /**
     * Get the internal cytron id of the representative
     */
    get cytronId(): string | null {
        return this.#cytronId
    }

    /**
     * Get the internal cytron contact id of the representative
     */
    get contactId(): string | null {
        return this.#contactId
    }

    /**
     * Flag indicating that the representative is a representative of the company
     */
    get isRepresentative(): boolean {
        return this.#isRepresentative
    }

    /**
     * Flag indicating that the representative has a power of attorney
     */
    get hasPowerOfAttorney(): boolean {
        return this.#hasPowerOfAttorney
    }

    /**
     * Converts the class to a plain object
     */
    toJSON(): RepresentativeOutput {
        const plain: RepresentativeOutput = {
            isRepresentative: this.#isRepresentative,
            isRealOwner: this.#isRealOwner,
            realOwnerReasonChar: this.#realOwnerReasonChar,
            realOwnerReasonNumber: this.#realOwnerReasonNumber,
            cytronId: this.#cytronId,
            contactId: this.#contactId,
            hasPowerOfAttorney: this.#hasPowerOfAttorney,
            [ClientData.PLAIN_OBJECT_KEY_PERSONAL]: this.personal.toJSON(),
            [ClientData.PLAIN_OBJECT_KEY_ID_CARD]: this.idCard.toJSON(),
            [ClientData.PLAIN_OBJECT_KEY_ADDRESS]: this.address.toJSON(),
            [PLAIN_OBJECT_KEY_ID]: this.id,
            [ClientData.PLAIN_OBJECT_KEY_CONTACT]: this.contact.toJSON()
        }
        return plain
    }

    toJSONSchema(): RepresentativeJSONSchema {
        return {
            type: 'object',
            properties: {
                id: { type: 'string', nullable: true },
                isRepresentative: { type: 'boolean' },
                isRealOwner: { type: 'boolean' },
                hasPowerOfAttorney: { type: 'boolean' },
                personal: PersonalInformation.prototype.toJSONSchema(),
                address: Address.prototype.toJSONSchema(),
                idCard: IdCardInformation.prototype.toJSONSchema(),
                contact: ContactInformation.prototype.toJSONSchema()
            },
            if: {
                properties: {
                    isRealOwner: {
                        const: true
                    }
                }
            },
            then: {
                properties: {
                    realOwnerReasonChar: { type: 'string' },
                    realOwnerReasonNumber: { type: 'string' }
                },
                required: ['realOwnerReasonChar', 'realOwnerReasonNumber']
            },
            required: [
                'id',
                'personal',
                'address',
                'idCard',
                'contact',
                'isRepresentative',
                'isRealOwner',
                'hasPowerOfAttorney'
            ]
        }
    }

    /**
     * Converts the class to a plain object
     */
    toPlainObject(): RepresentativeOutput {
        return this.toJSON()
    }

    /**
     * Create a new instance of the Representative class from a plain object
     */
    static fromPlainObject(plainObject: Partial<RepresentativeInput>): Representative {
        return new Representative(plainObject)
    }
}
