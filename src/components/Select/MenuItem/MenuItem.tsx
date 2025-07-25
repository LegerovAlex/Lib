import { FC } from 'react';
import { MenuItemProps } from './MenuItem.props';
import styles from './MenuItem.module.scss';

export const MenuItem: FC<MenuItemProps> = ({ value, onSelect, children, disabled }) => {
  const handleClick = () => {
    if (disabled) return;
    onSelect(value);
  };
  return (
    <li className={`${styles.menuItem} ${disabled && styles.disabled}`} onClick={handleClick}>
      {children}
    </li>
  );
};
