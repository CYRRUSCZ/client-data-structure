const { ContactInformation, ClientData } = require('../dist/client-data-structure.cjs')
const clientDataset = require('./mock/clientDataset.js')

const contactInformation = new ContactInformation(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_CONTACT]
)

describe('ContactInformation', () => {
    it('instance -> plain object -> instance', () => {
        const plainObject = contactInformation.toPlainObject()
        expect(contactInformation).toEqual(ContactInformation.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        const string = JSON.stringify(contactInformation.toPlainObject())
        expect(contactInformation).toEqual(ContactInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        const empty = new ContactInformation()
        expect(empty.phoneNumber).toBeNull()
    })

    it('constructor vs create', () => {
        const fromCreate = ContactInformation.create(
            contactInformation.email,
            contactInformation.phoneNumber,
            contactInformation.phonePassword
        )
        expect(fromCreate).toEqual(contactInformation)
    })
})
