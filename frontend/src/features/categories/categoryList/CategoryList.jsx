import React, { useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategoriesAsync, selectCategories } from '../CategoriesSlice';
import { Link } from 'react-router-dom';
import Card from './Card';
import "./Card.css";

const CategoryList = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);

    useEffect(() => {
        dispatch(fetchAllCategoriesAsync());
    }, [dispatch]);

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className='cat-container'>
            <h2 className="categories-heading">Categories</h2>
            {categories?.length > 0 ? (
                <Slider {...settings}>
                    {categories?.map((category, index) => (
                        <div key={index}>
                            <Link to={`/product-category/${category.name.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                                <Card
                                    image={category.image}
                                    title={category.name}
                                />
                            </Link>
                        </div>
                    ))}
                </Slider>
            ) : (
                <h4>No any categories</h4>
            )}
        </div>
    );
};

export default CategoryList;
