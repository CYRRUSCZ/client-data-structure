const validValidityDate = (() => {
    const d = new Date()
    const date = new Date()
    date.setFullYear(d.getFullYear() + 1)

    return date
})()

const maxDateOfBirth = (() => {
    const d = new Date()

    return new Date(d.getFullYear() - 1, d.getMonth(), d.getDate()).toISOString()
})()

module.exports = {
    expectErrorsTestCases: [
        {
            data: {
                personal: {
                    prenominal: 'Ing',
                    firstName: 'Rupert',
                    lastName: 'Muller',
                    postnominal: 'Phd',
                    birthNumber: '902412/1589',
                    dateOfBirth: new Date('1990-12-24'),
                    noBirthNumber: false,
                    birthNumberCountry: 'CR',
                    taxDomicile: 'CR',
                    placeOfBirth: 'Wien',
                    citizenship: 'Praha',
                    gender: 'male',
                    politician: false
                },
                position: null,
                address: {
                    recipient: 'První firma a.s.',
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                idCard: {
                    number: '123456789',
                    issuedBy: 'Uncle Bob',
                    country: 'CR',
                    validity: validValidityDate,
                    type: 'OP',
                    scanNotAllowed: true,
                },
                contact: {
                    phoneNumber: '+420 777 908 902',
                    email: 'tomas@valiasek.cz'
                }
            },
            expected: [
                '/position must be string',
            ]
        },
        {
            data: {
                position: 'CEO',
                address: {
                    recipient: 'První firma a.s.',
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                idCard: {
                    number: '123456789',
                    issuedBy: 'Uncle Bob',
                    country: 'CR',
                    validity: validValidityDate,
                    type: 'OP',
                    scanNotAllowed: true,
                },
                contact: {
                    phoneNumber: '+420 777 908 902',
                    email: 'tomas@valiasek.cz'
                }
            },
            expected: [
                '/personal must match "then" schema',
                '/personal/birthNumber must be string',
                '/personal/birthNumberCountry must be string',
                '/personal/citizenship must be string',
                `/personal/dateOfBirth should be <= ${maxDateOfBirth}`,
                '/personal/firstName must be string',
                '/personal/gender must be equal to one of the allowed values',
                '/personal/gender must be string',
                '/personal/lastName must be string',
                '/personal/placeOfBirth must be string',
                '/personal/taxDomicile must be string',
                '/personal must match "else" schema'
            ]
        },
        {
            data: {
                personal: {
                    prenominal: 'Ing',
                    firstName: 'Rupert',
                    lastName: 'Muller',
                    postnominal: 'Phd',
                    birthNumber: '902412/1589',
                    dateOfBirth: new Date('1990-12-24'),
                    noBirthNumber: false,
                    birthNumberCountry: 'CR',
                    taxDomicile: 'CR',
                    placeOfBirth: 'Wien',
                    citizenship: 'Praha',
                    gender: 'male',
                    politician: false
                },
                position: 'CEO',
                idCard: {
                    number: '123456789',
                    issuedBy: 'Uncle Bob',
                    country: 'CR',
                    validity: validValidityDate,
                    type: 'OP',
                    scanNotAllowed: true,
                },
                contact: {
                    phoneNumber: '+420 777 908 902',
                    email: 'tomas@valiasek.cz'
                }
            },
            expected: [
                '/address/city must be string',
                '/address/country must be string',
                '/address/postalCode must be string',
                '/address/recipient must be string',
                '/address/street must be string',
                '/address/streetNumber must be string',
            ]
        },
        {
            data: {
                personal: {
                    prenominal: 'Ing',
                    firstName: 'Rupert',
                    lastName: 'Muller',
                    postnominal: 'Phd',
                    birthNumber: '902412/1589',
                    dateOfBirth: new Date('1990-12-24'),
                    noBirthNumber: false,
                    birthNumberCountry: 'CR',
                    taxDomicile: 'CR',
                    placeOfBirth: 'Wien',
                    citizenship: 'Praha',
                    gender: 'male',
                    politician: false
                },
                position: 'CEO',
                address: {
                    recipient: 'První firma a.s.',
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                idCard: {
                    validity: validValidityDate,
                },
                contact: {
                    phoneNumber: '+420 777 908 902',
                    email: 'tomas@valiasek.cz'
                }
            },
            expected: [
                '/idCard/country must be string',
                '/idCard/issuedBy must be string',
                '/idCard/number must be string',
                '/idCard/type must be equal to one of the allowed values',
                '/idCard/type must be string',
            ]
        },
        {
            data: {
                personal: {
                    prenominal: 'Ing',
                    firstName: 'Rupert',
                    lastName: 'Muller',
                    postnominal: 'Phd',
                    birthNumber: '902412/1589',
                    dateOfBirth: new Date('1990-12-24'),
                    noBirthNumber: false,
                    birthNumberCountry: 'CR',
                    taxDomicile: 'CR',
                    placeOfBirth: 'Wien',
                    citizenship: 'Praha',
                    gender: 'male',
                    politician: false
                },
                position: 'CEO',
                address: {
                    recipient: 'První firma a.s.',
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                idCard: {
                    number: '123456789',
                    issuedBy: 'Uncle Bob',
                    country: 'CR',
                    validity: validValidityDate,
                    type: 'OP',
                    scanNotAllowed: true,
                }
            },
            expected: [
                '/contact/email must be string',
                '/contact/phoneNumber must be string'
            ]
        },
    ],
    expectPojoErrorsTestCases: [
        {
            data: {
                personal: {
                    prenominal: 'Ing',
                    firstName: 'Rupert',
                    lastName: 'Muller',
                    postnominal: 'Phd',
                    birthNumber: '902412/1589',
                    dateOfBirth: new Date('1990-12-24'),
                    noBirthNumber: false,
                    birthNumberCountry: 'CR',
                    taxDomicile: 'CR',
                    placeOfBirth: 'Wien',
                    citizenship: 'Praha',
                    gender: 'male',
                    politician: false
                },
                position: null,
                address: {
                    recipient: 'První firma a.s.',
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                idCard: {
                    number: '123456789',
                    issuedBy: 'Uncle Bob',
                    country: 'CR',
                    validity: validValidityDate.toISOString(),
                    type: 'OP',
                    scanNotAllowed: true,
                },
                contact: {
                    phoneNumber: '+420 777 908 902',
                    email: 'tomas@valiasek.cz'
                }
            },
            expected: [
                '/position must be string',
                'must have required property \'hasPowerOfAttorney\'',
                'must have required property \'id\'',
                'must have required property \'isRealOwner\'',
                'must have required property \'isRepresentative\'',
                'must have required property \'realOwnerReasonChar\'',
                'must have required property \'realOwnerReasonNumber\'',
                'must match \"then\" schema'
            ]
        },
        {
            data: {
                position: 'CEO',
                address: {
                    recipient: 'První firma a.s.',
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                idCard: {
                    number: '123456789',
                    issuedBy: 'Uncle Bob',
                    country: 'CR',
                    validity: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
                    type: 'OP',
                    scanNotAllowed: true,
                },
                contact: {
                    phoneNumber: '+420 777 908 902',
                    email: 'tomas@valiasek.cz'
                },
                hasPowerOfAttorney: true,
                isRealOwner: true,
                isRepresentative: true,
                realOwnerReasonChar: 'a',
                realOwnerReasonNumber: '1'
            },
            expected: [
                'must have required property \'id\'',
                'must have required property \'personal\''
            ]
        },
        {
            data: {
                position: 'CEO',
                idCard: {
                    number: '123456789',
                    issuedBy: 'Uncle Bob',
                    country: 'CR',
                    validity: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
                    type: 'OP',
                    scanNotAllowed: true,
                },
                contact: {
                    phoneNumber: '+420 777 908 902',
                    email: 'tomas@valiasek.cz'
                },
                hasPowerOfAttorney: true,
                isRealOwner: true,
                isRepresentative: true,
                realOwnerReasonChar: 'a',
                realOwnerReasonNumber: '1'
            },
            expected: [
                'must have required property \'id\'',
                'must have required property \'personal\'',
                'must have required property \'address\''
            ]
        }
    ],
    testCasesValidData: [
        {
            data: {
                personal: {
                    prenominal: 'Ing',
                    firstName: 'Rupert',
                    lastName: 'Muller',
                    postnominal: 'Phd',
                    birthNumber: '902412/1589',
                    dateOfBirth: new Date('1990-12-24'),
                    noBirthNumber: false,
                    birthNumberCountry: 'CR',
                    taxDomicile: 'CR',
                    placeOfBirth: 'Wien',
                    citizenship: 'Praha',
                    gender: 'male',
                    politician: false
                },
                position: 'CEO',
                address: {
                    recipient: 'První firma a.s.',
                    street: 'Příčná',
                    streetNumber: '554/6a',
                    city: 'Brno',
                    postalCode: '66609',
                    country: 'CZE'
                },
                idCard: {
                    number: '123456789',
                    issuedBy: 'Uncle Bob',
                    country: 'CR',
                    validity: validValidityDate,
                    type: 'OP',
                    scanNotAllowed: true,
                },
                contact: {
                    phoneNumber: '+420 777 908 902',
                    email: 'tomas@valiasek.cz'
                }
            }
        }
    ]
}
