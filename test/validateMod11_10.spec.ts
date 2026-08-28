import { validateMod11_10 } from '../src/validateMod11_10'

describe('validateMod11_10', () => {
    it.each([
        '69435151530',
        '33392005961'
    ])('accepts a valid checksum for %s', (input) => {
        expect(validateMod11_10(input)).toBe(true)
    })

    it.each([
        '69435151531',
        '',
        '0',
        '6943515153A'
    ])('rejects an invalid checksum for %s', (input) => {
        expect(validateMod11_10(input)).toBe(false)
    })
})
