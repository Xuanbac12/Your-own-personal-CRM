import { render, screen, fireEvent } from '@testing-library/react';
import { CustomerList } from '../CustomerList';
import { vi } from 'vitest';
import { describe, it, expect, beforeEach } from 'vitest';




describe('CustomerList', () => {
  const mockCustomers = [
    {
      id: '1',
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      customerTypeNames: ['VIP'],
      tagNames: ['Important', 'New'],
    },
    {
      id: '2',
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '0987654321',
      customerTypeNames: ['Regular'],
      tagNames: ['Loyal'],
    },
  ];

  const mockHandlers = {
    onView: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders empty state when no customers', () => {
    render(<CustomerList customers={[]} {...mockHandlers} />);
    
    expect(screen.getByText(/Không tìm thấy khách hàng/i)).toBeInTheDocument();
  });

  it('renders customer list correctly', () => {
    render(<CustomerList customers={mockCustomers} {...mockHandlers} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('VIP')).toBeInTheDocument();
  });

  it('handles view action', () => {
    render(<CustomerList customers={mockCustomers} {...mockHandlers} />);
    
    const viewButtons = screen.getAllByRole('button', { name: /menu/i });
    fireEvent.click(viewButtons[0]);
    
    const viewOption = screen.getByText('Xem chi tiết');
    fireEvent.click(viewOption);
    
    expect(mockHandlers.onView).toHaveBeenCalledWith('1');
  });

  it('handles edit action', () => {
    render(<CustomerList customers={mockCustomers} {...mockHandlers} />);
    
    const menuButtons = screen.getAllByRole('button', { name: /menu/i });
    fireEvent.click(menuButtons[0]);
    
    const editOption = screen.getByText('Chỉnh sửa');
    fireEvent.click(editOption);
    
    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockCustomers[0]);
  });

  it('handles delete action', () => {
    render(<CustomerList customers={mockCustomers} {...mockHandlers} />);
    
    const menuButtons = screen.getAllByRole('button', { name: /menu/i });
    fireEvent.click(menuButtons[0]);
    
    const deleteOption = screen.getByText('Xóa');
    fireEvent.click(deleteOption);
    
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockCustomers[0]);
  });

  it('displays customer tags correctly', () => {
    render(<CustomerList customers={mockCustomers} {...mockHandlers} />);
    
    expect(screen.getByText('Important')).toBeInTheDocument();
    expect(screen.getByText('Loyal')).toBeInTheDocument();
  });

  it('closes menu when clicking outside', () => {
    render(<CustomerList customers={mockCustomers} {...mockHandlers} />);
    
    const menuButton = screen.getAllByRole('button', { name: /menu/i })[0];
    fireEvent.click(menuButton);
    
    expect(screen.getByText('Xem chi tiết')).toBeInTheDocument();
    
    fireEvent.click(document.body);
    
    expect(screen.queryByText('Xem chi tiết')).not.toBeInTheDocument();
  });
});