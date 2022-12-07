import PropTypes from 'prop-types';
import styles from './ImageGalleryItemCss.module.css';

export const ImageGalleryItem = ({
  largeImageURL,
  webformatURL,
  tags,
  openModal,
}) => {
  return (
    <li className={styles.imageGalleryItem} onClick={openModal}>
      <img
        className={styles.image}
        src={webformatURL}
        alt={tags}
        data-large={largeImageURL}
      />
    </li>
  );
};

ImageGalleryItem.prototype = {
  id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
