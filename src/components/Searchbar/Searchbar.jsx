// import { render } from '@testing-library/react';
import React, { Component } from 'react';
import styles from './SearchbarCss.module.css';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  state = {
    photoName: '',
  };

  onChangeInput = e => {
    this.setState({ photoName: e.currentTarget.value.toLowerCase() });
  };

  onSubmitForm = e => {
    const { photoName } = this.state;

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
    this.props.searchForm(photoName);
    // this.setState({ photoName: '' });
  };

  render() {
    const { photoName } = this.state;

    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.onSubmitForm}>
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
            onChange={this.onChangeInput}
          />
        </form>
      </header>
    );
  }
}
