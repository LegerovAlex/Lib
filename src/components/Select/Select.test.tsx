import { render, screen } from '@testing-library/react';
import { SelectProps } from './Select.props';
import { Select } from './Select';
import userEvent from '@testing-library/user-event';

export interface RenderSelectResult {
  select: HTMLElement;
  onChange: jest.Mock;
}

export function renderSelect(props: Partial<SelectProps> = {}): RenderSelectResult {
  const onChange = jest.fn();

  const defaultProps: SelectProps = {
    label: 'Label',
    value: '',
    onChange,
    placeholder: 'Select...',
    disabled: false,
    options: [
      { id: 1, value: 'one', label: 'Option One' },
      { id: 2, value: 'two', label: 'Option Two' },
    ],
    ...props,
  };

  render(<Select {...defaultProps} />);

  const select = screen.getByRole('combobox');

  return { onChange, select };
}

describe('Select', () => {
  it('renders with placeholder when no value is selected', () => {
    const { select } = renderSelect();
    expect(select).toBeInTheDocument();
    expect(select).toHaveTextContent('Select...');
  });
  it('renders option label when value is provided', () => {
    const { select } = renderSelect({ value: 'one' });
    expect(select).toBeInTheDocument();
    expect(select).toHaveTextContent('Option One');
  });
  it('renders label when  is provided', () => {
    renderSelect({ label: 'Test Label' });
    const lable = screen.getByText('Test Label');
    expect(lable).toBeInTheDocument();
  });
  it('toggles menu when on click', async () => {
    const { select } = renderSelect();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    await userEvent.click(select);
    expect(screen.getByRole('list')).toBeInTheDocument();
    await userEvent.click(select);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
  it('calls onChange with value when options is selected ', async () => {
    const { select, onChange } = renderSelect();
    await userEvent.click(select);
    const option = screen.getByText('Option One');
    await userEvent.click(option);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('one');
  });
  it('does not call onChange when disabled is provided', async () => {
    const { select, onChange } = renderSelect({ disabled: true });
    await userEvent.click(select);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });
  it('closes menu when clicking outside', async () => {
    const { select } = renderSelect();
    await userEvent.click(select);
    expect(screen.getByRole('list')).toBeInTheDocument();

    await userEvent.click(document.body);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
  it('matches snapshot when enabled', async () => {
    const { select } = renderSelect();
    await userEvent.click(select);
    expect(screen.getByRole('list')).toMatchSnapshot();
  });
  it('matches snapshot when disabled', () => {
    const { select } = renderSelect({ disabled: true });
    expect(select).toMatchSnapshot();
  });
});
