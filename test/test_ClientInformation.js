/* global describe, it */

const { ClientInformation, ClientData, InvestmentProfile } = require('../dist/clientdatastructure')
const test = require('unit.js')
const clientDataset = require('./mock/clientDataset.js')

var clientInformation = new ClientInformation(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_CLIENT]
)

function reinitClientInformation() {
    clientInformation = new ClientInformation(
        clientDataset[ClientData.PLAIN_OBJECT_KEY_CLIENT]
    )
}

describe('ClientInformation', () => {
    it('instance -> plain object -> instance', () => {
        let plainObject = clientInformation.toPlainObject()
        test.assert.deepEqual(clientInformation, ClientInformation.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        let string = JSON.stringify(clientInformation.toPlainObject())
        test.assert.deepEqual(clientInformation, ClientInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        let empty = new ClientInformation()
        test.assert.equal(null, empty.dataOriginId)
    })

    it('constructor vs create', () => {
        let fromCreate = ClientInformation.create(
            clientInformation.type,
            clientInformation.dataOrigin,
            clientInformation.dataOriginId,
            clientInformation.capitolId,
            clientInformation.crmId,
            clientInformation.investmentProfiles
        )
        test.assert.deepEqual(fromCreate, clientInformation)
    })

    it('method getProfilesGroup', () => {
        reinitClientInformation()
        test.assert.deepEqual(clientInformation.getProfilesGroup('asdf'), [])
        test.assert.deepEqual(clientInformation.getProfilesGroup(''), [])
        test.assert.deepEqual(clientInformation.getProfilesGroup(clientInformation._investmentProfiles[0].groupUid), [clientInformation._investmentProfiles[0]])
    })

    it('method removeProfilesGroup', () => {
        reinitClientInformation()
        let profile1 = new InvestmentProfile(clientInformation.investmentProfiles[0].toJSON())
        let profile2 = new InvestmentProfile(clientInformation.investmentProfiles[1].toJSON())
        test.assert.deepEqual(clientInformation.removeProfilesGroup('asdf'), [])
        test.assert.deepEqual(clientInformation.removeProfilesGroup(''), [])
        test.assert.deepEqual(clientInformation.removeProfilesGroup(clientInformation._investmentProfiles[0].groupUid), [profile1])
        test.assert.deepEqual(clientInformation.investmentProfiles, [profile2])
    })

    it('method containsProfile', () => {
        reinitClientInformation()
        test.assert.equal(clientInformation.containsProfile(new InvestmentProfile({ uid: 'asdf' })), false)
        test.assert.equal(clientInformation.containsProfile(clientInformation._investmentProfiles[0]), true)
    })

    it('method replaceProfilesGroup', () => {
        reinitClientInformation()
        let profile1 = new InvestmentProfile(clientInformation.investmentProfiles[0].toJSON())
        let profile2 = new InvestmentProfile(clientInformation.investmentProfiles[1].toJSON())
        let profile3 = new InvestmentProfile({ ...profile2.toJSON(), ...{ uid: 'baz', groupUid: profile1.groupUid } })
        
        clientInformation.replaceProfilesGroup(profile1.groupUid, [profile3])
        test.assert.deepEqual(clientInformation.investmentProfiles, [profile2, profile3])
    })

    it('method replaceProfilesGroup', () => {
        reinitClientInformation()
        let profile1 = new InvestmentProfile(clientInformation.investmentProfiles[0].toJSON())
        let profile2 = new InvestmentProfile(clientInformation.investmentProfiles[1].toJSON())
        
        clientInformation.removeProfile(profile1)
        test.assert.deepEqual(clientInformation.investmentProfiles, [profile2])
    })

    it('method addProfile', () => {
        reinitClientInformation()
        let profile1 = new InvestmentProfile(clientInformation.investmentProfiles[0].toJSON())
        let profile2 = new InvestmentProfile(clientInformation.investmentProfiles[1].toJSON())
        let profile3 = new InvestmentProfile({ ...profile1.toJSON(), ...{ uid: 'aaa', groupUid: 'bbb' } })
        clientInformation.addProfile(profile1)
        test.assert.deepEqual(clientInformation.investmentProfiles, [profile2, profile1])
        clientInformation.addProfile(profile3)
        test.assert.deepEqual(clientInformation.investmentProfiles, [profile2, profile1, profile3])
    })

    it('method hasInvestmentService', () => {
        reinitClientInformation()
        let profile1 = new InvestmentProfile(clientInformation.investmentProfiles[0].toJSON())
        
        test.assert.equal(clientInformation.hasInvestmentService(profile1.services[0].uid), true)
        test.assert.equal(clientInformation.hasInvestmentService('asdf'), false)
    })    
  })