// styles
import styles from "./Modal.module.scss";

export const Modal = ({ onClose, children }: any): JSX.Element => {
  return (
    <div className={styles.modal}>
      <span className={styles.close} onClick={onClose}>
        &times;
      </span>
      <div className={styles.modalContent}>{children}</div>
    </div>
  );
};
