import { InvestmentService } from './lib/InvestmentService'
import { Address } from './lib/Address.js'
import { AddressInformation } from './lib/AddressInformation'
import { BankAccount } from './lib/BankAccount'
import { getInstanceOfClass, getStringOrNull, getValidDate, isESClass } from './lib/helpers'
import { PersonalInformation } from './lib/PersonalInformation'
import { Representative } from './lib/Representative'

const test = new Address()
console.log(test.toPlainObject())

getValidDate('2020-01-01')

getStringOrNull(null)

isESClass(Address)

getInstanceOfClass({}, Address)

const addressInformation = new AddressInformation()
console.log(addressInformation.toJSON())

const bankAccount = new BankAccount()
console.log(bankAccount.toPlainObject())

console.log(bankAccount.toJSON())

const representative = new Representative()
console.log(representative)

const personalInfo = new PersonalInformation()
console.log(personalInfo.toJSON())

const investmentService = new InvestmentService()
console.log(investmentService.toJSON())
