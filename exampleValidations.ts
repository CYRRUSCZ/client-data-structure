import {
    Address, AddressInformation, BankAccount, CompanyInformation,
    ContactInformation, IdCardInformation, InvestmentParameter,
    InvestmentService, InvestmentProfile,
    PersonalInformation, Representative
} from './src'

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

function representative (): void {
    const personalInformation = PersonalInformation.create('', 'Zadar', 'Doe', '', '24076340234', new Date('2006-01-01'), false, 'HRV', 'CZ', 'CZ', 'Brno', 'male', false)
    const address = Address.create('John Doe', 'Main Street', 123, 'Springfield', 'USA', 12345)
    const idCardInformation = IdCardInformation.create('24076340234', 'Ministry of Interior', 'HRV', new Date('2035-01-01'), 'OP', false)
    const contactInformation = ContactInformation.create('test@test.com', '+385 91 124 4567', 'password')
    const representative = Representative.create(personalInformation, 'CEO', address, idCardInformation, null, contactInformation, true, true, 'a', '1', '123456789', '123456789', true)
    // const representative = Representative.create(personalInformation, 'CTO', address, null, null, null)
    console.log(representative.toJSON())
    console.dir(representative.toJSONSchema(), { depth: null })

    try {
        representative.validate()
    } catch (error) {
        console.error(error)
    }
}

function companyInformation (): void {
    const personalInformation = PersonalInformation.create('', 'Zadar', 'Doe', '', '24076340234', new Date('2006-01-01'), false, 'HRV', 'CZ', 'CZ', 'Brno', 'male', false)
    const personalInformation2 = PersonalInformation.create('', 'Jolanda', 'Doe', '', '24076340234', new Date('2006-01-01'), false, 'HRV', 'CZ', 'CZ', 'Brno', 'male', false)
    const ceoAddress = Address.create('Zadar Doe', 'Main Street', 123, 'Springfield', 'USA', 12345)
    const ctoAddress = Address.create('Jolanda Doe', 'Main Street', 123, 'Springfield', 'USA', 12345)
    const ceoIdCardInformation = IdCardInformation.create('24076340234', 'Ministry of Interior', 'HRV', new Date('2035-01-01'), 'OP', false)
    const ctoIdCardInformation = IdCardInformation.create('24076340234', 'Ministry of Interior', 'HRV', new Date('2045-01-01'), 'Pas', false)
    const ceoContactInformation = ContactInformation.create('test@test.com', '+385 91 124 4567', 'password')
    // const ctoContactInformation = ContactInformation.create('jolanda-test@test.com', '+385 48 122 4587', 'hodnebudesnekde')
    const ctoContactInformation = ContactInformation.create('jolanda-test@test.com', '+385 48 1222 4587', 'hodnebudesnekdesdfsdfsfsdfsdf')
    const representative = Representative.create(personalInformation, 'CEO', ceoAddress, ceoIdCardInformation, null, ceoContactInformation, true, true, 'a', '1', '123456789', '123456789', true)
    const representative2 = Representative.create(personalInformation2, 'CTO', ctoAddress, ctoIdCardInformation, null, ctoContactInformation, true, true, 'a', '1', '123456789', '123456789', true)
    const companyInformation = CompanyInformation.create('123456789', 'CZ123456789', 'XYZ123456789', 'HRV', [representative, representative2], 'Turn My Turtle s.p.')
    console.dir(companyInformation.toJSON(), { depth: null })
    console.dir(companyInformation.toJSONSchema(), { depth: null })

    try {
        companyInformation.validate()
    } catch (error) {
        console.error(error)
    }
}

function investmentParameter (): void {
    const investmentParameter = InvestmentParameter.create('1.0.0', 'parAmlProfile', 'AML Profile', new Date('2021-01-01'), '1', true)
    console.log(investmentParameter.toJSON())
    console.dir(investmentParameter.toJSONSchema(), { depth: null })

    try {
        investmentParameter.validate()
    } catch (error) {
        console.error(error)
    }
}

function investmentService (): void {
    const investmentService = InvestmentService.create('svcAml', 'AML Profile Service', new Date('2024-01-01'))
    console.log(investmentService.toJSON())
    console.dir(investmentService.toJSONSchema(), { depth: null })

    try {
        investmentService.validate()
    } catch (error) {
        console.error(error)
    }
}

function investmentProfile (): void {
    const investmentService = InvestmentService.create('svcAml', 'AML Profile Service', new Date('2024-01-01'))
    const investmentProfile = InvestmentProfile.create('1.0.0', 'profileAml', 'AML Profile', new Date('2021-01-01'), '1', [investmentService], 100)
    console.log(investmentProfile.toJSON())
    console.dir(investmentProfile.toJSONSchema(), { depth: null })

    try {
        investmentProfile.validate()
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
    case 'representative':
        representative()
        break
    case 'companyInformation':
        companyInformation()
        break
    case 'investmentParameter':
        investmentParameter()
        break
    case 'investmentService':
        investmentService()
        break
    case 'investmentProfile':
        investmentProfile()
        break
}
