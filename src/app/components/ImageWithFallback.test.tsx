import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageWithFallback } from './ImageWithFallback';

describe('ImageWithFallback', () => {
  it('renders image when src is provided', () => {
    render(<ImageWithFallback src="https://example.com/ok.jpg" alt="Test" />);
    const img = screen.getByRole('img', { name: 'Test' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/ok.jpg');
  });

  it('shows fallback after image error', () => {
    render(<ImageWithFallback src="https://invalid.example/broken.jpg" alt="Broken" />);
    const img = screen.getByRole('img', { name: 'Broken' });
    fireEvent.error(img);
    expect(screen.getByAltText('Error loading image')).toBeInTheDocument();
  });
});
