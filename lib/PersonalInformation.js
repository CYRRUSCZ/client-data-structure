import { getValidDate, getStringOrNull } from './helpers.js'

export default class PersonalInformation {
    constructor(
        {
            prenominal,
            firstName,
            lastName,
            postnominal,
            birthNumber,
            dateOfBirth,
            noBirthNumber,
            birthNumberCountry,
            taxDomicile,
            placeOfBirth,
            citizenship
        } = {}
    ) {
        this._prenominal = getStringOrNull(prenominal)
        this._firstName = getStringOrNull(firstName)
        this._lastName = getStringOrNull(lastName)
        this._postnominal = getStringOrNull(postnominal)
        this._birthNumber = getStringOrNull(birthNumber)
        this._dateOfBirth = getValidDate(dateOfBirth)
        this._noBirthNumber = (noBirthNumber === true)
        this._birthNumberCountry = getStringOrNull(birthNumberCountry)
        this._taxDomicile = getStringOrNull(taxDomicile)
        this._placeOfBirth = getStringOrNull(placeOfBirth)
        this._citizenship = getStringOrNull(citizenship)
    }

    get prenominal() {
        return this._prenominal
    }

    get firstName() {
        return this._firstName
    }

    get lastName() {
        return this._lastName
    }

    get postnominal() {
        return this._postnominal
    }

    get birthNumber() {
        return this._birthNumber
    }

    get dateOfBirth() {
        return this._dateOfBirth
    }

    get noBirthNumber() {
        return this._noBirthNumber
    }

    get birthNumberCountry() {
        return this._birthNumberCountry
    }

    get taxDomicile() {
        return this._taxDomicile
    }

    get placeOfBirth() {
        return this._placeOfBirth
    }

    get citizenship() {
        return this._citizenship
    }
    
    toJSON() {
        return {
            prenominal: this.prenominal,
            firstName: this.firstName,
            lastName: this.lastName,
            postnominal: this.postnominal,
            birthNumber: this.birthNumber,
            dateOfBirth: this.dateOfBirth,
            noBirthNumber: this.noBirthNumber,
            birthNumberCountry: this.birthNumberCountry,
            taxDomicile: this.taxDomicile,
            placeOfBirth: this.placeOfBirth,
            citizenship: this.citizenship
        }
    }

    toPlainObject() {
        return this.toJSON()
    }

    static fromPlainObject(plainObject = {}) {
        return new PersonalInformation(plainObject)
    }
}