import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Material Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import GavelIcon from '@mui/icons-material/Gavel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';

const drawerWidth = 250;
export default function ResponsiveDrawer({onDataUploadClick}) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const navItems = [
    { title: "Dashboard", icon: <DashboardIcon /> },
    { title: "Portfolio", icon: <FolderIcon /> },
    { title: "Notifications", icon: <NotificationsIcon /> },
    { title: "Notices", icon: <AnnouncementIcon /> },
    { title: "Auction", icon: <GavelIcon /> },
    { title: "Data Upload", icon: <CloudUploadIcon /> },
    { title: "Control Panel", icon: <SettingsIcon /> },
    { title: "User Management", icon: <PeopleIcon /> },
    { title: "Permissions", icon: <SecurityIcon /> },
  ];

  const drawerContent = (
    <Box
      sx={{ width: drawerWidth }}
      role="presentation"
      onClick={isMobile ? handleDrawerToggle : undefined}
    >
      <List>
        {navItems.map(({ title, icon }) => (
          <ListItem key={title} disablePadding>
            <ListItemButton
              onClick={() =>{
                if (title === "Data Upload") {
                  onDataUploadClick();
                } else if (title === "Portfolio") {
                  navigate("/portfolio");
                } else {
                  navigate("/vacant");
                }
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          color="inherit"
          edge="start"
          sx={{ position: 'fixed', top: 10, left: 10, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            mt: isMobile ? 0 : 8,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
