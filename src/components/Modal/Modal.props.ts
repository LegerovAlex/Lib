import { ReactNode } from 'react';

export interface ModalProps {
  IsOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
