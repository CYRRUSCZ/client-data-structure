import { getInstanceOfClass, getStringOrNull } from './helpers'
import { Address, type AddressJSONSchema, type AddressInput, type AddressOutput } from './Address'
import { IdCardInformation, type IdCardInformationJSONSchema, type IdCardInformationInput, type IdCardInformationOutput } from './IdCardInformation'
import { PersonalInformation, type PersonalInformationJSONSchema, type PersonalInformationInput, type PersonalInformationOutput } from './PersonalInformation'
import { ContactInformation, type ContactInformationJSONSchema, type ContactInformationInput, type ContactInformationOutput } from './ContactInformation'
import { ClientData } from './ClientData'
import { AbstractBase, type JSONSchema, type JSONSchemaObject } from './AbstractBase'

export const PLAIN_OBJECT_KEY_POSITION = 'position'
export const PLAIN_OBJECT_KEY_ID = 'id'

/**
 * Input of the Representative class that is used to create the object
 */
export interface RepresentativeInput {
    personal: Partial<PersonalInformationInput>,
    position: string | null,
    address: Partial<AddressInput>,
    idCard: Partial<IdCardInformationInput>,
    id: string | null,
    contact: Partial<ContactInformationInput>,
    isRepresentative?: boolean,
    isRealOwner?: boolean,
    realOwnerReasonChar?: string | null,
    realOwnerReasonNumber?: string | null,
    capitolId?: string | null,
    capitolContactId?: string | null,
    hasPowerOfAttorney?: boolean
    _id?: string | null
}

/**
 * Output of the Representative class that is used to serialize the object to JSON
 */
export interface RepresentativeOutput {
    personal: PersonalInformationOutput,
    position: string | null,
    address: AddressOutput,
    idCard: IdCardInformationOutput,
    id: string | null,
    contact: ContactInformationOutput,
    isRepresentative: boolean,
    isRealOwner: boolean,
    realOwnerReasonChar: string | null,
    realOwnerReasonNumber: string | null,
    capitolId: string | null,
    capitolContactId: string | null,
    hasPowerOfAttorney: boolean
}

export interface RepresentativeJSONSchema extends JSONSchemaObject {
    type: 'object',
    properties: {
        personal: PersonalInformationJSONSchema,
        position: JSONSchema,
        address: AddressJSONSchema,
        idCard: IdCardInformationJSONSchema,
        id: JSONSchema,
        contact: ContactInformationJSONSchema,
        isRepresentative: JSONSchema,
        isRealOwner: JSONSchema,
        realOwnerReasonChar?: JSONSchema,
        realOwnerReasonNumber?: JSONSchema,
        capitolId: JSONSchema,
        capitolContactId: JSONSchema,
        hasPowerOfAttorney: JSONSchema
    }

    required: string[]
}

/**
 * Class that represents a representative of a company
 */
export class Representative extends AbstractBase {

    readonly #personal: PersonalInformation = new PersonalInformation()
    readonly #position: string | null = null
    readonly #address: Address = new Address()
    readonly #idCard: IdCardInformation = new IdCardInformation()
    readonly #id: string | null = null
    readonly #contact: ContactInformation = new ContactInformation()
    readonly #isRepresentative: boolean = false
    readonly #isRealOwner: boolean = false
    readonly #realOwnerReasonChar: string | null = null
    readonly #realOwnerReasonNumber: string | null = null
    readonly #capitolId: string | null = null
    readonly #capitolContactId: string | null = null
    readonly #hasPowerOfAttorney: boolean = false

    constructor (
        input: Partial<RepresentativeInput> = {}
    ) {
        super()
        const {
            personal,
            position,
            address,
            idCard,
            id,
            contact,
            isRepresentative,
            isRealOwner,
            realOwnerReasonChar,
            realOwnerReasonNumber,
            capitolId,
            capitolContactId,
            hasPowerOfAttorney,
            _id
        } = input
        this.#personal = getInstanceOfClass<PersonalInformation>(personal, PersonalInformation)
        this.#position = getStringOrNull(position)
        this.#address = getInstanceOfClass<Address>(address, Address)
        this.#idCard = getInstanceOfClass<IdCardInformation>(idCard, IdCardInformation)
        this.#contact = getInstanceOfClass<ContactInformation>(contact, ContactInformation)
        this.#id = (id) ? getStringOrNull(id) : getStringOrNull(_id)
        this.#isRealOwner = isRealOwner === true
        this.#realOwnerReasonChar = realOwnerReasonChar ?? null
        this.#realOwnerReasonNumber = realOwnerReasonNumber ?? null
        this.#capitolId = capitolId ?? null
        this.#isRepresentative = isRepresentative === true
        this.#hasPowerOfAttorney = hasPowerOfAttorney === true
        this.#capitolContactId = getStringOrNull(capitolContactId)
    }

