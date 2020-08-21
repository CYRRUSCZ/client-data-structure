import { getStringOrNull, getValidDate } from './helpers.js'

export default class InvestmentService {
  constructor (
    {
      uid,
      name,
      added
    } = {}
  ) {
    this._uid = getStringOrNull(uid)
    this._name = getStringOrNull(name)
    this._added = getValidDate(added)
  }

  static create (
    uid,
    name,
    added
  ) {
    const plain = {
      uid: uid,
      name: name,
      added: added
    }
    return new InvestmentService(plain)
  }

  get uid () {
    return this._uid
  }

  get name () {
    return this._name
  }

  get added () {
    return this._added
  }

  toJSON () {
    const plainObject = {
      uid: this.uid,
      name: this.name,
      added: this.added
    }
    return plainObject
  }

  toPlainObject () {
    return this.toJSON()
  }

  static fromPlainObject (plainObject) {
    return new InvestmentService(plainObject)
  }
}
