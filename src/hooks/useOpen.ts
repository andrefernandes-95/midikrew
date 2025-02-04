import { useState, useCallback } from "react";

interface Added {
  isOpen: boolean;
  toggleOpen: () => void;
  open: () => void;
  close: () => void;
}

/**
 * Custom hook to manage "open" state.
 * Provides `isOpen`, `toggleOpen`, `open`, and `close` functionality.
 */
function useOpen(): Added {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    toggleOpen,
    open,
    close,
  };
}

export default useOpen;
