module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    testMatch: ['**/*.test.ts'],
    modulePaths: ['<rootDir>/src'],
    // collectCoverage: true,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
};