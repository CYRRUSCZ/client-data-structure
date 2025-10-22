import { AvailableLanguages, SupportedIdCardTypes, SupportedGenderOptions } from '../src/index'

describe('Enums', () => {
    describe('AvailableLanguages', () => {
        it('should have cs_CZ', () => {
            expect(AvailableLanguages.cs_CZ).toBe('cs_CZ')
        })

        it('should have sk_SK', () => {
            expect(AvailableLanguages.sk_SK).toBe('sk_SK')
        })

        it('should have en_US', () => {
            expect(AvailableLanguages.en_US).toBe('en_US')
        })

        it('should have hr_HR', () => {
            expect(AvailableLanguages.hr_HR).toBe('hr_HR')
        })

        it('should have exactly 4 languages', () => {
            const keys = Object.keys(AvailableLanguages)
            expect(keys.length).toBe(4)
        })
    })

    describe('SupportedIdCardTypes', () => {
        it('should have id_card type', () => {
            expect(SupportedIdCardTypes.id_card).toBe('id')
        })

        it('should have passport type', () => {
            expect(SupportedIdCardTypes.passport).toBe('passport')
        })

        it('should have driver_license type', () => {
            expect(SupportedIdCardTypes.driver_license).toBe('driver_license')
        })

        it('should have other type', () => {
            expect(SupportedIdCardTypes.other).toBe('other')
        })

        it('should have exactly 4 types', () => {
            const keys = Object.keys(SupportedIdCardTypes)
            expect(keys.length).toBe(4)
        })
    })

    describe('SupportedGenderOptions', () => {
        it('should have male gender', () => {
            expect(SupportedGenderOptions.male).toBe('male')
        })

        it('should have female gender', () => {
            expect(SupportedGenderOptions.female).toBe('female')
        })

        it('should have other gender', () => {
            expect(SupportedGenderOptions.other).toBe('other')
        })

        it('should have exactly 3 genders', () => {
            const keys = Object.keys(SupportedGenderOptions)
            expect(keys.length).toBe(3)
        })
    })
})
