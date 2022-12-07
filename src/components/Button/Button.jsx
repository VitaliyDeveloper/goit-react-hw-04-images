import PropTypes from 'prop-types';
import styles from './ButtonCss.module.css';

const Button = ({ text, onAddMoreFetch }) => {
  return (
    <button className={styles.button} onClick={onAddMoreFetch}>
      {text}
    </button>
  );
};

Button.prototype = {
  onAddMorePhoto: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
