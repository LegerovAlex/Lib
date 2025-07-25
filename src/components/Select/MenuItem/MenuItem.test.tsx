import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuItemProps } from './MenuItem.props';
import { MenuItem } from './MenuItem';

export interface RenderMenuItemResult {
  menuItem: HTMLElement;
  onSelect: jest.Mock;
}

export function renderMenuItem(props: Partial<MenuItemProps> = {}): RenderMenuItemResult {
  const onSelect = jest.fn();

  render(
    <MenuItem
      {...props}
      value={props.value ?? 'test'}
      onSelect={onSelect}
      disabled={props.disabled}
    >
      {props.children ?? 'test'}
    </MenuItem>,
  );

  const menuItem = screen.getByRole('listitem');

  return { menuItem, onSelect };
}

describe('MenuItem', () => {
  it('renders with correct text', () => {
    const { menuItem } = renderMenuItem({ children: 'Children' });
    expect(menuItem).toBeInTheDocument();
    expect(menuItem).toHaveTextContent('Children');
  });
  it('calls onSelect with corret value on click', async () => {
    const { menuItem, onSelect } = renderMenuItem({ children: 'Children', value: 'value' });
    await userEvent.click(menuItem);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('value');
  });
  it('does not call onSelect when disabled', async () => {
    const { menuItem, onSelect } = renderMenuItem({
      children: 'Children',
      value: 'value',
      disabled: true,
    });
    await userEvent.click(menuItem);
    expect(onSelect).not.toHaveBeenCalled();
    expect(onSelect).not.toHaveBeenCalledWith('value');
  });
  it('matches snapshot when enabled', () => {
    const { menuItem } = renderMenuItem({ children: 'Snapshot Test', value: 'snap' });
    expect(menuItem).toMatchSnapshot();
  });
  it('matches snapshot when disabled', () => {
    const { menuItem } = renderMenuItem({
      children: 'Snapshot Disabled',
      value: 'snap',
      disabled: true,
    });
    expect(menuItem).toMatchSnapshot();
  });
});
