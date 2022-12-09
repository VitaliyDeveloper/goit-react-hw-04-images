import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Modal } from './Modal/Modal';
import { mapper } from './utils/mapper';
import Loader from './Loader/Loader';
import { useState, useEffect } from 'react';
import fetchPhotos from './services/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastStyles from './services/toastStyle';
// import { Dna } from 'react-loader-spinner';
// import { render } from '@testing-library/react';

export const App = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);
  const [totalImage, setTotalImage] = useState(0);
  const [countPhoto, setCountPhoto] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [photoName, setPhotoName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (photoName === '') {
      return;
    }

    if (
      (prevPhotoName => prevPhotoName !== photoName) ||
      (prevPage => prevPage !== page && page !== 1)
    ) {
      fetchPhotos(photoName, page)
        .then(({ hits, totalHits }) => {
          if (totalHits === 0) {
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.',
              toastStyles
            );
            return;
          }
          setArticles(prevArticles => [...prevArticles, ...mapper(hits)]);
          setTotalImage(totalHits);
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => setIsLoading(false));
      setIsLoading(isLoading => !isLoading);
    }
  }, [page, photoName]);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const er = error;
  console.log(er);
  const openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      setShowModal(showModal => !showModal);
      setCurrentImageUrl(currentImageUrl);
      setCurrentImageDescription(currentImageDescription);
    }
  };

  const handleFormSearch = keyword => {
    if (photoName === keyword) {
      return;
    }
    setPhotoName(keyword);
    setArticles([]);
    setPage(1);
    setTotalImage(0);
    setCountPhoto(12);
  };

  const onAddMoreFetch = () => {
    setPage(prevPage => prevPage + 1);
    setCountPhoto(prevCountPhoto => prevCountPhoto + 12);
    if (countPhoto >= totalImage) {
      toast.error(
        "We're sorry, but you've reached the end of search results.",
        toastStyles
      );
      return;
    }
  };

  return (
    <div>
      <Searchbar searchForm={handleFormSearch} />

      {articles.length !== 0 && (
        <ImageGallery articles={articles} openModal={openModal} />
      )}

      {isLoading && <Loader />}

      {/* {!isLoading &&
          !error &&
          photoName !== '' &&
          totalImage > 12 &&
          countPhoto < totalImage && (
            <Button text="Load more" onAddMoreFetch={this.onAddMoreFetch} />
          )} */}

      {page < Math.ceil(totalImage / 12) && (
        <Button text="Load more" onAddMoreFetch={onAddMoreFetch} />
      )}

      {showModal && (
        <Modal
          onClose={toggleModal}
          currentImageUrl={currentImageUrl}
          currentImageDescription={currentImageDescription}
        />
      )}

      <ToastContainer />
    </div>
  );
};
