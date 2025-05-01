import { useContext } from 'react';
import { ModalOverlayContext } from '../context/ModalOverlayProvider';

export function useModalOverlay() {
  const context = useContext(ModalOverlayContext);
  if (!context) throw new Error('useModalOverlay must be used within ModalOverlayProvider');
  return context;
}
