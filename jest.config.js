module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    testMatch: ['**/*.test.ts'],
    modulePaths: ['<rootDir>/src'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
};