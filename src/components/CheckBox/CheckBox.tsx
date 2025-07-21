import { forwardRef, useId } from 'react';
import styles from './CheckBox.module.scss';
import { CheckBoxProps } from './CheckBox.props';

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ checked, label, required, onChange, ...rest }, ref) => {
    const id = useId();

    return (
      <div className={styles.checkBox}>
        <input
          id={id}
          checked={checked}
          required={required}
          ref={ref}
          type="checkbox"
          onChange={onChange}
          className={`${styles.input} ${checked ? 'checked' : ''}`}
          {...rest}
        />
        {label && (
          <label htmlFor={id}>
            {label} {required && '*'}
          </label>
        )}
      </div>
    );
  },
);

export default CheckBox;
