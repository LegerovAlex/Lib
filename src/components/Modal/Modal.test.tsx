import { fireEvent, render, screen } from '@testing-library/react';
import { ModalProps } from './Modal.props';
import { Modal } from './Modal';
import userEvent from '@testing-library/user-event';

export interface RenderModalResult {
  modal: HTMLElement | null;
  backdrop: HTMLElement | null;
  container: HTMLElement | null;
  closeButton: HTMLElement | null;
  onClose: jest.Mock;
}

export function renderModal(props: Partial<ModalProps> = {}): RenderModalResult {
  const onClose = jest.fn();

  const container = document.createElement('div');
  container.setAttribute('id', 'modal-root');
  document.body.appendChild(container);

  render(
    <Modal onClose={onClose} isOpen={props.isOpen}>
      {props.children ?? 'Modal Content'}
    </Modal>,
  );

  const modal = screen.queryByRole('dialog');
  const backdrop = screen.queryByTestId('backdrop');
  const closeButton = screen.queryByRole('button', { name: /х/i });

  return { modal, backdrop, closeButton, onClose, container };
}

describe('Modal', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders modal when isOpen is true', () => {
    const { modal, backdrop, closeButton } = renderModal({ isOpen: true });
    expect(modal).toBeInTheDocument();
    expect(backdrop).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(modal).toHaveTextContent('Modal Content');
  });
  it('does not render modal when isOpen is false', () => {
    const { modal, backdrop, closeButton } = renderModal({ isOpen: false });
    expect(modal).not.toBeInTheDocument();
    expect(backdrop).not.toBeInTheDocument();
    expect(closeButton).not.toBeInTheDocument();
  });
  it('renders custom children', () => {
    const { modal } = renderModal({ isOpen: true, children: 'Custom Content' });
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent('Custom Content');
  });
  it('renders in portal container', () => {
    const { container, modal } = renderModal({ isOpen: true });
    expect(container).toContainElement(modal);
  });
  it('calls onClose when Escape key is pressed', () => {
    const { onClose } = renderModal({ isOpen: true });
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it('calls onClose when backdrop is clicked', async () => {
    const { backdrop, onClose } = renderModal({ isOpen: true });
    await userEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it('does not call onClose when clicking inside modal content', async () => {
    const { onClose } = renderModal({ isOpen: true });
    const modalContent = screen.getByText(/modal content/i);
    await userEvent.click(modalContent);
    expect(onClose).not.toHaveBeenCalled();
  });
  it('calls onClose when close button is clicked', async () => {
    const { closeButton, onClose } = renderModal({ isOpen: true });
    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it('matches snapshot when open', () => {
    const { container } = renderModal({ isOpen: true });
    expect(container).toMatchSnapshot();
  });
  it('matches snapshot when closed', () => {
    const { container } = renderModal({ isOpen: false });
    expect(container).toMatchSnapshot();
  });
});
