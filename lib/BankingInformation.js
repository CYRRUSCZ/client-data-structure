class BankingInformation {

    constructor(prefix, account, code, currency, iban, swift, bank_name_address, account_name) {
        this._prefix = typeof prefix === 'undefined' ? null : prefix;
        this._account = typeof account === 'undefined' ? null : account;
        this._code = typeof code === 'undefined' ? null : code;
        this._currency = typeof currency === 'undefined' ? null : currency;
        this._iban = typeof iban === 'undefined' ? null : iban;
        this._swift = typeof swift === 'undefined' ? null : swift;
        this._bank_name_address = typeof bank_name_address === 'undefined' ? null : bank_name_address;
        this._account_name = typeof account_name === 'undefined' ? null : account_name;
    }

    get prefix() {
        return this._prefix;
    }

    get account() {
        return this._account;
    }

    get code() {
        return this._code;
    }

    get currency() {
        return this._currency;
    }

    get iban() {
        return this._iban;
    }

    get swift() {
        return this._swift;
    }

    get bank_name_address() {
        return this._bank_name_address;
    }

    get account_name() {
        return this._account_name;
    }

    toPlainObject() {
        return {
            prefix: this.prefix,
            account: this.account,
            code: this.code,
            currency: this.currency,
            iban: this.iban,
            swift: this.swift,
            bank_name_address: this.bank_name_address,
            account_name: this.account_name,
        }
    }

    static fromPlainObject(obj) {
        return new BankingInformation(
            obj.prefix,
            obj.account,
            obj.code,
            obj.currency,
            obj.iban,
            obj.swift,
            obj.bank_name_address,
            obj.account_name
        )
    }
}

module.exports = BankingInformation