import { forwardRef, useId } from 'react';
import { TextFieldProps } from './TextField. props';
import styles from './TextField.module.scss';

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error = false, helperText, placeholder, className, ...rest }, ref) => {
    const id = useId();

    return (
      <div className={`${styles.textField} ${error && styles.error}  ${className}`}>
        <input
          ref={ref}
          value={rest.value}
          onChange={rest.onChange}
          placeholder={placeholder}
          id={id}
          className={styles.input}
          {...rest}
        />
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
        {error && <span className={styles.helperText}>{helperText}</span>}
      </div>
    );
  },
);

export default TextField;
