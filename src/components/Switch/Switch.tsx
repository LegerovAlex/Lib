import { forwardRef, useId } from 'react';
import { SwitchProps } from './Switch.props';
import styles from './Switch.module.scss';

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ onChange, disabled = false, checked, ...rest }, ref) => {
    const id = useId();

    return (
      <div>
        <input
          id={id}
          type="checkbox"
          role="switch"
          className={styles.input}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          ref={ref}
          {...rest}
        />
      </div>
    );
  },
);

export default Switch;
