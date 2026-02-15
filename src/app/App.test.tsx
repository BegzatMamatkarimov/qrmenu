import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders Fish Resort and menu content', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Fish Resort' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Салаты' })).toBeInTheDocument();
    expect(screen.getByText('Ачучук')).toBeInTheDocument();
  });

  it('filters menu by search query', () => {
    render(<App />);
    const search = screen.getByPlaceholderText('Поиск по меню...');
    fireEvent.change(search, { target: { value: 'плов' } });
    expect(screen.getByText('Плов')).toBeInTheDocument();
  });

  it('shows nothing found when search has no matches', () => {
    render(<App />);
    const search = screen.getByPlaceholderText('Поиск по меню...');
    fireEvent.change(search, { target: { value: 'xyznonexistent' } });
    expect(screen.getByText('Ничего не найдено...')).toBeInTheDocument();
  });

  it('shows drinks when category Напитки is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Напитки' }));
    expect(screen.getByText('Coca Cola')).toBeInTheDocument();
  });
});
