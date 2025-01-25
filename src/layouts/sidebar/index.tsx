import React from "react";
import { List, ListItem, ListItemText, Drawer } from "@mui/material";
import { Link } from "react-router-dom";

const sidebarItems = {
  ADMIN: [
    { label: "All Users", path: "/users", icon: "people" },
    { label: "Upload Video", path: "/upload", icon: "upload" },
    { label: "All Videos", path: "/videos", icon: "video_library" },
    { label: "Profile", path: "/profile", icon: "account_circle" },
    { label: "Analytics", path: "/analytics", icon: "analytics" },
  ],
  USER: [
    { label: "All Videos", path: "/videos", icon: "video_library" },
    { label: "Profile", path: "/profile", icon: "account_circle" },
    { label: "Analytics", path: "/analytics", icon: "analytics" },
  ],
};

interface SidebarProps {
  role: "ADMIN" | "USER";
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const items = sidebarItems[role];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 250,
        height: "calc(100% - 64px)",
        top: 64,
        position: "fixed",
      }}
    >
      <List sx={{ paddingTop: "70px" }}>
        {items.map((item) => (
          <ListItem button key={item.label} component={Link} to={item.path}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
