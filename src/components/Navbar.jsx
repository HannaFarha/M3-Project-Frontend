import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { AppShell, Button } from '@mantine/core';
import classes from '../styles/NavBar.module.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <AppShell>
      <AppShell.Header className={`${classes.navbar} ${classes.customNavbar}`}>
        <Link to='/' style={{ marginRight: '20px' }}>Search</Link>

        {isAuthenticated ? (
          <>
            <Link to='/collection' style={{ marginRight: '20px' }}>My Collection</Link>
            <Link to='/newVinyl' style={{ marginRight: '20px' }}>New Vinyl</Link>
            <Link to='/profile' style={{ marginRight: '20px' }}>My Profile</Link>
            <Link to='/vinyls' style={{ marginRight: '20px' }}>Vinyls</Link>

            <Button onClick={logout} variant="light" color="blue">Logout</Button>
          </>
        ) : (
          <>
            <Link to='/signup' style={{ marginRight: '20px' }}>Signup</Link>
            <Link to='/login' style={{ marginRight: '20px' }}>Login</Link>
          </>
        )}
      </AppShell.Header>
    </AppShell>
  );
};

export default Navbar;
