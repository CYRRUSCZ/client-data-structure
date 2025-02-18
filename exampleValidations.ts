import { Address, AddressInformation, BankAccount, ContactInformation, IdCardInformation, PersonalInformation } from './src'

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

function contactInformation (): void {
    const contactInformation = ContactInformation.create('test@test.com', '+385 91 124 4567', 'password')
    // const contactInformation = ContactInformation.create('test@test.com', '+385 91 124563 4567', 'password')
    console.log(contactInformation.toJSON())
    console.dir(contactInformation.toJSONSchema(), { depth: null })

    try {
        contactInformation.validate()
    } catch (error) {
        console.error(error)
    }
}

function bankAccount (): void {
    // const bankAccount = BankAccount.create('123456789', '123456', '1234567890', '5500', 'CZK', '', '', '', '', false, '123456789')
    const bankAccount = BankAccount.create('123456789', '123456', '1234567890', '5500', 'CZK', 'IT60 X054 2811 1010 0000 0123 456', 'UNCRITMM', 'Moving street 911, Outer space', 'My account', true, '123456789')
    console.log(bankAccount.toJSON())
    console.dir(bankAccount.toJSONSchema(), { depth: null })

    try {
        bankAccount.validate()
    } catch (error) {
        console.error(error)
    }
}

function idCardInformation (): void {
    const idCardInformation = IdCardInformation.create('24076340234', 'Ministry of Interior', 'HRV', new Date('2035-01-01'), 'OP', false)
    // const idCardInformation = IdCardInformation.create('1234567890', 'Ministry of Interior', 'HRV', new Date('2024-01-01'), 'OP', false)
    console.log(idCardInformation.toJSON())
    console.dir(idCardInformation.toJSONSchema(), { depth: null })

    try {
        idCardInformation.validate()
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
    case 'contactInformation':
        contactInformation()
        break
    case 'bankAccount':
        bankAccount()
        break
    case 'idCardInformation':
        idCardInformation()
        break
}
