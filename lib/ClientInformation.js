import { getStringOrNull } from './helpers.js'

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

    get type() {
        return this._type
    }

    get dataOrigin() {
        return this._dataOrigin
    }

    get dataOriginId() {
        return this._dataOriginId
    }

    static get PLAIN_OBJECT_KEY() {
        return 'client'
    }

    toJSON() {
        return {
            type: this.type, 
            dataOrigin: this.dataOrigin,
            dataOriginId: this.dataOriginId
        }
    }

    toPlainObject() {
        return this.toJSON()
    }

    static fromPlainObject(plainObject) {
        return new ClientInformation(plainObject)
    }
}