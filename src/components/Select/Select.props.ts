export interface SelectOptions {
  id: number;
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  value: string;
  options: SelectOptions[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}
