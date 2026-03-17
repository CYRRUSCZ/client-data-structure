import type { Config } from 'jest'

const config: Config = {
    roots: ['<rootDir>/test'],
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs'],
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)',
    ],
    transform: {
        '^.+\\.ts$': ['ts-jest', {
            useESM: true,
            tsconfig: {
                module: 'ES2022',
                moduleResolution: 'node',
            },
        }],
        '^.+\\.m?js$': ['ts-jest', {
            useESM: true,
            tsconfig: {
                allowJs: true,
                module: 'ES2022',
                moduleResolution: 'node',
            },
        }],
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(cdigit|ibantools|libphonenumber-js))',
    ],
    extensionsToTreatAsEsm: ['.ts'],
    coverageProvider: 'v8',
}

export default config
