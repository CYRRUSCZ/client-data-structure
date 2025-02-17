import { Address, AddressInformation, PersonalInformation } from './src'

const args = process.argv.slice(2)

function address (): void {
    const address = Address.create('John Doe', 'Main Street', 123, 'Springfield', 'USA', 12345)
    console.log(address.toJSON())
    console.log(address.toJSONSchema())

    try {
        address.validate()
    } catch (error) {
        console.error(error)
    }
}

function addressInformation (): void {
    const addressInformationAddress = Address.create('John Doe', 'Main Street', 123, 'Springfield', 'USA', 12345)
    // const addressInformationMailingAddress = Address.create('Mail Recipient', 'Main Street', 123, 'Springfield', 'USA', 12345)
    const addressInformation = AddressInformation.create(addressInformationAddress, {}, true)
    console.log(addressInformation.toJSON())
    console.log(addressInformation.toJSONSchema())

    try {
        addressInformation.validate()
    } catch (error) {
        console.error(error)
    }
}

function personalInformation (): void {
    const personalInformation = PersonalInformation.create('', 'Zadar', 'Doe', '', '24076340234', new Date('2006-01-01'), false, 'HRV', 'CZ', 'CZ', 'Brno', 'male', false)
    // const personalInformation = PersonalInformation.create('', 'Zadar', 'Doe', '', '45678998652', new Date('2012-01-01'), false, 'HRV', 'CZ', 'CZ', 'Brno', 'male', false)
    console.log(personalInformation.toJSON())
    console.dir(personalInformation.toJSONSchema(), { depth: null })

    try {
        personalInformation.validate()
    } catch (error) {
        console.error(error)
    }
}

switch (args[0]) {
    case 'address':
        address()
        break
    case 'addressInformation':
        addressInformation()
        break
    case 'personalInformation':
        personalInformation()
        break
}
