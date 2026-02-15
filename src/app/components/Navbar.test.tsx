import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './Navbar';

const categories = [
  { id: 'salads', label: 'Салаты' },
  { id: 'drinks', label: 'Напитки' },
];

describe('Navbar', () => {
  it('renders all category buttons', () => {
    render(
      <Navbar
        categories={categories}
        activeCategory="salads"
        onCategoryChange={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: 'Салаты' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Напитки' })).toBeInTheDocument();
  });

  it('calls onCategoryChange when category is clicked', () => {
    const onCategoryChange = vi.fn();
    render(
      <Navbar
        categories={categories}
        activeCategory="salads"
        onCategoryChange={onCategoryChange}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Напитки' }));
    expect(onCategoryChange).toHaveBeenCalledWith('drinks');
  });
});
