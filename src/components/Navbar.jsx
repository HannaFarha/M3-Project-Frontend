import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Group, Button, Burger, Drawer, ScrollArea, Collapse, rem, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../styles/Navbar.module.css';
import Logo from '../assets/logo.jpeg'; 

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <nav className={classes.header}>
      <Group justify="space-between" h="100%">
        {/* Logo avec l'image */}
        <Link to="/">
          <img src={Logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
        </Link>

        <Group h="100%" gap={0} visibleFrom="sm">
          <Link to='/' className={classes.link}>Search</Link>

          {isAuthenticated ? (
            <>
              <Link to='/collection' className={classes.link}>My Collection</Link>
              <Link to='/newVinyl' className={classes.link}>New Vinyl</Link>
              <Link to='/profile' className={classes.link}>My Profile</Link>
              <Link to='/vinyls' className={classes.link}>Vinyls</Link>
              <Link to="/" className={classes.link}>
                <Button onClick={logout} variant="filled" color="blue" className={classes.button}>
                  Log Out
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup" className={classes.link}>
                <Button variant="outline" color="blue" className={classes.button}>
                  Sign Up
                </Button>
              </Link>
              <Link to="/login" className={classes.link}>
                <Button variant="filled" color="blue" className={classes.button}>
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </Group>

        {/* Burger Menu */}
        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
      </Group>

      {/* Drawer pour les petits écrans */}
      <Drawer
  opened={drawerOpened}
  onClose={closeDrawer}
  size="100%"
  padding="md"
  title="Navigation"
  hiddenFrom="sm"
  zIndex={1000000}
>
  <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
    {/* Supprimer la référence à linksOpened ici */}
    <Collapse>
      {/* Vous avez retiré le rendu des liens ici */}
    </Collapse>
    <Group justify="center" grow pb="xl" px="md">
      <Button variant="default">Log in</Button>
      <Button>Sign up</Button>
    </Group>
  </ScrollArea>
</Drawer>
    </nav>
  );
};

export default Navbar;
