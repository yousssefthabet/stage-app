export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
  maxWidth?: string;
  height?: string;
  headerColor?: string;
  closeOnOutsideClick?: boolean;
  triggerButton?: React.ReactNode;
  className?: string;
}
