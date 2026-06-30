import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('birthday puzzle flow', () => {
  it('reveals the doors one by one and shows the reveal screen', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText(/four locked doors/i)).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /begin/i }));
    await user.click(screen.getByRole('button', { name: /door 1/i }));
    await user.type(screen.getByLabelText(/enter your answer/i), 'one wish willow');
    await user.click(screen.getByRole('button', { name: /check answer/i }));

    await user.click(screen.getByRole('button', { name: /door 2/i }));
    await user.click(screen.getByRole('button', { name: /big bend national park/i }));

    await user.click(screen.getByRole('button', { name: /door 3/i }));
    await user.type(screen.getByLabelText(/enter your answer/i), 'rhaenyra');
    await user.click(screen.getByRole('button', { name: /check answer/i }));

    await user.click(screen.getByRole('button', { name: /door 4/i }));
    await user.type(screen.getByLabelText(/enter your answer/i), 'harvey');
    await user.keyboard('{Enter}');

    expect(screen.getByText(/happy birthday/i)).toBeTruthy();
  });
});
