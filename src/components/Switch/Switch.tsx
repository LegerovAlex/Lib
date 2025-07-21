import { ChangeEvent, forwardRef, useId } from 'react';
import { SwitchProps } from './Switch.props';
import styles from './Switch.module.scss';

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ onChange, disabled = false, checked, ...rest }, ref) => {
    const id = useId();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.checked);
    };

    return (
      <div className={styles.switch}>
        <input
          id={id}
          type="checkbox"
          role="switch"
          className={styles.input}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          ref={ref}
          {...rest}
        />
        <label className={styles.label} htmlFor={id}></label>
      </div>
    );
  },
);

export default Switch;
