import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGalleryCss.module.css';

const ImageGallery = ({ articles, openModal }) => {
  return (
    <ul className={styles.imageGallery}>
      {articles.map(({ id, largeImageURL, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          openModal={openModal}
          tags={tags}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.prototype = {
  articles: PropTypes.arrayOf(PropTypes.string).isRequired,
  openModal: PropTypes.func.isRequired,
};
