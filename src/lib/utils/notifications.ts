// src/utils/notifications.tsx
import { toast, ToastOptions, Id } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  // theme: "dark", // default theme
};

export const notifySuccess = (message: string, options?: ToastOptions) => {
  toast.success(message, { ...defaultOptions, ...options });
};

export const notifyError = (message: string, options?: ToastOptions) => {
  toast.error(message, { ...defaultOptions, ...options });
};

export const notifyInfo = (message: string, options?: ToastOptions) => {
  toast.info(message, { ...defaultOptions, ...options });
};

export const notifyWarning = (message: string, options?: ToastOptions) => {
  toast.warn(message, { ...defaultOptions, ...options });
};

export const notifyDefault = (message: string, options?: ToastOptions) => {
  toast(message, { ...defaultOptions, ...options });
};

// set toast.loading and update the notification yourself.
export const notifyLoading = (message: string, options?: ToastOptions): Id => {
  return toast.loading(message, { ...defaultOptions, ...options });
};

export const updateLoading = (id: Id, message: string, type: 'success' | 'error' | 'info' | 'warning' | 'default', options?: ToastOptions) => {
  toast.update(id, { render: message, type, isLoading: false, ...defaultOptions, ...options });
};
