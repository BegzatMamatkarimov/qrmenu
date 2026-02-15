import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MenuCard } from './MenuCard';

const defaultProps = {
  name: 'Цезарь',
  price: 1600,
  description: 'Классический салат с курицей',
  ingredients: 'Салат, курица, пармезан',
  image: 'https://example.com/caesar.jpg',
};

describe('MenuCard', () => {
  it('renders name, price, description and ingredients', () => {
    render(<MenuCard {...defaultProps} />);
    expect(screen.getByText('Цезарь')).toBeInTheDocument();
    expect(screen.getByText('1600 ₸')).toBeInTheDocument();
    expect(screen.getByText('Классический салат с курицей')).toBeInTheDocument();
    expect(screen.getByText('Салат, курица, пармезан')).toBeInTheDocument();
  });

  it('renders weight when provided', () => {
    render(<MenuCard {...defaultProps} weight="250гр" />);
    expect(screen.getByText('250гр')).toBeInTheDocument();
  });

  it('does not render weight when not provided', () => {
    render(<MenuCard {...defaultProps} />);
    expect(screen.queryByText(/гр/)).not.toBeInTheDocument();
  });

  it('renders image with correct alt', () => {
    render(<MenuCard {...defaultProps} />);
    const img = screen.getByRole('img', { name: 'Цезарь' });
    expect(img).toHaveAttribute('src', 'https://example.com/caesar.jpg');
  });
});
