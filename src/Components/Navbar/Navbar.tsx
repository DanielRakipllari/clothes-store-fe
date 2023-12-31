// Navbar.tsx
import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Icon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import Authorize from "../../Auth/Authorize";
import { logout } from "../../Auth/handleJWT";
import AuthenticationContext from "../../Auth/AuthenticationContext";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const Navbar: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const { update, claims } = useContext(AuthenticationContext);

  function getUsername(): string {
    return claims.filter((x) => x.name === "unique_name")[0]?.value;
  }
  const navigate = useNavigate();
  const list = () => (
    <div role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/products">
          <ListItemText primary="Products" />
        </ListItem>

        <Authorize
          role="User"
          authorized={
            <>
              <List>
                <ListItem button component={Link} to="/orders">
                  <ListItemText primary="Orders" />
                </ListItem>
              </List>
            </>
          }
        />

        <Authorize
          role="Admin"
          authorized={
            <>
              <List>
                <ListItem button component={Link} to="/categories">
                  <ListItemText primary="Categories" />
                </ListItem>

                <ListItem button component={Link} to="/sizes">
                  <ListItemText primary="Sizes" />
                </ListItem>

                <ListItem button component={Link} to="/genders">
                  <ListItemText primary="Genders" />
                </ListItem>
                <ListItem button component={Link} to="/statistics">
                  <ListItemText primary="Orders Statistics" />
                </ListItem>
              </List>
            </>
          }
        />
      </List>
    </div>
  );
  const [loading, setLoading] = useState(true); // State to track loading
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Function to add a product to the cart
  const addToCart = () => {
    // Perform the logic to add a product to the cart
    // For simplicity, increment the count by 1
    setCartItemsCount(cartItemsCount + 1);
  };
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <ListItem button component={Link} to="/">
            <ListItemText>Clothes Store</ListItemText>
          </ListItem>
        </Typography>
        <Authorize
          notAuthorized={
            <>
              <List>
                <ListItem button component={Link} to="/login">
                  <ListItemText primary="Log In" />
                </ListItem>
              </List>

              <List>
                <ListItem button component={Link} to="/register">
                  <ListItemText primary="Sing Up" />
                </ListItem>
              </List>
            </>
          }
          authorized={
            <>
              {/* <Link to={"/cart"}>
              <Icon title="Cart">
                <ShoppingBagIcon />
              </Icon>
              </Link> */}
              <Link to={"/cart"} title="Cart">
                <Button
                  LinkComponent={Link}
                  startIcon={<ShoppingBagIcon />}
                  variant="contained"
                >
                  Cart
                </Button>
              </Link>
              &nbsp;&nbsp;&nbsp;
              {/* <span>Hello {getUsername()} &nbsp;&nbsp;&nbsp;</span> */}
              <Link to={"/"} title="Log Out">
                <Button
                  LinkComponent={Link}
                  startIcon={<LogoutIcon />}
                  variant="contained"
                  onClick={() => {
                    logout();
                    update([]);
                  }}
                >
                  Log Out
                </Button>
              </Link>
              &nbsp;&nbsp;&nbsp;
              <Button
                title="Change Password"
                variant="contained"
                LinkComponent={Link}
                onClick={() => {
                  navigate("/changePassword");
                }}
              >
                Change Password
              </Button>
            </>
          }
        ></Authorize>
      </Toolbar>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
        {list()}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
