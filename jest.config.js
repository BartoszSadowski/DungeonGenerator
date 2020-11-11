module.exports = {
    roots: [
        '<rootDir>/src'
    ],
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)'
    ],
    transform: {
        '^.+\\.(ts|tsx)': 'ts-jest'
    },
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'src/app/**/*.+(ts|tsx|js)',
        'src/utils/**/*.+(ts|tsx|js)',
        'src/main.ts'
    ]
};
