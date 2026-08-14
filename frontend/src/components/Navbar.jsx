import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme as useThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);

  const menuItems = [
    { label: "Lost Items", path: "/lost", icon: "📍" },
    { label: "Found Items", path: "/found", icon: "✅" },
    { label: "Report Item", path: "/report", icon: "➕" },
    { label: "Contact", path: "/contact", icon: "📞" },
  ];

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar sx={{ py: 1 }}>
        {/* Logo */}
        <Box
          onClick={() => navigate("/")}
          sx={{
            fontWeight: 700,
            fontSize: "1.5rem",
            cursor: "pointer",
            mr: 4,
            background: "linear-gradient(135deg, #fff 0%, #e0e7ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          🔍 DIU Lost & Found
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 1, flex: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                onClick={() => navigate(item.path)}
                sx={{ textTransform: "none", fontSize: "1rem" }}
              >
                {item.icon} {item.label}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
          {/* Theme Toggle */}
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* Notifications */}
          {isAuthenticated && (
            <IconButton color="inherit" onClick={(e) => setNotificationsAnchor(e.currentTarget)}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}

          {/* User Menu */}
          {isAuthenticated ? (
            <>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user?.full_name?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => { navigate("/profile"); setAnchorEl(null); }}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => { navigate("/my-reports"); setAnchorEl(null); }}>
                  My Reports
                </MenuItem>
                {user?.role === "ADMIN" && (
                  <MenuItem onClick={() => { navigate("/admin"); setAnchorEl(null); }}>
                    Admin Panel
                  </MenuItem>
                )}
                <MenuItem onClick={() => { logout(); setAnchorEl(null); }}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <IconButton onClick={() => setMobileOpen(!mobileOpen)} color="inherit">
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 280, p: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                    setMobileOpen(false);
                  }}
                >
                  <ListItemText primary={`${item.icon} ${item.label}`} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={() => setNotificationsAnchor(null)}
      >
        <MenuItem>✅ Your claim was approved!</MenuItem>
        <MenuItem>📍 Someone found your lost item</MenuItem>
        <MenuItem>💬 New message from admin</MenuItem>
      </Menu>
    </AppBar>
  );
}
