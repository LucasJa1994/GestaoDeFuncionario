import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import {
  AppBar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useAuthValue } from "../context/AuthContext"
import { useAuthentication } from "../hooks/useAuthentication"

import styles from "./Navbar.module.css"

const NavBar = () => {
  const { user } = useAuthValue()
  const { logout } = useAuthentication()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <AppBar
      position="static"
      className={styles.appBar}
      sx={{ bgcolor: "grey" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleMenu}
          className={styles.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <div className={styles.brand}>
          <Typography variant="h6" component="div">
            <NavLink to="/" className={styles.brandLink}>
              Gestão de Funcionários
            </NavLink>
          </Typography>
        </div>
      </Toolbar>
      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={toggleMenu}
        className={styles.drawer}
      >
        <List>
          {!user ? (
            <>
              <ListItem
                button
                component={NavLink}
                to="/login"
                onClick={toggleMenu}
              >
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/register"
                onClick={toggleMenu}
              >
                <ListItemText primary="Cadastrar" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                button
                component={NavLink}
                to="/dashboard"
                onClick={toggleMenu}
              >
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/cads/CadFuncionario"
                onClick={toggleMenu}
              >
                <ListItemText primary="Novo Funcionário" />
              </ListItem>
            </>
          )}
          <ListItem button component={NavLink} to="/about" onClick={toggleMenu}>
            <ListItemText primary="Sobre" />
          </ListItem>
          {user && (
            <ListItem
              button
              onClick={() => {
                logout()
                toggleMenu()
              }}
            >
              {user && (
                <li>
                  <ListItemText primary="Logout" to="/Home" />
                </li>
              )}
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  )
}

export default NavBar
