
import { test, expect } from '@playwright/test';
import { StringUtils } from './app';

test.describe('StringUtils', () => {
  test('should reverse a string correctly', () => {
    expect(StringUtils.reverse('hello')).toBe('olleh');
  });

  test('should return an empty string for an empty input', () => {
    expect(StringUtils.reverse('')).toBe('');
  });

  test('should handle palindromes correctly', () => {
    expect(StringUtils.reverse('madam')).toBe('madam');
  });

  test('should handle strings with special characters', () => {
    expect(StringUtils.reverse('!@#$%^&*()')).toBe(')(*&^%$#@!');
  });

  test('should throw an error for non-string input', () => {
    expect(() => StringUtils.reverse(123 as any)).toThrow(new TypeError('Input must be a string.'));
  });
});
