import { ButtonHTMLAttributes } from 'react';

export type Variant = 'text' | 'contained' | 'outlined';
export type Size = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}
