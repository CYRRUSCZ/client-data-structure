export function validateMod11_10(input: string): boolean {
    if (!/^\d{2,}$/.test(input)) {
        return false
    }

    let remainder = 10
    for (const character of input.slice(0, -1)) {
        remainder = (remainder + Number(character)) % 10
        remainder = (remainder || 10) * 2 % 11
    }

    const checkDigit = (11 - remainder) % 10
    return checkDigit === Number(input.at(-1))
}
