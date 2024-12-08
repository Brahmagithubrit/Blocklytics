import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deepOrange, deepPurple } from "@mui/material/colors";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header({ toggleDrawer }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = () => {
    toggleDrawer(true);
  };

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            crypto analysis
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* Desktop Buttons */}
          <Button
            id="pc_content"
            variant="text"
            style={{ color: "white", margin: "5px" }}
            href="/sign_up"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            sign up
          </Button>
          <Button
            id="pc_content"
            variant="text"
            style={{ color: "white", margin: "5px" }}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Login
          </Button>

          {/* Mobile Dropdown */}
          <LockOpenIcon
            id="mobile_content"
            size="large"
            edge="end"
            color="inherit"
            aria-label="mobile menu"
            onClick={handleDropdownClick}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </LockOpenIcon>
          <Menu
            id="mobile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleDropdownClose}
          >
            <MenuItem
              onClick={() => {
                window.location.href = "/sign_up";
                handleDropdownClose();
              }}
            >
              Sign Up
            </MenuItem>
            <MenuItem onClick={handleDropdownClose}>Login</MenuItem>
          </Menu>

          <Avatar style={{ height: "35px", width: "35px" }}>A</Avatar>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
