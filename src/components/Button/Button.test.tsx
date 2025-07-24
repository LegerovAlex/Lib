import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';
import { ButtonProps } from './Button.props';

export interface RenderButtonResult {
  button: HTMLElement;
  onClick: jest.Mock;
}

export function renderButton(props: Partial<ButtonProps> = {}): RenderButtonResult {
  const onClick = jest.fn();
  render(
    <Button {...props} onClick={onClick}>
      {props.children ?? 'Test'}
    </Button>,
  );
  const button = screen.getByRole('button');
  return { button, onClick };
}

describe('Button', () => {
  it('renders with children', () => {
    const { button } = renderButton({ children: 'Hello' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Hello');
  });
  it('applies default variant and size classes', () => {
    const { button } = renderButton();
    expect(button).toHaveClass('button', 'button_contained', 'button_medium');
  });
  it('applies custom variant and size classes', () => {
    const { button } = renderButton({ variant: 'outlined', size: 'large' });
    expect(button).toHaveClass('button', 'button_outlined', 'button_large');
  });
  it('calls onClick when clicked', () => {
    const { button, onClick } = renderButton();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('doesn not call onClick When disabled', () => {
    const { button, onClick } = renderButton({ disabled: true });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
