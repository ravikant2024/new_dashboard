import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { fetchAllCategoriesAsync, selectCategories } from '../CategoriesSlice';
import { Link } from 'react-router-dom';
import Card from './Card';
import "./Card.css";
const CategoryList = () => {
    const dispatch = useDispatch()
    const categories = useSelector(selectCategories)
    useEffect(() => {
        dispatch(fetchAllCategoriesAsync());
    }, [dispatch]);
    return (
        <>
            <div className='cat-container'>
                <h2 className="categories-heading">Categories</h2>
                {
                    categories.length > 0 ? (
                        <div className="container-data">
                            {categories.map((category, index) => (
                                 <Link key={index} to={`/product-category/${category.name.toLowerCase()}`} style={{textDecoration:'none'}}> 
                                 <Card
                                     image={category.image} 
                                     title={category.name} 
                                 />
                             </Link>
                            )
                            )}
                        </div>
                    ) : (
                        <h4>No any categories</h4>
                    )
                }

            </div>
        </>
    );
};

export default CategoryList;
