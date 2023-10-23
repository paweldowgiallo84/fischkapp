module.exports = {
    // ... other Jest configurations
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],

    "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"],

    moduleNameMapper: {        
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            'identity-obj-proxy',
        '\\.(svg)$': 'jest-svg-transformer',
        '^.+\\.(css|less)$': '<rootDir>/mockFiles/cssstub.js'
    },

    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

    transform: {
        "^.+\\.(js|jsx|ts|cjs|mjs|esm)$": "babel-jest",
        "^.+\\.tsx?$": "ts-jest"
    },   

    testEnvironment: 'jsdom',
};