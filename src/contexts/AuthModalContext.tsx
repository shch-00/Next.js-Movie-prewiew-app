"use client";

import { createContext, useState, useContext, useCallback } from "react";

type AuthModalContextType = {
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

const AuthModalContext = createContext<AuthModalContextType | null>(null);

export const AuthModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = useCallback(() => setIsAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), []);

  return (
    <AuthModalContext.Provider
      value={{ isAuthModalOpen, openAuthModal, closeAuthModal }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context)
    throw new Error("useAuthModal must be used within AuthModalProvider");
  return context;
};
