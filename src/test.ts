import { Address } from './Address'
import { AddressInformation } from './AddressInformation'

const address = Address.create('Tester', 'Main Street', 123, 'Springfield', 'USA', 12345)
// const address = Address.create(null, null, null, 'Springfield', 'USA', 12345)
const mailingAddress = {
    street: 'Mailing Main Street',
    streetNumber: '123',
    city: 'Springfield',
    country: 'USA',
    postalCode: '12345'
}
// Address.create('Mailing Tester', 'Mailing Main Street', 321, 'Springfield', 'USA', 54321)
// const mailingAddress = Address.create('Mailing tester', 'Mailing Main Street', 321, 'Springfield', 'USA', 54321)
const addressInformation = AddressInformation.create(address, {}, false)

const addressInformationData = {
    address: {
        recipient: 'Tester',
        street: 'Main Street',
        streetNumber: '123',
        city: 'Springfield',
        country: 'USA',
        postalCode: '12345'
    },
    mailingAddress: {
        street: 'Mailing Main Street',
        streetNumber: '123',
        city: 'Springfield',
        country: 'USA',
        postalCode: '12345'
    }
}

try {
    // console.log(addressInformation.toJSON())
    addressInformation.validate()
} catch (error) {
    console.error(error)
}

// console.dir(addressInformation.toJSONSchema(), { depth: null })
