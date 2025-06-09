import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import logo from "../assets/logo.jpg";

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../features/user/UserSlice';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: '80px',
}));

const AdminNavbar = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const adminInfo = useSelector(selectUserInfo);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAdminProfile = () => {
    navigate("/admin-dashboard/profile")
    setAnchorEl(null);
  }
  const handleAdminSetting = () => {
    navigate('/admin-dashboard/setting');
    setAnchorEl(null);
  };

  const handleAdminLogOut = () => {
    navigate('/logout')
  }


  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#242526',
        width: '100%',
        left: 0,
        right: '10px',
        zIndex: 1300,
      }}
    >
      <StyledToolbar>
        <Link to="/admin-dashboard" style={{ textDecoration: 'none' }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: 'flex', alignItems: 'center', color: 'rgb(255, 133, 51)' }}
          >
            <Avatar alt="Logo" src={logo} sx={{ width: 40, height: 40, marginRight: 2 }} />
            Original Innovation LLP
          </Typography>
        </Link>

        <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
          {/* <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton> */}
          {/* <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton> */}

          {/* <IconButton>
            <Avatar alt="Henry Klein" src="/static/images/avatar/2.jpg" />
          </IconButton> */}
          <Box display="flex" alignItems="center" onClick={handleMenuOpen}>
            <Typography variant="body2" style={{ color: 'white', marginLeft: '8px' }}>
              {adminInfo?.name}
            </Typography>
            <IconButton style={{ padding: 0 }}>
              <ArrowDropDownIcon style={{ color: 'white' }} />
            </IconButton>
          </Box>
        </Box>
      </StyledToolbar>

      {/* Menu component */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        sx={{
          marginTop: 1,
          '& .MuiPaper-root': {
            backgroundColor: '#242526',
            color: 'white',
            padding: '8px 0',
            border: '1px solid red',
            zIndex: 1400,
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem disabled>
          <Typography variant="body2" style={{ fontWeight: 'bold' }}>Profile</Typography>
        </MenuItem>
        <Divider style={{ backgroundColor: '#424242' }} />
        <MenuItem onClick={handleAdminProfile}>
          <ListItemIcon style={{ color: '#4CAF50' }}>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <Divider style={{ backgroundColor: '#424242' }} />
        <MenuItem onClick={handleAdminSetting}>
          <ListItemIcon style={{ color: '#4CAF50' }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <Divider style={{ backgroundColor: '#424242' }} />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon style={{ color: '#F44336' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" onClick={handleAdminLogOut} />
        </MenuItem>
      </Menu>
    </AppBar>

  );
};

export default AdminNavbar;
