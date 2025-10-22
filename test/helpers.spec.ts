import * as helpers from '../src/helpers'
import { ClientData, type ClientDataInput } from '../src/index'
import clientDataset from './mock/clientDataset'

describe('helpers', () => {
    it('getStringOrNull should pass', () => {
        const testData: Array<{ input?: unknown, expect: string | null }> = [
            {
                input: '',
                expect: null
            },
            {
                input: '  ',
                expect: null
            },
            {
                input: 'asdf',
                expect: 'asdf'
            },
            {
                input: 10,
                expect: '10'
            },
            {
                // input undefined
                expect: null
            },
            {
                input: {},
                expect: '{}'
            },
            {
                input: NaN,
                expect: 'NaN'
            },
            {
                input: new Date('2019-02-14T12:00:00.000Z'),
                expect: '2019-02-14T12:00:00.000Z'
            }
        ]
        for (const testCase of testData) {
            expect(helpers.getStringOrNull(testCase.input)).toBe(testCase.expect)
        }
    })

    it('getValidDate should pass', () => {
        const testData = [
            {
                input: new Date('2019-02-14T12:00:00.000Z'),
                expect: new Date('2019-02-14T12:00:00.000Z')
            },
            {
                input: '2019-02-14T12:00:00.000Z',
                expect: new Date('2019-02-14T12:00:00.000Z')
            }
        ]
        for (const testCase of testData) {
            expect(helpers.getValidDate(testCase.input).toISOString()).toBe(testCase.expect.toISOString())
        }

        const invalidDate = helpers.getValidDate('1+ěšřěšfascsd')
        expect({
            day: invalidDate.getDay(),
            year: invalidDate.getFullYear(),
            month: invalidDate.getMonth()
        }).toEqual({
            day: (new Date()).getDay(),
            year: (new Date()).getFullYear(),
            month: (new Date()).getMonth()
        })
    })

    it('isESClass should pass', () => {
        expect(helpers.isESClass(String)).toBe(true)
        expect(helpers.isESClass(ClientData)).toBe(true)
        expect(helpers.isESClass('asdf')).toBe(false)
        expect(helpers.isESClass({ cosika: 'kdesika' })).toBe(false)
        expect(helpers.isESClass(null)).toBe(false)
    })

    it('getInstanceOfClass should pass', () => {
        expect(helpers.getInstanceOfClass(new ClientData(clientDataset as Partial<ClientDataInput>), ClientData)).toEqual(new ClientData(clientDataset as Partial<ClientDataInput>))
        expect(helpers.getInstanceOfClass(clientDataset, ClientData)).toEqual(new ClientData(clientDataset as Partial<ClientDataInput>))
        expect(helpers.getInstanceOfClass('hovna na inputu', ClientData) instanceof ClientData).toBe(true)
        expect(helpers.getInstanceOfClass(undefined, ClientData) instanceof ClientData).toBe(true)
        expect(helpers.getInstanceOfClass(null, ClientData) instanceof ClientData).toBe(true)
        expect(helpers.getInstanceOfClass(new Date(), ClientData) instanceof ClientData).toBe(true)
        expect(helpers.getInstanceOfClass(new Date(), Date) instanceof Date).toBe(true)
    })

    describe('getNormalizedDate', () => {
        it('should normalize Date object to 12:00:00.000Z', () => {
            const input = new Date('2019-02-14T08:30:15.500Z')
            const result = helpers.getNormalizedDate(input)
            expect(result.toISOString()).toBe('2019-02-14T12:00:00.000Z')
        })

        it('should handle date-only string format', () => {
            const result = helpers.getNormalizedDate('2019-02-14')
            expect(result.toISOString()).toBe('2019-02-14T12:00:00.000Z')
        })

        it('should normalize full datetime string to 12:00:00.000Z', () => {
            const result = helpers.getNormalizedDate('2019-02-14T08:30:15.500Z')
            expect(result.toISOString()).toBe('2019-02-14T12:00:00.000Z')
        })

        it('should handle date string with spaces', () => {
            const result = helpers.getNormalizedDate(' 2019-02-14 ')
            expect(result.toISOString()).toBe('2019-02-14T12:00:00.000Z')
        })

        it('should return current date for invalid date when throwInvalid is false', () => {
            const result = helpers.getNormalizedDate('invalid-date', false)
            const now = new Date()
            expect(result.getDate()).toBe(now.getDate())
            expect(result.getMonth()).toBe(now.getMonth())
            expect(result.getFullYear()).toBe(now.getFullYear())
        })

        it('should throw error for invalid date when throwInvalid is true', () => {
            expect(() => helpers.getNormalizedDate('invalid-date', true)).toThrow('Input date is invalid')
        })

        it('should handle null with throwInvalid false', () => {
            const result = helpers.getNormalizedDate(null, false)
            expect(result).toBeInstanceOf(Date)
        })

        it('should throw error for null when throwInvalid is true', () => {
            expect(() => helpers.getNormalizedDate(null, true)).toThrow('Input date is invalid')
        })
    })

    describe('transformDataBeforeValidation', () => {
        it('should convert Date objects to ISO strings', () => {
            const input = {
                date: new Date('2019-02-14T12:00:00.000Z'),
                string: 'test'
            }
            const result = helpers.transformDataBeforeValidation(input)
            expect(result.date).toBe('2019-02-14T12:00:00.000Z')
            expect(result.string).toBe('test')
        })

        it('should recursively transform nested objects', () => {
            const input = {
                nested: {
                    date: new Date('2019-02-14T12:00:00.000Z'),
                    value: 123
                }
            }
            const result = helpers.transformDataBeforeValidation(input)
            expect(result.nested.date).toBe('2019-02-14T12:00:00.000Z')
            expect(result.nested.value).toBe(123)
        })

        it('should transform dates in arrays', () => {
            const input = {
                dates: [
                    new Date('2019-02-14T12:00:00.000Z'),
                    new Date('2020-03-15T12:00:00.000Z')
                ]
            }
            const result = helpers.transformDataBeforeValidation(input)
            expect(result.dates[0]).toBe('2019-02-14T12:00:00.000Z')
            expect(result.dates[1]).toBe('2020-03-15T12:00:00.000Z')
        })

        it('should handle arrays of objects with dates', () => {
            const input = {
                items: [
                    { date: new Date('2019-02-14T12:00:00.000Z'), name: 'first' },
                    { date: new Date('2020-03-15T12:00:00.000Z'), name: 'second' }
                ]
            }
            const result = helpers.transformDataBeforeValidation(input)
            expect(result.items[0].date).toBe('2019-02-14T12:00:00.000Z')
            expect(result.items[1].date).toBe('2020-03-15T12:00:00.000Z')
        })

        it('should preserve non-date values', () => {
            const input = {
                string: 'test',
                number: 123,
                boolean: true,
                nullValue: null
            }
            const result = helpers.transformDataBeforeValidation(input)
            expect(result).toEqual(input)
        })
    })

    describe('getValidDate with throwInvalid', () => {
        it('should throw error for invalid date when throwInvalid is true', () => {
            expect(() => helpers.getValidDate('invalid', true)).toThrow('Input date is invalid')
        })

        it('should throw error for null when throwInvalid is true', () => {
            expect(() => helpers.getValidDate(null, true)).toThrow('Input date is invalid')
        })

        it('should throw error for undefined when throwInvalid is true', () => {
            expect(() => helpers.getValidDate(undefined, true)).toThrow('Input date is invalid')
        })
    })
})
