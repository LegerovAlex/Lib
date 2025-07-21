import { FC } from 'react';
import { ButtonProps } from './Button.props';
import styles from './Button.module.scss';

export const Button: FC<ButtonProps> = ({
  size = 'medium',
  variant = 'contained',
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={`${styles.button}  ${styles[`button_${variant}`]} ${styles[`button_${size}`]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
