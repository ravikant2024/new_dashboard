import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  styled,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TableChartIcon from '@mui/icons-material/TableChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import ImageIcon from '@mui/icons-material/Image';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LockResetIcon from '@mui/icons-material/LockReset';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useNavigate } from 'react-router-dom';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: 'white',
  cursor: 'pointer',
  '& .MuiListItemText-primary': {
    color: 'white',
  },
  '& .MuiListItemIcon-root': {
    color: 'white',
  },
  '&.Mui-selected': {
    backgroundColor: '#37474F',
    borderRadius: '8px',
  },
  '&:hover': {
    backgroundColor: '#37474F',
    borderRadius: '8px',
  },
}));

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState({});
  const [selected, setSelected] = useState('Dashboard');
 

  const handleClick = (item) => {
    setOpen({
      ...open,
      [item]: !open[item],
    });
  };

  const handleSelect = (item) => {
    setSelected(item);

    if (item !== 'Products' && item !== 'Add Brand' && item !== 'Add Category') {
      setOpen({});
    }

    if (item === 'Dashboard') {
      navigate('/admin-dashboard');
    } else if (item === 'Add Products') {
      navigate('add-products');
    } else if (item === 'Add Brand') {
      navigate('add-brand');
    }else if (item === 'Add Category') {
      navigate('add-category');
    }else if (item === 'Product List') {
      navigate('product-list');
    }else if(item==="Order Details"){
      navigate("order-details")
    }else if(item==="Add Coupon"){
      navigate("add-coupon")
    }else if(item==="Coupon List"){
      navigate("list-coupon")
    }
    else if(item==="Users List"){
      navigate("users-list")
    }
    else if(item==="Category List"){
      navigate("category-list")
    }
    else if(item==="Add Blog"){
      navigate("add-blog")
    }
    else if(item==="Blog List"){
      navigate("blog-list")
    }
   
  };

  const handleOpenToggle = (e) => {
   
  };

  const handleCloseToogle = (e) => {
   
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, items: [] },
    { text: 'Products', icon: <ViewModuleIcon />, items: ['Add Brand', 'Add Category', 'Add Products','Product List','Category List'] },
    { text: 'Orders', icon: <ListAltIcon />, items: ['Order Details', ] },
    { text: 'Coupons', icon: <TableChartIcon />, items: ['Add Coupon', 'Coupon List'] },
    { text: 'Charts', icon: <BarChartIcon />, items: ['Line Chart', 'Bar Chart', 'Pie Chart'] },
    { text: 'Icons', icon: <ImageIcon />, items: ['Material Icons', 'Font Awesome Icons'] },
    { text: 'Users', icon: <PeopleIcon />, items: ['Users List'] },
    { text: 'Blog', icon: <PostAddIcon />, items: ['Add Blog','Blog List'] },
    { text: 'More', items: [] },
  ];

  return (
    <Box sx={{ backgroundColor: '#242526', height: '1000px', width: '210px', position:'fixed' }}>
      {/* <Typography variant="subtitle2" sx={{ color: 'grey', padding: '16px 16px 8px 16px',marginTop:'10px' }}>Navigation</Typography> */}
      <List sx={{marginTop:'30px'}}>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <StyledListItem
              button
              onClick={() => item.items.length > 0 ? handleClick(item.text) : handleSelect(item.text)}
              selected={selected === item.text}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText primary={item.text} />
              {item.items.length > 0 && (open[item.text] ? <ExpandLess /> : <ExpandMore />)}
            </StyledListItem>
            {item.items.length > 0 && (
              <Collapse in={open[item.text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.items.map((subItem, subIndex) => (
                    <StyledListItem
                      button
                      key={subIndex}
                      sx={{ pl: 4 }}
                      onClick={() => handleSelect(subItem)}
                      selected={selected === subItem}
                    >
                      <ListItemText primary={subItem} />
                    </StyledListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default AdminSidebar;
