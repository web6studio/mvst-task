"use client";

import { ToastContainer } from "react-toastify";
import { CloseIcon } from "./CloseIcon";
import { WarningIcon } from "./WarningIcon";

type ToastCloseButtonProps = {
  closeToast?: () => void;
};

export const ToastCloseButton = ({ closeToast }: ToastCloseButtonProps) => (
  <CloseIcon onClick={closeToast!} />
);

export const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      closeOnClick
      pauseOnHover
      icon={WarningIcon}
      closeButton={ToastCloseButton}
      theme="dark"
    />
  );
};
