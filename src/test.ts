import { Address } from './Address'
import { AddressInformation } from './AddressInformation'
import { PersonalInformation } from './PersonalInformation'

// const address = Address.create('Tester', 'Main Street', 123, 'Springfield', 'USA', 12345)
const address = Address.create(null, null, null, 'Springfield', 'USA', 12345)
// const mailingAddress = {
//     street: 'Mailing Main Street',
//     streetNumber: '123',
//     city: 'Springfield',
//     country: 'USA',
//     postalCode: '12345'
// }
// Address.create('Mailing Tester', 'Mailing Main Street', 321, 'Springfield', 'USA', 54321)
const mailingAddress = Address.create('Mailing tester', 'Mailing Main Street', 321, 'Springfield', 'USA', 54321)
const addressInformation = AddressInformation.create(address, {}, false)
// const addressInformationData = {
//     address: {
//         recipient: 'Tester',
//         street: 'Main Street',
//         streetNumber: '123',
//         city: 'Springfield',
//         country: 'USA',
//         postalCode: '12345'
//     },
//     mailingAddress: {
//         street: 'Mailing Main Street',
//         streetNumber: '123',
//         city: 'Springfield',
//         country: 'USA',
//         postalCode: '12345'
//     }
// }

const personalInformation = PersonalInformation.create('Mr.', 'John', 'Doe', 'PhD', '1234567890', new Date('2016-01-01'), true, 'CZ', 'Prague', 'CZ', 'Prague', 'M', false)

try {
    // const json = personalInformation.toJSON()
    // personalInformation.validate({ strictMode: true })
    addressInformation.validate({ strictMode: true })
} catch (error) {
    console.error(error)
}

console.log(addressInformation.toStrictJSONSchema())
