import { FC, useEffect } from 'react';
import { ModalProps } from './Modal.props';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

export const Modal: FC<ModalProps> = ({ onClose, IsOpen, children }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (IsOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [IsOpen, onClose]);

  if (!IsOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div role="dialog" onClick={handleBackdropClick} className={styles.backdrop}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          х
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};
