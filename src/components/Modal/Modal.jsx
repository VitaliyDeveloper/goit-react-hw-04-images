// import PropTypes from 'prop-types';
import { useEffect } from 'react';
import styles from './ModalCss.module.css';

export const Modal = ({
  currentImageUrl,
  currentImageDescription,
  onClose,
}) => {
  useEffect(() => {
    const closeByEsc = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', closeByEsc);

    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [onClose]);

  const closeByBackdrop = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={closeByBackdrop} className={styles.Overlay}>
      <div className={styles.Modal}>
        <img src={currentImageUrl} alt={currentImageDescription} />
      </div>
    </div>
  );
};
