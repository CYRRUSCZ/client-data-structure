export function getValidDate (inputDate, throwInvalid = false) {
    if (inputDate instanceof Date) {
        return inputDate
    } else if (typeof inputDate === 'string') {
        const date = new Date(inputDate)
        if (date instanceof Date && !isNaN(date)) {
            return date
        }
    }
    if (throwInvalid) {
        throw new Error('Input date is invalid')
    }
    return new Date()
}

export function getNormalizedDate (inputDate, throwInvalid = false) {
    console.log(inputDate)
    console.log(typeof inputDate)
    if (inputDate instanceof Date) {
        return inputDate
    } else if (typeof inputDate === 'string') {
        if (inputDate.length === 11 && /(\d{4}-\d{2}-\d{2})/ig.test(inputDate.replace(/\s/ig, ''))) {
            inputDate = `${inputDate.replace(/\s/ig, '')}T12:00:00.000Z`
        }
        if (inputDate.length === 24) {
            inputDate = `${inputDate.split('T')[0]}T12:00:00.000Z`
        }
        console.log(inputDate)
        const date = new Date(inputDate)
        console.log(date)
        if (date instanceof Date && !isNaN(date)) {
            console.log('returning date')
            return date
        }
    }
    if (throwInvalid) {
        throw new Error('Input date is invalid')
    }
    return new Date()
}

export function getStringOrNull (input) {
    if (input === undefined || input === null) {
        return null
    }
    if (input instanceof Date) {
        return input.toISOString()
    }
    const output = (`${input}`).trim()
    return (output.length > 0) ? output : null
}

export function isESClass (input) {
    return (
        (typeof input === 'function') &&
        (typeof input.constructor === 'function')
    )
}

export function getInstanceOfClass (input, ClassInstancePrototype) {
    if (input === undefined || input === null) {
        return new ClassInstancePrototype()
    }

    if (isESClass(input) && (input.constructor.name === ClassInstancePrototype.prototype.constructor.name)) {
        return input
    }

    if (input instanceof ClassInstancePrototype) {
        return input
    }

    return new ClassInstancePrototype(input)
}
