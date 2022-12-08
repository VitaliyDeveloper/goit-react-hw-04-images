import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Modal } from './Modal/Modal';
import { mapper } from './utils/mapper';
import Loader from './Loader/Loader';
import fetchPhotos from './services/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPhoto = () => {
    setIsLoading(true);
    if (photoName !== '') {
      fetchPhotos(photoName, page)
        .then(({ hits, totalHits, countPhoto }) => {
          if (totalHits === 0) {
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.',
              {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
              }
            );
            return;
          }

          if (countPhoto >= totalHits) {
            toast.error(
              "We're sorry, but you've reached the end of search results.",
              {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
              }
            );
            return;
          }

          setArticles(prevArticles => [
            ...prevArticles.articles,
            ...mapper(hits),
          ]);
          setTotalImage(totalHits);
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => setIsLoading(false));
    }
  };
  useEffect(() => {
    setPhotoName(prevPhotoName => prevPhotoName.photoName !== photoName);

    // prevPage.page !== page && page !== 1;

    setIsLoading(true);
    getPhoto();
  }, [getPhoto, photoName]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = e => {
    if (e.target.nodeName === 'IMG') {
      setShowModal(!showModal);
      setCurrentImageUrl(e.target.dataset.large);
      setCurrentImageDescription(e.target.alt);
    }
  };

  const handleFormSearch = photoName => {
    setPhotoName({ photoName });
    setArticles([]);
    setPage(1);
    setTotalImage(0);
    setCountPhoto(12);
    setError(null);
  };

  const onAddMoreFetch = () => {
    setPage(prevPage => prevPage.page + 1);
    setCountPhoto(prevCountPhoto => prevCountPhoto.countPhoto + 12);
    // console.log(this.state.articles.hits.length);
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

//   componentDidUpdate(_, prevState) {
//     const { photoName, page } = this.state;
//     if (
//       prevState.photoName !== photoName ||
//       (prevState.page !== page && page !== 1)
//     ) {
//       this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
//       this.getPhoto();
//     }
//   }

//   getPhoto = () => {
//     const { page, photoName } = this.state;

//     this.setState({ isLoading: true });

//     fetchPhotos(photoName, page)
//       .then(({ hits, totalHits, countPhoto }) => {
//         if (totalHits === 0) {
//           toast.error(
//             'Sorry, there are no images matching your search query. Please try again.',
//             {
//               position: 'top-right',
//               autoClose: 3000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: 'dark',
//             }
//           );
//           return;
//         }

//         if (countPhoto >= totalHits) {
//           toast.error(
//             "We're sorry, but you've reached the end of search results.",
//             {
//               position: 'top-right',
//               autoClose: 3000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: 'dark',
//             }
//           );
//           return;
//         }

//         this.setState(prevState => ({
//           articles: [...prevState.articles, ...mapper(hits)],
//           totalImage: totalHits,
//         }));
//       })
//       .catch(error => {
//         this.setState({ error: error.message });
//       })
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   openModal = e => {
//     const currentImageUrl = e.target.dataset.large;
//     const currentImageDescription = e.target.alt;

//     if (e.target.nodeName === 'IMG') {
//       this.setState(({ showModal }) => ({
//         showModal: !showModal,
//         currentImageUrl: currentImageUrl,
//         currentImageDescription: currentImageDescription,
//       }));
//     }
//   };

//   handleFormSearch = photoName => {
//     this.setState({ photoName });
//     this.setState({
//       articles: [],
//       page: 1,
//       totalImage: 0,
//       countPhoto: 12,
//     });
//   };

//   onAddMoreFetch = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//     this.setState(prevState => ({
//       countPhoto: prevState.countPhoto + 12,
//     }));
//     // console.log(this.state.articles.hits.length);
//   };

//   render() {
//     const {
//       showModal,
//       isLoading,
//       articles,
//       currentImageUrl,
//       currentImageDescription,
//       page,
//       totalImage,
//       // error,
//       // photoName,
//       // countPhoto,
//     } = this.state;

//     return (
//       <div>
//         <Searchbar searchForm={this.handleFormSearch} />

//         {articles.length !== 0 && (
//           <ImageGallery articles={articles} openModal={this.openModal} />
//         )}

//         {isLoading && <Loader />}

//         {/* {!isLoading &&
//           !error &&
//           photoName !== '' &&
//           totalImage > 12 &&
//           countPhoto < totalImage && (
//             <Button text="Load more" onAddMoreFetch={this.onAddMoreFetch} />
//           )} */}

//         {page < Math.ceil(totalImage / 12) && (
//           <Button text="Load more" onAddMoreFetch={this.onAddMoreFetch} />
//         )}

//         {showModal && (
//           <Modal
//             onClose={this.toggleModal}
//             currentImageUrl={currentImageUrl}
//             currentImageDescription={currentImageDescription}
//           />
//         )}

//         <ToastContainer />
//       </div>
//     );
//   }
// }
