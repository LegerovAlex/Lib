import { ChangeEvent, InputHTMLAttributes } from 'react';

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
