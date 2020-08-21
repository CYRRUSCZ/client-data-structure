import { getStringOrNull } from './helpers.js'
import { countries } from '@cyrrus/locale-utils'

export default class Address {
  constructor (
    {
      recipient,
      street,
      streetNumber,
      city,
      country,
      postalCode
    } = {}
  ) {
    this._recipient = getStringOrNull(recipient)
    this._street = getStringOrNull(street)
    this._city = getStringOrNull(city)
    this._country = getStringOrNull(country)
    this._postalCode = getStringOrNull(postalCode)
    this._streetNumber = getStringOrNull(streetNumber)
  }

  static create (
    recipient,
    street,
    streetNumber,
    city,
    country,
    postalCode
  ) {
    const plain = {
      recipient: recipient,
      street: street,
      streetNumber: streetNumber,
      city: city,
      country: country,
      postalCode: postalCode
    }
    return new Address(plain)
  }

  get fullAddress () {
    const tmp = [
      this._recipient,
      [this._street, this._streetNumber].filter(entry => entry !== null).join(' '),
      this._city,
      this.countryName,
      this._postalCode
    ]
    if (tmp[1] === '') {
      tmp[1] = null
    }
    return tmp.filter(entry => entry !== null).join(', ')
  }

  get recipient () {
    return this._recipient
  }

  get street () {
    return this._street
  }

  get streetNumber () {
    return this._streetNumber
  }

  get city () {
    return this._city
  }

  get country () {
    return this._country
  }

  get countryName () {
    return (Object.prototype.hasOwnProperty.call(countries, `${this._country}`)) ? countries[this._country] : this._country
  }

  get postalCode () {
    return this._postalCode
  }

  toJSON () {
    const plainObject = {
      recipient: this._recipient,
      street: this._street,
      streetNumber: this._streetNumber,
      city: this._city,
      country: this._country,
      postalCode: this._postalCode
    }
    return plainObject
  }

  toPlainObject () {
    return this.toJSON()
  }

  static fromPlainObject (plainObject) {
    return new Address(plainObject)
  }
}
