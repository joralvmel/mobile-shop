import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '@/components/product/SearchBox';

describe('SearchBox', () => {
  it('should render search input with placeholder', () => {
    const mockOnChange = vi.fn();
    render(
      <SearchBox
        value=""
        onChange={mockOnChange}
        placeholder="Search by brand..."
      />
    );

    const input = screen.getByPlaceholderText('Search by brand...');
    expect(input).toBeInTheDocument();
  });

  it('should call onChange when user types', async () => {
    const mockOnChange = vi.fn();
    const user = userEvent.setup();

    render(
      <SearchBox
        value=""
        onChange={mockOnChange}
        placeholder="Search..."
      />
    );

    const input = screen.getByPlaceholderText('Search...');

    await user.type(input, 'test');
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange.mock.calls.length).toBeGreaterThan(0);
  });

  it('should display current value', () => {
    const mockOnChange = vi.fn();
    render(
      <SearchBox
        value="Samsung"
        onChange={mockOnChange}
        placeholder="Search..."
      />
    );

    const input = screen.getByDisplayValue('Samsung') as HTMLInputElement;
    expect(input.value).toBe('Samsung');
  });

  it('should use default placeholder when not provided', () => {
    const mockOnChange = vi.fn();
    render(
      <SearchBox
        value=""
        onChange={mockOnChange}
      />
    );

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });
});
