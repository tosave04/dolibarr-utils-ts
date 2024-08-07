module.exports = {
	/**
	 * This option specifies the preset to use for ts-jest.
	 * The default-esm preset is designed to work with ECMAScript Modules (ES Modules).
	 * It automatically configures Jest and ts-jest to treat TypeScript files as ES modules.
	 */
	preset: "ts-jest/presets/default-esm",

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
	 * This section allows you to pass specific configurations to ts-jest.
	 * The useESM: true option tells ts-jest to use ES modules for TypeScript files.
	 * This may be necessary if you have compatibility issues with ES modules.
	 */
	globals: { "ts-jest": { useESM: true } },
	moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
}
