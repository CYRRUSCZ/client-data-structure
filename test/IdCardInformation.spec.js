const { IdCardInformation, ClientData } = require('../dist/client-data-structure.cjs.js')
const clientDataset = require('./mock/clientDataset.js')

const idInformation = new IdCardInformation(
    clientDataset[ClientData.PLAIN_OBJECT_KEY_ID_CARD]
)

describe('IdCardInformation', () => {
    it('instance -> plain object -> instance', () => {
        const plainObject = idInformation.toPlainObject()
        expect(idInformation).toEqual(IdCardInformation.fromPlainObject(plainObject))
    })

    it('instance -> plain object -> JSON.stringify -> JSON.parse -> instance', () => {
        const string = JSON.stringify(idInformation.toPlainObject())
        expect(idInformation).toEqual(IdCardInformation.fromPlainObject(JSON.parse(string)))
    })

    it('defaults to null values', () => {
        const empty = new IdCardInformation()
        expect(empty.issuedBy).toBeNull()
        expect(empty.validity instanceof Date).toBe(true)
    })

    it('constructor vs create', () => {
        const fromCreate = IdCardInformation.create(
            idInformation.number,
            idInformation.issuedBy,
            idInformation.country,
            idInformation.validity,
            idInformation.type,
            idInformation.scanNotAllowed
        )
        expect(fromCreate).toEqual(idInformation)
    })

    it('country code can be converted to correct country name', () => {
        expect(idInformation.countryName).toBe('Česká republika')
    })
})
