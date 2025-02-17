import { Address } from './src'

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

switch (args[0]) {
    case 'address':
        address()
        break
}
