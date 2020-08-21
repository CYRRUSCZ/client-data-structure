import { getInstanceOfClass, getStringOrNull } from './helpers.js'
import Representative from './Representative.js'

export const PLAIN_OBJECT_KEY_IC = 'ic'
export const PLAIN_OBJECT_KEY_DIC = 'dic'
export const PLAIN_OBJECT_KEY_LEI = 'lei'
export const PLAIN_OBJECT_KEY_REPRESENTATIVES = 'representatives'
export const PLAIN_OBJECT_KEY_NAME = 'name'
export const PLAIN_OBJECT_KEY_TAX_DOMICILE = 'taxDomicile'

export default class CompanyInformation {
    constructor (
        {
            ic,
            dic,
            lei,
            taxDomicile,
            representatives,
            name
        } = {}
    ) {
        this._ic = getStringOrNull(ic)
        this._dic = getStringOrNull(dic)
        this._lei = getStringOrNull(lei)
        this._name = getStringOrNull(name)
        this._taxDomicile = getStringOrNull(taxDomicile)
        if (Array.isArray(representatives)) {
            this._representatives = []
            for (const data of representatives) {
                const entry = getInstanceOfClass(data, Representative)
                if (entry instanceof Representative) {
                    this._representatives.push(entry)
                }
            }
        } else {
            this._representatives = []
        }
    }

    static create (
        ic,
        dic,
        lei,
        taxDomicile,
        representatives,
        name
    ) {
        const plain = {}
        plain[PLAIN_OBJECT_KEY_IC] = ic
        plain[PLAIN_OBJECT_KEY_DIC] = dic
        plain[PLAIN_OBJECT_KEY_LEI] = lei
        plain[PLAIN_OBJECT_KEY_REPRESENTATIVES] = representatives
        plain[PLAIN_OBJECT_KEY_TAX_DOMICILE] = taxDomicile
        plain[PLAIN_OBJECT_KEY_NAME] = name
        return new CompanyInformation(plain)
    }

    get ic () {
        return this._ic
    }

    get dic () {
        return this._dic
    }

    get lei () {
        return this._lei
    }

    get address () {
        return this._address
    }

    get taxDomicile () {
        return this._taxDomicile
    }

    get representatives () {
        return this._representatives
    }

    get name () {
        return this._name
    }

    toJSON () {
        const plain = {}
        plain[PLAIN_OBJECT_KEY_IC] = this.ic
        plain[PLAIN_OBJECT_KEY_DIC] = this.dic
        plain[PLAIN_OBJECT_KEY_LEI] = this.lei
        plain[PLAIN_OBJECT_KEY_NAME] = this.name
        plain[PLAIN_OBJECT_KEY_TAX_DOMICILE] = this.taxDomicile
        const representatives = []
        for (const entry of this.representatives) {
            representatives.push(entry.toJSON())
        }
        plain[PLAIN_OBJECT_KEY_REPRESENTATIVES] = representatives
        return plain
    }

    toPlainObject () {
        return this.toJSON()
    }

    static fromPlainObject (object) {
        return new CompanyInformation(object)
    }
}
