import React, { useEffect, useState } from 'react'
import "./style.css"
import CategoryGrid from './CategoryGrid'
import CatSidebar from './CatSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectLoggedInUser } from '../../auth/AuthSlice'
import { ITEMS_PER_PAGE } from '../../../constants'
import { fetchFilterProductsAsync, selectProducts } from '../../products/ProductsSlice'
const CategorySidebarList = () => {
    const dispatch = useDispatch()
    const { name } = useParams()
    const products = useSelector(selectProducts);
    const loggedInUser = useSelector(selectLoggedInUser);
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        const finalFilters = { ...filters, pagination: { page, limit: ITEMS_PER_PAGE } };
        dispatch(fetchFilterProductsAsync(finalFilters));
    }, [filters, page, dispatch, loggedInUser]);

    const filteredCatData = products.filter(
        (product) => product.category.toLowerCase() === name.toLowerCase()
    );
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])

    return (
        <>
            <div className="main-container">
                <div className='sidebar-menu'>
                <CatSidebar filteredCatData={filteredCatData} name={name} />
                </div>
                <div className='cat-grid-details'>
                <CategoryGrid filteredCatData={filteredCatData} name={name} />
                </div>
              
            </div>
        </>
    )
}

export default CategorySidebarList
