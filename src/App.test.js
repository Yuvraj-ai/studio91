import { render, screen } from '@testing-library/react';
import App from './App';

describe('Studio91 Application', () => {
  test('renders studio branding and navigation links', () => {
    render(<App />);

    // Brand emblem & text
    const brandElements = screen.getAllByText(/Studio/i);
    expect(brandElements.length).toBeGreaterThan(0);

    // Navigation links exist across page
    expect(screen.getAllByRole('link', { name: /about/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /apps/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /campaigns/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /team/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /contact/i }).length).toBeGreaterThan(0);
  });

  test('renders flagship product and founding team', () => {
    render(<App />);

    // Product Slow
    expect(screen.getByText('Slow')).toBeInTheDocument();
    expect(screen.getByText(/Less noise\. More clarity\./i)).toBeInTheDocument();

    // Founding team
    expect(screen.getByText('Rahul Sharma')).toBeInTheDocument();
    expect(screen.getByText('Virendra Chaudhary')).toBeInTheDocument();
  });

  test('renders core studio principles', () => {
    render(<App />);

    expect(screen.getAllByText(/Humanistic Minimalism/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Spacious Restraint/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Intentional Warmth/i).length).toBeGreaterThan(0);
  });
});
