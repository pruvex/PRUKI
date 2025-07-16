
/**
 * A utility class for string manipulation.
 */
export class StringUtils {
  /**
   * Reverses a given string.
   *
   * @param str The string to reverse.
   * @returns The reversed string.
   * @throws {TypeError} If the input is not a string.
   */
  public static reverse(str: string): string {
    if (typeof str !== 'string') {
      throw new TypeError('Input must be a string.');
    }
    return str.split('').reverse().join('');
  }

  /**
   * Performs a self-check of the StringUtils module.
   * Throws an error if the self-check fails.
   */
  public static selfCheck(): void {
    const testCases = [
      { input: 'hello', expected: 'olleh' },
      { input: '', expected: '' },
      { input: 'madam', expected: 'madam' },
      { input: '!@#$%^&*()', expected: ')(*&^%$#@!' },
    ];

    for (const testCase of testCases) {
      const result = StringUtils.reverse(testCase.input);
      if (result !== testCase.expected) {
        throw new Error(
          `Self-check failed for input "${testCase.input}". Expected "${testCase.expected}", but got "${result}".`
        );
      }
    }

    try {
      StringUtils.reverse(123 as any);
      throw new Error('Self-check failed. Expected an error for non-string input, but none was thrown.');
    } catch (error: any) {
      if (!(error instanceof TypeError) || error.message !== 'Input must be a string.') {
        throw new Error(
          `Self-check failed. Expected TypeError with message "Input must be a string.", but got "${error.constructor.name}: ${error.message}".`
        );
      }
    }

    console.log('Self-check passed successfully.');
  }
}

// Run self-check if the module is executed directly
if (require.main === module) {
  StringUtils.selfCheck();
}
