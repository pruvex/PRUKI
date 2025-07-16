import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from '../../../modules-meta/core.app-shell/renderer/main';

describe('App-Komponente', () => {
  it('zeigt das App-Ready-Element an', () => {
    render(<App />);
    expect(screen.getByTestId('app-ready')).toBeInTheDocument();
    expect(screen.getByText('Hello from Pruki!')).toBeInTheDocument();
  });
});
