import { getStringOrNull } from './helpers.js'
import InvestmentProfile from './InvestmentProfile.js'

const CLIENT_TYPE_PERSON = 'person'
const CLIENT_TYPE_COMPANY = 'company'
const CLIENT_TYPE_SELFEMPLOYED = 'osvc'
const CLIENT_ORIGIN_INTERNAL = 'internal'
const CLIENT_ORIGIN_CAPITOL = 'capitol'
const CLIENT_ORIGIN_CRM = 'crm'
const CLIENT_ORIGIN_WEB = 'web'

const CLIENT_ORIGIN_NAMES = {
    internal: 'Interní DB',
    capitol: 'Capitol',
    crm: 'CRM',
    web: 'Web'
}

const CLIENT_TYPE_NAMES = {
    person: 'Fyzická osoba',
    company: 'Právnická osoba',
    osvc: 'OSVČ'
}

const CLIENT_TYPES = [
    CLIENT_TYPE_PERSON,
    CLIENT_TYPE_COMPANY,
    CLIENT_TYPE_SELFEMPLOYED
]

const CLIENT_ORIGINS = [
    CLIENT_ORIGIN_INTERNAL,
    CLIENT_ORIGIN_CAPITOL,
    CLIENT_ORIGIN_CRM,
    CLIENT_ORIGIN_WEB
]

export default class ClientInformation {
    constructor(
        {
            type, 
            dataOrigin,
            dataOriginId,
            capitolId,
            crmId,
            investmentProfiles = []
        } = {}
    ) {
        this._type = getStringOrNull(type)
        this._dataOrigin = getStringOrNull(dataOrigin)
        this._dataOriginId = getStringOrNull(dataOriginId)
        this._capitolId = getStringOrNull(capitolId)
        this._crmId = getStringOrNull(crmId)
        this._capitolId = capitolId
        this._crmId = crmId
        this._investmentProfiles = []
        if (Array.isArray(investmentProfiles)) {
            for (let profile of investmentProfiles) {
                this._investmentProfiles.push(new InvestmentProfile(profile))
            }
        }
    }

    static create(
        type, 
        dataOrigin,
        dataOriginId,
        capitolId,
        crmId,
        investmentProfiles = []
    ) {
        let plain = {
            type: type, 
            dataOrigin: dataOrigin,
            dataOriginId: dataOriginId,
            capitolId: capitolId,
            crmId: crmId,
            investmentProfiles: investmentProfiles
        }
        return new ClientInformation(plain)
    }

    get typeName() {
        return CLIENT_TYPE_NAMES[this._type]
    }

    get dataOriginName() {
        return CLIENT_ORIGIN_NAMES[this._dataOrigin]
    }

    get type() {
        return this._type
    }

    get dataOrigin() {
        return this._dataOrigin
    }

    get dataOriginId() {
        return this._dataOriginId
    }

    get capitolId() {
        return this._capitolId
    }

    get crmId() {
        return this._crmId
    }

    get investmentProfiles() {
        return this._investmentProfiles
    }

    toJSON() {
        let result = {
            type: this._type,
            dataOrigin: this._dataOrigin,
            dataOriginId: this._dataOriginId,
            capitolId: this._capitolId,
            crmId: this._crmId,
            investmentProfiles: []
        }
        for (let profile of this._investmentProfiles) {
            result.investmentProfiles.push(profile.toJSON())
        }
        return result
    }

    toPlainObject() {
        return this.toJSON()
    }

    static fromPlainObject(plainObject) {
        return new ClientInformation(plainObject)
    }

    static get CLIENT_TYPE_PERSON () {
        return CLIENT_TYPE_PERSON
    }

    static get CLIENT_TYPE_COMPANY () {
        return CLIENT_TYPE_COMPANY
    }

    static get CLIENT_TYPE_SELFEMPLOYED () {
        return CLIENT_TYPE_SELFEMPLOYED
    }
    
    static get CLIENT_ORIGIN_INTERNAL () {
        return CLIENT_ORIGIN_INTERNAL
    }
    
    static get CLIENT_ORIGIN_CAPITOL () {
        return CLIENT_ORIGIN_CAPITOL
    }
    
    static get CLIENT_ORIGIN_CRM () {
        return CLIENT_ORIGIN_CRM
    }
    
    static get CLIENT_ORIGIN_WEB () {
        return CLIENT_ORIGIN_WEB
    }

    static get CLIENT_TYPES () {
        return CLIENT_TYPES
    }

    static get CLIENT_ORIGINS () {
        return CLIENT_ORIGINS
    }
}