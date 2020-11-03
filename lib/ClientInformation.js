import { getStringOrNull, getInstanceOfClass } from './helpers.js'
import InvestmentProfile from './InvestmentProfile.js'
import InvestmentService from './InvestmentService.js'

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
    constructor (
        {
            type,
            dataOrigin,
            dataOriginId,
            capitolId,
            crmId,
            investmentProfiles = [],
            residency = true,
            economicalSectorCode,
            brokerId,
            externalBrokerCapitolId,
            externalBrokerAgentCapitolId
        } = {}
    ) {
        this._type = getStringOrNull(type)
        this._dataOrigin = getStringOrNull(dataOrigin)
        this._dataOriginId = getStringOrNull(dataOriginId)
        this._capitolId = getStringOrNull(capitolId)
        this._crmId = getStringOrNull(crmId)
        this._capitolId = getStringOrNull(capitolId)
        this._crmId = getStringOrNull(crmId)
        this._investmentProfiles = []
        this._residency = residency === true
        this._economicalSectorCode = getStringOrNull(economicalSectorCode)
        this._brokerId = getStringOrNull(brokerId)
        this._externalBrokerCapitolId = getStringOrNull(externalBrokerCapitolId)
        this._externalBrokerAgentCapitolId = getStringOrNull(externalBrokerAgentCapitolId)

        if (Array.isArray(investmentProfiles)) {
            for (const profile of investmentProfiles) {
                const instance = getInstanceOfClass(profile, InvestmentProfile)
                if ((instance instanceof InvestmentProfile) && instance.uid !== null) {
                    this._investmentProfiles.push(instance)
                }
            }
        }
    }

    static create (
        type,
        dataOrigin,
        dataOriginId,
        capitolId,
        crmId,
        investmentProfiles = [],
        residency,
        economicalSectorCode,
        brokerId,
        externalBrokerCapitolId,
        externalBrokerAgentCapitolId
    ) {
        const plain = {
            type: type,
            dataOrigin: dataOrigin,
            dataOriginId: dataOriginId,
            capitolId: capitolId,
            crmId: crmId,
            investmentProfiles: investmentProfiles,
            residency: residency,
            economicalSectorCode: economicalSectorCode,
            brokerId: brokerId,
            externalBrokerCapitolId: externalBrokerCapitolId,
            externalBrokerAgentCapitolId: externalBrokerAgentCapitolId
        }
        return new ClientInformation(plain)
    }

    get externalBrokerCapitolId () {
        return this._externalBrokerCapitolId
    }

    get externalBrokerAgentCapitolId () {
        return this._externalBrokerAgentCapitolId
    }

    get typeName () {
        return CLIENT_TYPE_NAMES[this._type]
    }

    get dataOriginName () {
        return CLIENT_ORIGIN_NAMES[this._dataOrigin]
    }

    get economicalSectorCode () {
        return this._economicalSectorCode
    }

    get type () {
        return this._type
    }

    get dataOrigin () {
        return this._dataOrigin
    }

    get dataOriginId () {
        return this._dataOriginId
    }

    get capitolId () {
        return this._capitolId
    }

    get crmId () {
        return this._crmId
    }

    get investmentProfiles () {
        return this._investmentProfiles
    }

    get residency () {
        return this._residency
    }

    get brokerId () {
        return this._brokerId
    }

    toJSON () {
        const result = {
            type: this._type,
            dataOrigin: this._dataOrigin,
            dataOriginId: this._dataOriginId,
            capitolId: this._capitolId,
            crmId: this._crmId,
            investmentProfiles: [],
            residency: this._residency,
            economicalSectorCode: this._economicalSectorCode,
            brokerId: this._brokerId,
            externalBrokerCapitolId: this._externalBrokerCapitolId,
            externalBrokerAgentCapitolId: this._externalBrokerAgentCapitolId
        }
        for (const profile of this._investmentProfiles) {
            result.investmentProfiles.push(profile.toJSON())
        }
        return result
    }

    toPlainObject () {
        return this.toJSON()
    }

    getProfilesGroup (groupUid) {
        let profiles = []
        if (groupUid) {
            profiles = this._investmentProfiles.filter((instance) => (groupUid === instance.groupUid))
        }
        return profiles
    }

    removeProfilesGroup (groupUid) {
        var removedProfiles = []
        if (groupUid) {
            this._investmentProfiles = this._investmentProfiles.filter((instance) => {
                if (groupUid === instance.groupUid) {
                    removedProfiles.push(instance)
                    return false
                }
                return true
            })
        }
        return removedProfiles
    }

    replaceProfilesGroup (groupUid, profilesArray) {
        const sanitized = []
        for (const item of profilesArray) {
            const instance = (item instanceof InvestmentProfile) ? item : new InvestmentProfile(item)
            if (instance.uid === null || instance.groupUid !== groupUid) {
                throw new Error('Invalid profile in passed profilesArray, bad uid or mismatched groupUid.')
            }
            sanitized.push(instance)
        }
        this.removeProfilesGroup(groupUid)
        for (const profile of sanitized) {
            this.addProfile(profile)
        }
    }

    removeProfile (profile) {
        const profileInstance = (!(profile instanceof InvestmentProfile)) ? new InvestmentProfile(profile) : profile
        if (profileInstance.uid === null) {
            throw new Error('Invalid investment profile definition. Missing uid.')
        }
        this._investmentProfiles = this._investmentProfiles.filter((item) => {
            return (profileInstance.uid !== item.uid)
        })
    }

    addProfile (profile) {
        const profileInstance = (!(profile instanceof InvestmentProfile)) ? new InvestmentProfile(profile) : profile
        if (profileInstance.uid === null) {
            throw new Error('Invalid investment profile definition. Missing uid.')
        }
        this.removeProfile(profileInstance)
        this._investmentProfiles.push(profileInstance)
    }

    containsProfile (profile) {
        const profileInstance = (!(profile instanceof InvestmentProfile)) ? new InvestmentProfile(profile) : profile
        if (profileInstance.uid === null) {
            throw new Error('Invalid investment profile definition. Missing uid.')
        }
        for (const item of this.investmentProfiles) {
            if (item.uid === profileInstance.uid) {
                return true
            }
        }
        return false
    }

    hasInvestmentService (serviceUid) {
        const service = new InvestmentService({ uid: serviceUid })
        if (serviceUid) {
            for (const profile of this.investmentProfiles) {
                if (profile.containsService(service)) {
                    return true
                }
            }
        }
        return false
    }

    static fromPlainObject (plainObject) {
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
