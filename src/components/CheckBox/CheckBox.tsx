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
          ref={ref}
          type="checkbox"
          onChange={onChange}
          className={styles.input}
          {...rest}
        />
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label} {required && '*'}
          </label>
        )}
      </div>
    );
  },
);

export default CheckBox;
