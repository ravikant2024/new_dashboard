import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './sideBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategoriesAsync, selectCategories } from '../categories/CategoriesSlice';
import { Link } from 'react-router-dom';

const SideBar = ({ closeSidebar }) => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    console.log("categories",categories)
    const [activeSubMenuIndex, setActiveSubMenuIndex] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);

    // Fetch categories data on component mount
    useEffect(() => {
        dispatch(fetchAllCategoriesAsync());
    }, [dispatch]);

    // Render subSubMenu if available
    const renderSubSubMenu = (subSubMenu) =>
        subSubMenu?.map((item, index) => (
            <MenuItem
                key={index}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                    backgroundColor: hoveredItem === index ? 'grey' : '',
                    color: hoveredItem === index ? 'red' : '',
                }}
            >
                {item.title}
            </MenuItem>
        ));

    // Render SubMenu items, checking for subSubMenu
    const renderSubMenu = (subMenu) =>
        subMenu?.map((item, index) => {
            const hasSubSubMenu = item.subSubMenu && item.subSubMenu.length > 0;
            return hasSubSubMenu ? (
                <SubMenu key={index} label={item.title}>
                    {renderSubSubMenu(item.subSubMenu)}
                </SubMenu>
            ) : (
                <MenuItem
                    key={index}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                        backgroundColor: hoveredItem === index ? 'grey' : '',
                        color: hoveredItem === index ? 'red' : '',
                    }}
                >
                    {item.title}
                </MenuItem>
            );
        });

    // Render categories into SubMenu dynamically
    const renderCategories = () =>
        categories?.map((category, index) => {
            const isActive = activeSubMenuIndex === index;
            const hasSubMenu = category.subMenu && category.subMenu.length > 0;
            return hasSubMenu ? (
                <SubMenu
                    key={index}
                    label={category.name}
                    open={isActive}
                    onClick={() => setActiveSubMenuIndex(isActive ? null : index)}
                >
                    {renderSubMenu(category.subMenu)}
                </SubMenu>
            ) : (
                <Link
                to={`/product-category/${category.name}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={closeSidebar}
              >

                    <MenuItem
                        key={index}
                        onMouseEnter={() => setHoveredItem(index)}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                            backgroundColor: hoveredItem === index ? '#c3afaf' : '',
                            // color: hoveredItem === index ? 'red' : '',
                        }}
                       
                    >
                        {category.name}

                    </MenuItem>
                </Link>
            );
        });

    return (
        <Sidebar className="custom-sidebar" >
            <Menu>{renderCategories()}</Menu>
        </Sidebar>
    );
};

export default SideBar;
