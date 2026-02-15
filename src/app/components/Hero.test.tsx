import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders Fish Resort title and description', () => {
    render(<Hero searchQuery="" onSearchChange={() => {}} />);
    expect(screen.getByText('Fish Resort')).toBeInTheDocument();
    expect(screen.getByText(/Ресторан на свежем воздухе/)).toBeInTheDocument();
  });

  it('renders search input with placeholder', () => {
    render(<Hero searchQuery="" onSearchChange={() => {}} />);
    expect(screen.getByPlaceholderText('Поиск по меню...')).toBeInTheDocument();
  });

  it('calls onSearchChange when input changes', () => {
    const onSearchChange = vi.fn();
    render(<Hero searchQuery="" onSearchChange={onSearchChange} />);
    const input = screen.getByPlaceholderText('Поиск по меню...');
    fireEvent.change(input, { target: { value: 'салат' } });
    expect(onSearchChange).toHaveBeenCalledWith('салат');
  });

  it('displays searchQuery value', () => {
    render(<Hero searchQuery="плов" onSearchChange={() => {}} />);
    expect(screen.getByDisplayValue('плов')).toBeInTheDocument();
  });
});
