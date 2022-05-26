import { Address } from './lib/Address.js'
import { AddressInformation } from './lib/AddressInformation'
import { BankAccount } from './lib/BankAccount'
import { getInstanceOfClass, getStringOrNull, getValidDate, isESClass } from './lib/helpers'

const test = new Address()
test.toPlainObject()

getValidDate('2020-01-01')

getStringOrNull(null)

isESClass(Test)

getInstanceOfClass<Test>({}, Test)

const addressInformation = new AddressInformation()
addressInformation.toJSON()

const bankAccount = new BankAccount()
bankAccount.toPlainObject()

console.log(bankAccount)

