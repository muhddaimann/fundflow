import React, { createContext, useContext, useState, useCallback } from "react";
import { OverlayAlert } from "../components/alert";
import { OverlayConfirm } from "../components/confirm";
import { OverlayToast, ToastVariant } from "../components/toast";
import { OverlayModal } from "../components/modal";

type AlertOptions = {
  title: string;
  message: string;
  buttonText?: string;
  onPress?: () => void;
};

type ConfirmOptions = {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isDestructive?: boolean;
};

type ToastOptions = {
  message: string;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
  variant?: ToastVariant;
  icon?: string;
};

type ModalOptions = {
  content: React.ReactNode;
  onDismiss?: () => void;
  dismissable?: boolean;
};

type OverlayContextType = {
  alert: (options: AlertOptions) => void;
  confirm: (options: ConfirmOptions) => void;
  toast: (options: ToastOptions | string) => void;
  showModal: (options: ModalOptions) => void;
  hideModal: () => void;
};

export const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertOptions | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<ConfirmOptions | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastConfig, setToastConfig] = useState<ToastOptions | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalOptions | null>(null);

  const alert = useCallback((options: AlertOptions) => {
    setAlertConfig(options);
    setAlertVisible(true);
  }, []);

  const confirm = useCallback((options: ConfirmOptions) => {
    setConfirmConfig(options);
    setConfirmVisible(true);
  }, []);

  const toast = useCallback((options: ToastOptions | string) => {
    if (typeof options === "string") {
      setToastConfig({ message: options });
    } else {
      setToastConfig(options);
    }
    setToastVisible(true);
  }, []);

  const showModal = useCallback((options: ModalOptions) => {
    setModalConfig(options);
    setModalVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setModalVisible(false);
    modalConfig?.onDismiss?.();
  }, [modalConfig]);

  const handleAlertClose = () => {
    setAlertVisible(false);
    alertConfig?.onPress?.();
  };

  const handleConfirmAction = () => {
    setConfirmVisible(false);
    confirmConfig?.onConfirm();
  };

  const handleConfirmCancel = () => {
    setConfirmVisible(false);
    confirmConfig?.onCancel?.();
  };

  const contextValue = { alert, confirm, toast, showModal, hideModal };

  return (
    <OverlayContext.Provider value={contextValue}>
      {children}
      <OverlayPortalRenderer 
        contextValue={contextValue}
        alertVisible={alertVisible}
        alertConfig={alertConfig}
        handleAlertClose={handleAlertClose}
        confirmVisible={confirmVisible}
        confirmConfig={confirmConfig}
        handleConfirmAction={handleConfirmAction}
        handleConfirmCancel={handleConfirmCancel}
        modalVisible={modalVisible}
        modalConfig={modalConfig}
        hideModal={hideModal}
        toastVisible={toastVisible}
        toastConfig={toastConfig}
        setToastVisible={setToastVisible}
      />
    </OverlayContext.Provider>
  );
}

function OverlayPortalRenderer({ 
  contextValue,
  alertVisible, alertConfig, handleAlertClose,
  confirmVisible, confirmConfig, handleConfirmAction, handleConfirmCancel,
  modalVisible, modalConfig, hideModal,
  toastVisible, toastConfig, setToastVisible
}: any) {
  return (
    <>
      <OverlayAlert 
        visible={alertVisible}
        title={alertConfig?.title}
        message={alertConfig?.message}
        buttonText={alertConfig?.buttonText}
        onClose={handleAlertClose}
      />

      <OverlayConfirm 
        visible={confirmVisible}
        title={confirmConfig?.title}
        message={confirmConfig?.message}
        confirmText={confirmConfig?.confirmText}
        cancelText={confirmConfig?.cancelText}
        onConfirm={handleConfirmAction}
        onCancel={handleConfirmCancel}
        isDestructive={confirmConfig?.isDestructive}
      />

      <OverlayModal 
        visible={modalVisible}
        // Wrap content in provider again to ensure context flows through portal
        content={
          <OverlayContext.Provider value={contextValue}>
            {modalConfig?.content}
          </OverlayContext.Provider>
        }
        onDismiss={hideModal}
        dismissable={modalConfig?.dismissable}
      />

      <OverlayToast 
        visible={toastVisible}
        message={toastConfig?.message || ''}
        actionLabel={toastConfig?.actionLabel}
        onAction={toastConfig?.onAction}
        onDismiss={() => setToastVisible(false)}
        duration={toastConfig?.duration}
        variant={toastConfig?.variant}
        icon={toastConfig?.icon}
      />
    </>
  );
}

export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
};
