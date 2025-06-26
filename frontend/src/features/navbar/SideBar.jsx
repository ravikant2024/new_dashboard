import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './sideBar.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllCategoriesAsync,
  selectCategories,
} from '../categories/CategoriesSlice';
import { Link } from 'react-router-dom';

const SideBar = ({ closeSidebar }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [activeSubMenuIndex, setActiveSubMenuIndex] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  // Render sub-submenu
  const renderSubSubMenu = (subSubMenu) =>
    subSubMenu?.map((item) => (
      <MenuItem
        key={item.id || item.title}
        onMouseEnter={() => setHoveredItem(item.id || item.title)}
        onMouseLeave={() => setHoveredItem(null)}
        style={{
          backgroundColor:
            hoveredItem === (item.id || item.title) ? 'grey' : '',
          color: hoveredItem === (item.id || item.title) ? 'red' : '',
        }}
      >
        {item.title}
      </MenuItem>
    ));

  // Render submenu
  const renderSubMenu = (subMenu) =>
    subMenu?.map((item) => {
      const hasSubSubMenu = item.subSubMenu && item.subSubMenu.length > 0;
      const key = item.id || item.title;
      return hasSubSubMenu ? (
        <SubMenu key={key} label={item.title}>
          {renderSubSubMenu(item.subSubMenu)}
        </SubMenu>
      ) : (
        <MenuItem
          key={key}
          onMouseEnter={() => setHoveredItem(key)}
          onMouseLeave={() => setHoveredItem(null)}
          style={{
            backgroundColor: hoveredItem === key ? 'grey' : '',
            color: hoveredItem === key ? 'red' : '',
          }}
        >
          {item.title}
        </MenuItem>
      );
    });

  // Render categories
  const renderCategories = () =>
    categories?.map((category) => {
      const categoryKey = category.id || category.name;
      const isActive = activeSubMenuIndex === categoryKey;
      const hasSubMenu = category.subMenu && category.subMenu.length > 0;

      return hasSubMenu ? (
        <SubMenu
          key={categoryKey}
          label={category.name}
          open={isActive}
          onClick={() =>
            setActiveSubMenuIndex(isActive ? null : categoryKey)
          }
        >
          {renderSubMenu(category.subMenu)}
        </SubMenu>
      ) : (
        <MenuItem
          key={categoryKey}
          component={
            <Link
              to={`/product-category/${category.name}`}
              onClick={closeSidebar}
            />
          }
          onMouseEnter={() => setHoveredItem(categoryKey)}
          onMouseLeave={() => setHoveredItem(null)}
          style={{
            backgroundColor: hoveredItem === categoryKey ? '#c3afaf' : '',
          }}
        >
          {category.name}
        </MenuItem>
      );
    });

  return (
    <Sidebar className="custom-sidebar">
      <Menu>{renderCategories()}</Menu>
    </Sidebar>
  );
};

export default SideBar;
