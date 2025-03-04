const { helpers, ClientData } = require('./client-data-structure.cjs')
const clientDataset = require('./mock/clientDataset.js')

describe('helpers', () => {
    it('getStringOrNull should pass', () => {
        const testData = [
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
        expect(helpers.getInstanceOfClass(new ClientData(clientDataset), ClientData)).toEqual(new ClientData(clientDataset))
        expect(helpers.getInstanceOfClass(clientDataset, ClientData)).toEqual(new ClientData(clientDataset))
        expect(helpers.getInstanceOfClass('hovna na inputu', ClientData) instanceof ClientData).toBe(true)
        expect(helpers.getInstanceOfClass(undefined, ClientData) instanceof ClientData).toBe(true)
        expect(helpers.getInstanceOfClass(null, ClientData) instanceof ClientData).toBe(true)
        expect(helpers.getInstanceOfClass(new Date(), ClientData) instanceof ClientData).toBe(true)
        expect(helpers.getInstanceOfClass(new Date(), Date) instanceof Date).toBe(true)
    })
})
