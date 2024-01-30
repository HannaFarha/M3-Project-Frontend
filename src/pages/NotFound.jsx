import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <img
        src="https://cdn3.vectorstock.com/i/1000x1000/37/32/404-error-page-not-found-vinyl-music-broken-vector-26853732.jpg" 
        alt="Page Not Found"
        className={styles.image}
      />
      <h1 className={styles.heading}>Oops! Page Not Found</h1>
     
      <Link to="/" className={styles.link}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;