module.exports = {
    firstName: 'Sherlock',
    lastName: 'Black',
    degree: 'phd.',
    birthNumber: '123456789',
    dateOfBirth: new Date(Date.parse('November 30, 1874')),
    address:
        {
            mailingAddress:
                {
                    recipient: null,
                    streetName: 'Baker Street',
                    houseNumber: '221B',
                    city: 'London',
                    country: 'United Kingdom',
                    postalCode: 'NW1 6XE'
                },
            address:
                {
                    recipient: null,
                    streetName: 'Grimmauld Place',
                    houseNumber: '12',
                    city: 'London',
                    country: 'United Kingdom',
                    postalCode: 'NW1 6XE'
                }
        },
    contactInformation:
        {email: 'ChunkyLover53@aol.com', phoneNumber: '206-709-3100'},
    bankingInformation:
        {
            prefix: null,
            account: null,
            code: null,
            currency: null,
            iban: null,
            swift: null,
            bank_name_address: null,
            account_name: null
        }
}