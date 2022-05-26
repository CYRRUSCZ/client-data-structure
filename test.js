'use strict'
exports.__esModule = true
var Address_js_1 = require('./dist/clientdatastructure')
var AddressInformation_1 = require('./dist/clientdatastructure')
var BankAccount_1 = require('./dist/clientdatastructure')
var helpers_1 = require('./dist/clientdatastructure')
var PersonalInformation_1 = require('./dist/clientdatastructure')
var Representative_1 = require('./dist/clientdatastructure')
var test = new Address_js_1.Address()
test.toPlainObject();
// (0, helpers_1.getValidDate)('2020-01-01');
// (0, helpers_1.getStringOrNull)(null);
// (0, helpers_1.isESClass)(Address_js_1.Address);
// (0, helpers_1.getInstanceOfClass)({}, Address_js_1.Address)
var addressInformation = new AddressInformation_1.AddressInformation()
addressInformation.toJSON()
var bankAccount = new BankAccount_1.BankAccount()
bankAccount.toPlainObject()
console.log(bankAccount)
var representative = new Representative_1.Representative()
console.log(representative)
var personalInfo = new PersonalInformation_1.PersonalInformation()
console.log(personalInfo.toJSON())
