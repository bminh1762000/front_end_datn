import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactItem from '../ContactItem';

describe('ContactItem', () => {
    it('renders contact form with input fields and submit button', () => {
        render(<ContactItem />);
        const nameInput = screen.getByLabelText(/Tên/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const subjectInput = screen.getByLabelText(/Tiêu đề/i);
        const messageInput = screen.getByLabelText(/Nội dung/i);
        const submitButton = screen.getByRole('button', { name: /Send Email/i });

        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(subjectInput).toBeInTheDocument();
        expect(messageInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it('displays validation error message when input fields are not valid', async () => {
        render(<ContactItem />);
        const nameInput = screen.getByLabelText(/Tên/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const subjectInput = screen.getByLabelText(/Tiêu đề/i);
        const messageInput = screen.getByLabelText(/Nội dung/i);
        const submitButton = screen.getByRole('button', { name: /Send Email/i });

        fireEvent.change(nameInput, { target: { value: 'a' } });
        fireEvent.change(emailInput, { target: { value: 'invalid email' } });
        fireEvent.change(subjectInput, { target: { value: '' } });
        fireEvent.change(messageInput, { target: { value: '' } });

        fireEvent.click(submitButton);

        expect(await screen.findByText(/Must be 3 characters or more/i)).toBeInTheDocument();
        expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
        expect(await screen.findByText(/Required/i)).toBeInTheDocument();
    });

    it('submits form data when all input fields are valid', async () => {
        render(<ContactItem />);
        const nameInput = screen.getByLabelText(/Tên/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const subjectInput = screen.getByLabelText(/Tiêu đề/i);
        const messageInput = screen.getByLabelText(/Nội dung/i);
        const submitButton = screen.getByRole('button', { name: /Send Email/i });

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
        fireEvent.change(subjectInput, { target: { value: 'Test subject' } });
        fireEvent.change(messageInput, { target: { value: 'Test message' } });

        fireEvent.click(submitButton);

        // Add your own assertion here to test the submission of form data
    });
});
