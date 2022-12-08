// import { render } from '@testing-library/react';
import { useState } from 'react';
import styles from './SearchbarCss.module.css';
import { toast } from 'react-toastify';

export default function Searchbar({ searchForm }) {
  const [photoName, setPhotoName] = useState('');

  const onChangeInput = e => {
    setPhotoName(e.currentTarget.value.toLowerCase());
  };

  const onSubmitForm = e => {
    e.preventDefault();

    if (photoName.trim() === '') {
      toast.error('Enter your reques', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }
    searchForm(photoName);
    // setPhotoName('')
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={onSubmitForm}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.buttonLabel}>Search</span>
        </button>

        <input
          className={styles.input}
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          value={photoName}
          onChange={onChangeInput}
        />
      </form>
    </header>
  );
}
