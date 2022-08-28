import { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./Snackbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";

export type ShowHandle = {
  show: () => void;
};

interface Props {
  message: string;
  status?: "success" | "error";
  autoClose?: number;
  position?: "top" | "bottom";
}

export const Snackbar = forwardRef<ShowHandle, Props>(
  (
    { message, status = "success", autoClose = 3000, position = "bottom" },
    ref
  ) => {
    const [showSnackbar, setShowSnackbar] = useState(false);

    const icons = {
      success: faCheck,
      error: faTimes,
    };

    useImperativeHandle(ref, () => ({
      show(): void {
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
        }, autoClose);
      },
    }));

    return (
      <>
        {showSnackbar ? (
          <div
            role="alertdialog"
            className={`${styles.snackbar} ${styles[status]} ${styles[position]}`}
          >
            <FontAwesomeIcon icon={icons[status]} fontSize="20px" />
            <FontAwesomeIcon
              icon={faWindowClose}
              fontSize="15px"
              className={styles.closeButton}
              onClick={(): void => setShowSnackbar((prev) => false)}
            />

            <span data-testid="snackbar-message"> {message}</span>
          </div>
        ) : null}
      </>
    );
  }
);
