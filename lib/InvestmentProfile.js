import { getStringOrNull, getValidDate, getInstanceOfClass } from './helpers.js'
import InvestmentService from './InvestmentService.js'

export default class InvestmentProfile {
    constructor (
        {
            version,
            uid,
            name,
            added,
            groupUid,
            services = [],
            weight = 0
        } = {}
    ) {
        this._version = getStringOrNull(version)
        this._uid = getStringOrNull(uid)
        this._name = getStringOrNull(name)
        this._added = getValidDate(added)
        this._groupUid = getStringOrNull(groupUid)
        this._services = []
        this._weight = weight
        if (Array.isArray(services)) {
            for (const service of services) {
                const instance = getInstanceOfClass(service, InvestmentService)
                if ((instance instanceof InvestmentService) && instance.uid !== null) {
                    this._services.push(instance)
                }
            }
        }
    }

    static create (
        version,
        uid,
        name,
        added,
        groupUid,
        services = [],
        weight = 0
    ) {
        const plain = {
            version: version,
            uid: uid,
            name: name,
            added: added,
            groupUid: groupUid,
            services: services,
            weight: weight
        }
        return new InvestmentProfile(plain)
    }

    get weight () {
        return this._weight
    }

    get uid () {
        return this._uid
    }

    get version () {
        return this._version
    }

    get name () {
        return this._name
    }

    get added () {
        return this._added
    }

    get services () {
        return this._services
    }

    get groupUid () {
        return this._groupUid
    }

    toJSON () {
        const plainObject = {
            version: this.version,
            uid: this.uid,
            name: this.name,
            added: this.added,
            groupUid: this.groupUid,
            services: [],
            weight: this.weight
        }
        for (const service of this.services) {
            plainObject.services.push(service.toJSON())
        }
        return plainObject
    }

    toPlainObject () {
        return this.toJSON()
    }

    removeService (service) {
        const serviceInstance = (!(service instanceof InvestmentService)) ? new InvestmentService(service) : service
        if (serviceInstance.uid === null) {
            throw new Error('Invalid investment service definition. Missing uid.')
        }
        this._services = this._services.filter((item) => {
            return (serviceInstance.uid !== item.uid)
        })
    }

    addService (service) {
        const serviceInstance = (!(service instanceof InvestmentService)) ? new InvestmentService(service) : service
        if (serviceInstance.uid === null) {
            throw new Error('Invalid investment service definition. Missing uid.')
        }
        this.removeService(serviceInstance)
        this._services.push(serviceInstance)
    }

    containsService (service) {
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

    static fromPlainObject (plainObject) {
        return new InvestmentProfile(plainObject)
    }
}
