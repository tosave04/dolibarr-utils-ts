module.exports = {
	/**
	 * This option specifies the preset to use for ts-jest.
	 * The default-esm preset is designed to work with ECMAScript Modules (ES Modules).
	 * It automatically configures Jest and ts-jest to treat TypeScript files as ES modules.
	 */
	preset: "ts-jest",

	/**
	 * This option sets the test environment to use.
	 * In this case, node means that Jest will use a Node.js environment to run the tests.
	 * This is suitable for most backend tests or Node.js library tests.
	 */
	testEnvironment: "node",

	/**
	 * The testMatch configuration option in Jest specifies the glob patterns Jest uses to detect test files.
	 * By defining this option, you can control which files Jest considers as test files to be executed.
	 */
	testMatch: ["**/tests/**/*.test.ts"],

	/**
	 * This option tells Jest to treat certain file extensions as ES modules.
	 * By default, Jest treats .ts files as TypeScript code, but not necessarily as ES modules.
	 * This option is useful if you have files with particular extensions that you want to explicitly treat as ES modules.
	 */
	extensionsToTreatAsEsm: [".ts"],

	/**
	 * This option configures the mapping of module names.
	 * It tells Jest to map imports ending in .js to their equivalents without the .js extension.
	 * For example, an import like import { Dolibarr } from './dolibarr.class.js'; will be mapped to import { Dolibarr } from './dolibarr.class';.
	 */
	moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
}
