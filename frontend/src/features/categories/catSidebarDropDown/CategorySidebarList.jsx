import React, { useEffect, useState } from 'react'
import "./style.css"
import CategoryGrid from './CategoryGrid'
// import CatSidebar from './CatSidebar'  // Uncomment if needed
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductAllAsync, selectProducts } from '../../products/ProductsSlice'
import { FaLessThan } from 'react-icons/fa';
import { FaGreaterThan } from "react-icons/fa";

const CategorySidebarList = () => {
    const dispatch = useDispatch()
    const { name } = useParams()
    const products = useSelector(selectProducts);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 8;

    // Fetch all products on mount
    useEffect(() => {
        dispatch(fetchProductAllAsync())
    }, [dispatch])

    const filteredCatData = products.filter(
        (product) => product.category.toLowerCase() === name.toLowerCase()
    );

    // Pagination calculations
    const totalPages = Math.ceil(filteredCatData.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedData = filteredCatData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" })
    }, [page])

    // Create array of page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="main-container">
            {/* Uncomment if you want sidebar */}
            {/* <div className="sidebar-menu">
                <CatSidebar filteredCatData={filteredCatData} name={name} />
            </div> */}

            <div>
                <CategoryGrid filteredCatData={paginatedData} name={name} />

                {totalPages > 1 && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '8px',
                            marginTop: '20px',
                        }}
                    >
                        {/* Previous */}
                        <span
                            onClick={() => page > 1 && setPage(page - 1)}
                            style={{
                                cursor: page === 1 ? 'not-allowed' : 'pointer',
                                padding: '6px 10px',
                                border: '1px solid #ccc',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: page === 1 ? 0.5 : 1,
                                backgroundColor:'#FF9933'
                            }}
                        >
                            <FaLessThan />
                        </span>

                        {/* Page Numbers */}
                        {pageNumbers.map((num) => (
                            <span
                                key={num}
                                onClick={() => setPage(num)}
                                style={{
                                    fontWeight: num === page ? 'bold' : 'normal',
                                    backgroundColor: num === page ? '#007bff' : 'transparent',
                                    color: num === page ? '#fff' : '#000',
                                    border: '1px solid #ccc',
                                    borderRadius: '50px',
                                    padding: '6px 10px',
                                    cursor: 'pointer',
                                }}
                            >
                                {num}
                            </span>
                        ))}

                        {/* Next */}
                        <span
                            onClick={() => page < totalPages && setPage(page + 1)}
                            style={{
                                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                                padding: '6px 10px',
                                border: '1px solid #ccc',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: page === totalPages ? 0.5 : 1,
                                backgroundColor:'#FF9933'
                            }}
                        >
                            <FaGreaterThan />
                        </span>
                    </div>

                )}
            </div>
        </div>
    )
}

export default CategorySidebarList;
