import { getValidDate, getStringOrNull } from './helpers'
import { countries } from '@cyrrus/locale-utils'

export class PersonalInformation {
    constructor (
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
            citizenship,
            gender,
            politician = false
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
        this._fullName = (`${(this._lastName !== null) ? (this._lastName + ' ') : ''}${(this._firstName !== null) ? this._firstName : ''}`)
        this._gender = gender
        this._politician = (politician === true)
    }

    static create (
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
        citizenship,
        gender,
        politician
    ) {
        const plain = {
            prenominal: prenominal,
            firstName: firstName,
            lastName: lastName,
            postnominal: postnominal,
            birthNumber: birthNumber,
            dateOfBirth: dateOfBirth,
            noBirthNumber: noBirthNumber,
            birthNumberCountry: birthNumberCountry,
            taxDomicile: taxDomicile,
            placeOfBirth: placeOfBirth,
            citizenship: citizenship,
            gender: gender,
            politician: politician
        }
        return new PersonalInformation(plain)
    }

    get fullName () {
        const parts = [
            this.prenominal,
            this.firstName,
            this.lastName,
            this.postnominal
        ]
        return parts.filter((value) => (value !== null && value !== '' && value !== undefined)).join(' ').replace(/\s{2,}/ig, ' ').trim()
    }

    get prenominal () {
        return this._prenominal
    }

    get firstName () {
        return this._firstName
    }

    get lastName () {
        return this._lastName
    }

    get gender () {
        return this._gender
    }

    get postnominal () {
        return this._postnominal
    }

    get birthNumber () {
        return this._birthNumber
    }

    get dateOfBirth () {
        return this._dateOfBirth
    }

    get noBirthNumber () {
        return this._noBirthNumber
    }

    get politician () {
        return this._politician === true
    }

    get birthNumberCountry () {
        return this._birthNumberCountry
    }

    get birthNumberCountryName () {
        return (Object.prototype.hasOwnProperty.call(countries, `${this._birthNumberCountry}`)) ? countries[this._birthNumberCountry] : this._birthNumberCountry
    }

    get taxDomicile () {
        return this._taxDomicile
    }

    get taxDomicileCountryName () {
        return (Object.prototype.hasOwnProperty.call(countries, `${this._taxDomicile}`)) ? countries[this._taxDomicile] : this._taxDomicile
    }

    get placeOfBirth () {
        return this._placeOfBirth
    }

    get citizenship () {
        return this._citizenship
    }

    get citizenshipCountryName () {
        return (Object.prototype.hasOwnProperty.call(countries, `${this._citizenship}`)) ? countries[this._citizenship] : this._citizenship
    }

    toJSON () {
        return {
            prenominal: this._prenominal,
            firstName: this._firstName,
            lastName: this._lastName,
            postnominal: this._postnominal,
            birthNumber: this._birthNumber,
            dateOfBirth: this._dateOfBirth,
            noBirthNumber: this._noBirthNumber,
            birthNumberCountry: this._birthNumberCountry,
            taxDomicile: this._taxDomicile,
            placeOfBirth: this._placeOfBirth,
            citizenship: this._citizenship,
            gender: this._gender,
            politician: this._politician === true
        }
    }

    toPlainObject () {
        return this.toJSON()
    }

    static fromPlainObject (plainObject = {}) {
        return new PersonalInformation(plainObject)
    }
}

export const genderOptions = {
    male: 'Muž',
    female: 'Žena'
}
