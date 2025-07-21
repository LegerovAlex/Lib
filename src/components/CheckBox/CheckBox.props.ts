import { InputHTMLAttributes } from 'react';

export interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  label?: string;
  required?: boolean;
}
