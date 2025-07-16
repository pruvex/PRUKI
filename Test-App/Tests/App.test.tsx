import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import React from 'react';
import { App } from '../../modules-meta/core.app-shell/renderer/main';

test('App renders correctly', () => {
  render(<App />);
  expect(screen.getByText('Hello from Pruki!')).toBeInTheDocument();
});