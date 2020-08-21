/* global describe, it */

const { helpers, ClientData } = require('../dist/clientdatastructure')
const clientDataset = require('./mock/clientDataset.js')
const test = require('unit.js')

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
                expect: '[object Object]'
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
            test.assert.equal(helpers.getStringOrNull(testCase.input), testCase.expect)
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
            test.assert.equal(helpers.getValidDate(testCase.input).toISOString(), testCase.expect.toISOString())
        }

        const invalidDate = helpers.getValidDate('1+ěšřěšfascsd')
        test.assert.deepEqual({
            day: invalidDate.getDay(),
            year: invalidDate.getFullYear(),
            month: invalidDate.getMonth()
        }, {
            day: (new Date()).getDay(),
            year: (new Date()).getFullYear(),
            month: (new Date()).getMonth()
        })
    })

    it('isESClass should pass', () => {
        test.assert.equal(helpers.isESClass(String), true)
        test.assert.equal(helpers.isESClass(ClientData), true)
        test.assert.equal(helpers.isESClass('asdf'), false)
        test.assert.equal(helpers.isESClass({ cosika: 'kdesika' }), false)
        test.assert.equal(helpers.isESClass(null), false)
    })

    it('getInstanceOfClass should pass', () => {
        test.assert.deepEqual(helpers.getInstanceOfClass(new ClientData(clientDataset), ClientData), new ClientData(clientDataset))
        test.assert.deepEqual(helpers.getInstanceOfClass(clientDataset, ClientData), new ClientData(clientDataset))
        test.assert.equal((helpers.getInstanceOfClass('hovna na inputu', ClientData) instanceof ClientData), true)
        test.assert.equal((helpers.getInstanceOfClass(undefined, ClientData) instanceof ClientData), true)
        test.assert.equal((helpers.getInstanceOfClass(null, ClientData) instanceof ClientData), true)
        test.assert.equal((helpers.getInstanceOfClass(new Date(), ClientData) instanceof ClientData), true)
        test.assert.equal((helpers.getInstanceOfClass(new Date(), Date) instanceof Date), true)
    })
})
