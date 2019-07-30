import AddressInformation from './AddressInformation.js'
import ContactInformation from './ContactInformation.js'
import BankingInformation from './BankingInformation.js'
import PersonalInformation, { genderOptions } from './PersonalInformation.js'
import ClientInformation from './ClientInformation.js'
import IdCardInformation from './IdCardInformation.js'
import CompanyInformation from './CompanyInformation.js'
import Representative from './Representative.js'
import Address from './Address.js'
import InvestmentProfile from './InvestmentProfile.js'
import InvestmentService from './InvestmentService.js'

import ClientData, {
    PLAIN_OBJECT_KEY_CLIENT,
    PLAIN_OBJECT_KEY_PERSONAL,
    PLAIN_OBJECT_KEY_ID_CARD,
    PLAIN_OBJECT_KEY_CONTACT,
    PLAIN_OBJECT_KEY_BANK_ACCOUNT,
    PLAIN_OBJECT_KEY_ADDRESS,
    PLAIN_OBJECT_KEY_COMPANY,
    PLAIN_OBJECT_KEYS,
    ADDRESS_TYPE_REGULAR,
    ADDRESS_TYPE_MAILING,
    CLIENT_TYPE_PERSON,
    CLIENT_TYPE_COMPANY,
    CLIENT_TYPE_SELFEMPLOYED,
    CLIENT_ORIGIN_INTERNAL,
    CLIENT_ORIGIN_CAPITOL,
    CLIENT_ORIGIN_CRM,
    CLIENT_ORIGIN_WEB,
    CLIENT_TYPES,
    CLIENT_ORIGINS
} from './ClientData'
import ClientDataMap from './ClientDataMap.js'
import helpers from './helpers'

export default {
    Address,
    BankingInformation,
    ContactInformation,
    ClientData,
    ClientDataMap,
    PersonalInformation,
    IdCardInformation,
    ClientInformation,
    AddressInformation,
    CompanyInformation,
    Representative,
    InvestmentProfile,
    InvestmentService,
    helpers,
    PLAIN_OBJECT_KEY_CLIENT,
    PLAIN_OBJECT_KEY_PERSONAL,
    PLAIN_OBJECT_KEY_ID_CARD,
    PLAIN_OBJECT_KEY_CONTACT,
    PLAIN_OBJECT_KEY_BANK_ACCOUNT,
    PLAIN_OBJECT_KEY_ADDRESS,
    PLAIN_OBJECT_KEY_COMPANY,
    PLAIN_OBJECT_KEYS,
    ADDRESS_TYPE_REGULAR,
    ADDRESS_TYPE_MAILING,
    CLIENT_TYPE_PERSON,
    CLIENT_TYPE_COMPANY,
    CLIENT_TYPE_SELFEMPLOYED,
    CLIENT_ORIGIN_INTERNAL,
    CLIENT_ORIGIN_CAPITOL,
    CLIENT_ORIGIN_CRM,
    CLIENT_ORIGIN_WEB,
    CLIENT_TYPES,
    CLIENT_ORIGINS,
    genderOptions
}