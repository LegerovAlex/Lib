import { fireEvent, render, screen } from '@testing-library/react';
import { TextFieldProps } from './TextField. props';
import TextField from './TextField';

export interface RenderTextFieldResult {
  textField: HTMLElement;
  label?: HTMLElement | null;
  helperText?: HTMLElement | null;
  onChange: jest.Mock;
}

export function renderTextField(props: Partial<TextFieldProps> = {}): RenderTextFieldResult {
  const onChange = jest.fn();

  render(<TextField {...props} onChange={onChange} />);

  const textField = screen.getByRole('textbox');
  const label = props.label ? screen.queryByText(props.label) : null;
  const helperText = props.helperText ? screen.queryByText(props.helperText) : null;
  return { textField, onChange, label, helperText };
}

describe('TextField', () => {
  it('renders input and label when label is provided', () => {
    const { textField, label } = renderTextField({ label: 'Email' });
    expect(textField).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });
  it('renders input and hides label when label is not provided', () => {
    const { textField, label } = renderTextField({ label: undefined });
    expect(textField).toBeInTheDocument();
    expect(label).not.toBeInTheDocument();
  });
  it('shows placeholder when provided', () => {
    renderTextField({ placeholder: 'text' });
    expect(screen.getByPlaceholderText('text')).toBeInTheDocument();
  });
  it('shows helper text when error is true', () => {
    const { helperText } = renderTextField({ error: true, helperText: 'Email is required' });
    expect(helperText).toBeInTheDocument();
  });
  it('does not shows helper text when error is false', () => {
    const { helperText } = renderTextField({ error: false, helperText: 'Email is required' });
    expect(helperText).not.toBeInTheDocument();
  });
  it('calls onChange when typing', () => {
    const { onChange, textField } = renderTextField();
    fireEvent.change(textField, { target: { value: 'hello' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
  it('displays value when provided', () => {
    const { textField } = renderTextField({ value: 'Initial' });
    expect(textField).toHaveValue('Initial');
  });
  it('applies error class when error is true', () => {
    const { textField } = renderTextField({ error: true });
    expect(textField.parentElement).toHaveClass('error');
  });
});
