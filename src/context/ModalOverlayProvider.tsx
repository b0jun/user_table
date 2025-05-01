import { createContext, useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

type ModalComponent = React.ReactElement | null;

interface ModalOverlayContextValue {
  open: (render: (props: { isOpen: boolean; close: () => void }) => React.ReactElement) => void;
  close: () => void;
}

export const ModalOverlayContext = createContext<ModalOverlayContextValue | null>(null);

export function ModalOverlayProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalComponent>(null);

  const close = useCallback(() => {
    setModal(null);
  }, []);

  const open = useCallback(
    (render: (props: { isOpen: boolean; close: () => void }) => React.ReactElement) => {
      setModal(render({ isOpen: true, close }));
    },
    [close],
  );

  const contextValue = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ModalOverlayContext.Provider value={contextValue}>
      {children}
      {modal && ReactDOM.createPortal(modal, document.body)}
    </ModalOverlayContext.Provider>
  );
}
