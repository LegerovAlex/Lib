import { render, screen } from '@testing-library/react';
import { SwitchProps } from './Switch.props';
import Switch from './Switch';
import userEvent from '@testing-library/user-event';

export interface RenderSwitchResult {
  switchElem: HTMLElement;
  onChange: jest.Mock;
}

export function renderSwitch(props: Partial<SwitchProps> = {}): RenderSwitchResult {
  const onChange = jest.fn();

  render(<Switch {...props} checked={props.checked ?? false} onChange={onChange} />);

  const switchElem = screen.getByRole('switch');

  return { switchElem, onChange };
}

describe('Switch', () => {
  it('renders the switch', () => {
    const { switchElem } = renderSwitch();
    expect(switchElem).toBeInTheDocument();
  });
  it('is checked when checked=true', () => {
    const { switchElem } = renderSwitch({ checked: true });
    expect(switchElem).toBeChecked();
  });
  it('is not checked when checked=false', () => {
    const { switchElem } = renderSwitch({ checked: false });
    expect(switchElem).not.toBeChecked();
  });
  it('calls onChange when clicked', async () => {
    const { onChange, switchElem } = renderSwitch();
    await userEvent.click(switchElem);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
  it('does not call onChange when disabled', async () => {
    const { onChange, switchElem } = renderSwitch({ disabled: true });
    expect(switchElem).toBeDisabled();
    await userEvent.click(switchElem);
    expect(onChange).not.toHaveBeenCalled();
  });
});
