import { FC, useEffect, useRef, useState } from 'react';
import { SelectProps } from './Select.props';
import styles from './Select.module.scss';
import { MenuItem } from './MenuItem/MenuItem';

export const Select: FC<SelectProps> = ({
  label,
  value,
  onChange,
  placeholder,
  disabled,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={styles.wrapper} ref={selectRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div
        role="combobox"
        tabIndex={0}
        className={`${styles.select} ${disabled && styles.disabled}`}
        onClick={handleToggle}
      >
        <span className={styles.value}> {selectedOption ? selectedOption.label : placeholder}</span>
        <span className={styles.arrow}>▼</span>
      </div>
      {isOpen && (
        <ul className={styles.menu}>
          {options.map((opt) => (
            <MenuItem disabled={disabled} key={opt.id} value={opt.value} onSelect={handleSelect}>
              {opt.label}
            </MenuItem>
          ))}
        </ul>
      )}
    </div>
  );
};
