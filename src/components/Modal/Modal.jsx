// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './ModalCss.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
  }

  closeByEsc = event => {
    if (event.code === 'Escape') this.props.onClose();
  };

  closeByBackdrop = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div onClick={this.closeByBackdrop} className={styles.Overlay}>
        <div className={styles.Modal}>
          {this.props.children}
          <img
            src={this.props.currentImageUrl}
            alt={this.props.currentImageDescription}
          />
        </div>
      </div>,
      modalRoot
    );
  }
}
