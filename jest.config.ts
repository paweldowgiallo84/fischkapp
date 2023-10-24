import type { Config } from 'jest'

export default {
  rootDir: __dirname,
  setupFilesAfterEnv: ['<rootDir>/jest.config.ts'],
  setupFiles: ['<rootDir>/jest.polyfills.ts'],
  transform: {
    '^.+\\.tsx?$': '@swc/jest',
    "^.+\\.svg$": "<rootDir>/src/svgTransform.cjs"
  },
  moduleNameMapper: {    
    // "\\.(svg)$": '<rootDir>/mock/mock.ts',
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
  },
  globals: { fetch},
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    /**
     * @note Opt-out from JSDOM using browser-style resolution
     * for dependencies. This is simply incorrect, as JSDOM is
     * not a browser, and loading browser-oriented bundles in
     * Node.js will break things.
     *
     * Consider migrating to a more modern test runner if you
     * don't want to deal with this.
     */
    customExportConditions: [''],
  },
} satisfies Config