import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";

// Drawer component definition
export default function DrawerComp({ drawerOpen, toggleDrawer }) {
  // Debugging log for received props
  console.log("DrawerComp received drawerOpen:", drawerOpen);

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)} // Close the drawer on item click
    >
      <List>
        {["PricePrediction", "WalletTracker", "Transaction", "NewsUpdate","wishlist"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link to={`/${text.toLowerCase().replace(" ", "_")}` } style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All Task", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link to={`/${text.toLowerCase().replace(" ", "_")}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={drawerOpen} onClose={() => toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
}
