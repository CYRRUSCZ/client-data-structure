import { getStringOrNull } from './helpers.js'

const CLIENT_TYPE_PERSON = 'person'
const CLIENT_TYPE_COMPANY = 'company'
const CLIENT_TYPE_SELFEMPLOYED = 'osvc'
const CLIENT_ORIGIN_INTERNAL = 'internal'
const CLIENT_ORIGIN_CAPITOL = 'capitol'
const CLIENT_ORIGIN_CRM = 'crm'
const CLIENT_ORIGIN_WEB = 'web'

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
            dataOriginId
        } = {}
    ) {
        this._type = getStringOrNull(type)
        this._dataOrigin = getStringOrNull(dataOrigin)
        this._dataOriginId = getStringOrNull(dataOriginId)
    }

    static create(
        type, 
        dataOrigin,
        dataOriginId
    ) {
        let plain = {
            type: type, 
            dataOrigin: dataOrigin,
            dataOriginId: dataOriginId
        }
        return new ClientInformation(plain)
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

    toJSON() {
        return {
            type: this.type(),
            dataOrigin: this.dataOrigin(),
            dataOriginId: this.dataOriginId()
        }
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