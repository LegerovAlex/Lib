import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckBox from './CheckBox';
import { CheckBoxProps } from './CheckBox.props';

export interface RenderCheckBoxResult {
  checkBox: HTMLElement;
  onChange: jest.Mock;
}

export function renderCheckBox(props: Partial<CheckBoxProps> = {}): RenderCheckBoxResult {
  const onChange = jest.fn();

  render(<CheckBox {...props} checked={props.checked ?? false} onChange={onChange} />);

  const checkBox = screen.getByRole('checkbox');

  return { checkBox, onChange };
}

describe('CheckBox', () => {
  it('renders the checkbox', () => {
    const { checkBox } = renderCheckBox();
    expect(checkBox).toBeInTheDocument();
  });
  it('renders the label when provided', () => {
    renderCheckBox({ label: 'I agree' });
    const label = screen.getByText(/I agree/i);
    expect(label).toBeInTheDocument();
  });
  it('does not render label when not provided', () => {
    renderCheckBox({ label: undefined });
    const label = screen.queryByLabelText(/./);
    expect(label).not.toBeInTheDocument();
  });
  it('associates label with checkbox', () => {
    const { checkBox } = renderCheckBox({ label: 'I agree' });
    const label = screen.getByLabelText(/I agree/i);
    expect(label).toBe(checkBox);
  });
  it('shows "*" next to the label when required', () => {
    renderCheckBox({ label: 'Agree to Terms', required: true });
    const label = screen.getByText(/Agree to Terms \*/i);
    expect(label).toBeInTheDocument();
  });
  it('does not show "*" next to the label when not required', () => {
    renderCheckBox({ label: 'Agree to Terms' });
    const label = screen.queryByText(/Agree to Terms \*/i);
    expect(label).not.toBeInTheDocument();
  });
  it('is checked when checked=true', () => {
    const { checkBox } = renderCheckBox({ checked: true });
    expect(checkBox).toBeChecked();
  });

  it('is not checked when checked=false', () => {
    const { checkBox } = renderCheckBox({ checked: false });
    expect(checkBox).not.toBeChecked();
  });
  it('calls onChange when clicked', async () => {
    const { checkBox, onChange } = renderCheckBox();
    await userEvent.click(checkBox);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
  it('does not call onChange  when disabled', async () => {
    const { checkBox, onChange } = renderCheckBox({ disabled: true });
    expect(checkBox).toBeDisabled();
    await userEvent.click(checkBox);
    expect(onChange).not.toHaveBeenCalled();
  });
});
