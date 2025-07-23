import { ReactNode } from 'react';

export interface MenuItemProps {
  value: string;
  children: ReactNode;
  disabled: boolean;
  onSelect: (value: string) => void;
}