    /**
     * Create a new instance of the Representative class using positional arguments
     *
     * @param personal personal information of the representative
     * @param position name of the position of the representative
     * @param address address of the representative
     * @param idCard id card information of the representative
     * @param id internal id of the representative
     * @param contact contact information of the representative
     * @param isRepresentative flag indicating that the representative is a representative of the company
     * @param isRealOwner flag indicating that the representative is a real owner of the company
     * @param realOwnerReasonChar paragraph character of the real owner reason
     * @param realOwnerReasonNumber paragraph number of the real owner reason
     * @param capitolId internal capitol id of the representative
     * @param capitolContactId internal capitol contact id of the representative
     * @param hasPowerOfAttorney flag indicating that the representative has a power of attorney
     */
    static create (
        personal: Partial<PersonalInformationInput> | undefined,
        position: string | null | undefined,
        address: Partial<AddressInput> | undefined,
        idCard: Partial<IdCardInformationInput> | undefined,
        id: string | null | undefined,
        contact: Partial<ContactInformationInput> | undefined,
        isRepresentative: boolean | undefined = true,
        isRealOwner: boolean | undefined = false,
        realOwnerReasonChar: string | null | undefined = null,
        realOwnerReasonNumber: string | null | undefined = null,
        capitolId: string | null | undefined = null,
        capitolContactId: string | null | undefined = null,
        hasPowerOfAttorney: boolean | undefined = false
    ): Representative {
        const plain: Partial<RepresentativeInput> = {
            isRepresentative,
            isRealOwner,
            realOwnerReasonChar,
            realOwnerReasonNumber,
            capitolId,
            capitolContactId,
            hasPowerOfAttorney,
            [ClientData.PLAIN_OBJECT_KEY_PERSONAL]: personal,
            [PLAIN_OBJECT_KEY_POSITION]: position,
            [ClientData.PLAIN_OBJECT_KEY_ID_CARD]: idCard,
            [ClientData.PLAIN_OBJECT_KEY_ADDRESS]: address,
            [PLAIN_OBJECT_KEY_ID]: id,
            [ClientData.PLAIN_OBJECT_KEY_CONTACT]: contact,
        }

        return new Representative(plain)
    }

    /**
     * Get the personal information of the representative
     */
    get personal (): PersonalInformation {
        return this.#personal
    }

    /**
     * Get the position of the representative
     */
    get position (): string | null {
        return this.#position
    }

    /**
     * Get the address of the representative
     */
    get idCard (): IdCardInformation {
        return this.#idCard
    }

    /**
     * Get the id of the representative
     */
    get id (): string | null {
        return this.#id
    }

    /**
     * Get the address information of the representative
     */
    get address (): Address {
        return this.#address
    }

    /**
     * Get the contact information of the representative
     */
    get contact (): ContactInformation {
        return this.#contact
    }

    /**
     * Flag indicating that the representative is a real owner of the company
     */
    get isRealOwner (): boolean {
        return this.#isRealOwner
    }

    /**
     * Get the paragraph character of the real owner reason
     */
    get realOwnerReasonChar (): string | null {
        return this.#realOwnerReasonChar
    }

    /**
     * Get the paragraph number of the real owner reason
     */
    get realOwnerReasonNumber (): string | null {
        return this.#realOwnerReasonNumber
    }

    /**
     * Get the internal capitol id of the representative
     */
    get capitolId (): string | null {
        return this.#capitolId
    }

    /**
     * Get the internal capitol contact id of the representative
     */
    get capitolContactId (): string | null {
        return this.#capitolContactId
    }

    /**
     * Flag indicating that the representative is a representative of the company
     */
    get isRepresentative (): boolean {
        return this.#isRepresentative
    }

    /**
     * Flag indicating that the representative has a power of attorney
     */
    get hasPowerOfAttorney (): boolean {
        return this.#hasPowerOfAttorney
    }

    /**
     * Converts the class to a plain object
     */
    toJSON (): RepresentativeOutput {
        const plain: RepresentativeOutput = {
            isRepresentative: this.#isRepresentative,
            isRealOwner: this.#isRealOwner,
            realOwnerReasonChar: this.#realOwnerReasonChar,
            realOwnerReasonNumber: this.#realOwnerReasonNumber,
            capitolId: this.#capitolId,
            capitolContactId: this.#capitolContactId,
            hasPowerOfAttorney: this.#hasPowerOfAttorney,
            [ClientData.PLAIN_OBJECT_KEY_PERSONAL]: this.personal.toJSON(),
            [PLAIN_OBJECT_KEY_POSITION]: this.position,
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
                personal: this.personal.toJSONSchema(),
                position: { type: 'string' },
                address: this.address.toJSONSchema(),
                idCard: this.idCard.toJSONSchema(),
                id: { type: 'string', nullable: true },
                contact: this.contact.toJSONSchema(),
                isRepresentative: { type: 'boolean' },
                isRealOwner: { type: 'boolean' },
                ...(this.#isRealOwner
                    ? {
                        realOwnerReasonChar: { type: 'string' },
                        realOwnerReasonNumber: { type: 'string' }
                    }
                    : {}
                ),
                capitolId: { type: 'string' },
                capitolContactId: { type: 'string' },
                hasPowerOfAttorney: { type: 'boolean' }
            },
            required: [
                'id',
                'personal',
                'address',
                'idCard',
                'contact',
                'isRepresentative',
                'isRealOwner',
                ...(this.#isRealOwner ? ['realOwnerReasonChar', 'realOwnerReasonNumber'] : []),
                'capitolId',
                'capitolContactId',
                'hasPowerOfAttorney'
            ]
        }
    }

    /**
     * Converts the class to a plain object
     */
    toPlainObject (): RepresentativeOutput {
        return this.toJSON()
    }

    /**
     * Create a new instance of the Representative class from a plain object
     */
    static fromPlainObject (plainObject: Partial<RepresentativeInput>): Representative {
        return new Representative(plainObject)
    }
}
