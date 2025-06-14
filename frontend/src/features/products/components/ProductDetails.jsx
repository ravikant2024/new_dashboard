import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { toast } from 'react-toastify'
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { clearSelectedProduct, fetchProductByIdAsync, resetProductFetchStatus, selectSelectedProduct } from "../ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { addToCartAsync, resetCartItemAddStatus, selectCartItemAddStatus, selectCartItems, updateCartItemByIdAsync } from "../../cart/CartSlice";
import Reviews from "../../review/components/Reviews";
import { createWishlistItemAsync, deleteWishlistItemByIdAsync, resetWishlistItemAddStatus, resetWishlistItemDeleteStatus, selectWishlistItemAddStatus, selectWishlistItemDeleteStatus, selectWishlistItems } from "../../wishlist/WishlistSlice";
import TechnicalSpecifiction from "./TechnicalSpecifiction";
import ProductDescriptionTab from "./ProductDescriptionTab";

const ProductDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState("Description");
    const [quantity, setQuantity] = useState(1)
    const [isInWishlist, setIsInWishlist] = useState(false);
    const loggedInUser = useSelector(selectLoggedInUser)
    const product = useSelector(selectSelectedProduct)
    const [selectedImage, setSelectedImage] = useState()
    const cartItems = useSelector(selectCartItems)
    const cartItemAddStatus = useSelector(selectCartItemAddStatus)
    const wishlistItems = useSelector(selectWishlistItems)
    const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus)
    const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus)

    const isProductAlreadyInCart = cartItems.some((item) => item.product?._id === id)
    const isAdminUser = loggedInUser && loggedInUser._id != "77f2434c53bbe09c7c63f666";

    const tabs = ["Description", "Specification", "Warranty", "Reviews"];

    const discountAmount = (product?.discountPercentage / 100) * product?.price;
    let priceAfterDiscount = product?.price - discountAmount;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])

    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setSelectedImage(product.images[0]);
        }
    }, [product]);

    // Add wishlist status //
    useEffect(() => {
        if (wishlistItemAddStatus === 'fulfilled') {
            toast.success("Product added to wishlist")
        }
        else if (wishlistItemAddStatus === 'rejected') {
            toast.error("Error adding product to wishlist, please try again later")
        }
    }, [wishlistItemAddStatus])

    // Remove wishlist status //
    useEffect(() => {
        if (wishlistItemDeleteStatus === 'fulfilled') {
            toast.success("Product removed from wishlist")
        }
        else if (wishlistItemDeleteStatus === 'rejected') {
            toast.error("Error removing product from wishlist, please try again later")
        }
    }, [wishlistItemDeleteStatus])

    // Add product in cart //

    useEffect(() => {
        if (cartItemAddStatus === 'fulfilled') {
            toast.success("Product added to cart")
        }
        else if (cartItemAddStatus === 'rejected') {
            toast.error('Error adding product to cart, please try again later')
        }
    }, [cartItemAddStatus])

    useEffect(() => {
        const productInWishlist = wishlistItems.some(item => item.product?._id === product?._id);
        setIsInWishlist(productInWishlist);
    }, [wishlistItems, product])

    useEffect(() => {
        if (id) {
            dispatch(fetchProductByIdAsync(id))
        }
    }, [id, dispatch])

    // Handle when a thumbnail is clicked
    const handleImageShow = (newImage) => {
        setSelectedImage(newImage);
    };
    // Decrease Quantity
    const handleDecreaseQty = () => {
        if (quantity !== 1) {
            setQuantity(quantity - 1)
        }

    }
    // Increase Quantity
    const handleIncreaseQty = () => {
        if (quantity < 20 && quantity < product.stockQuantity) {
            setQuantity(quantity + 1)
        }
    };
    // Add to cart
    const handleAddToCart = () => {
        if (loggedInUser != null) {
            const item = {
                user: loggedInUser._id,
                product: id,
                quantity,
            };
            dispatch(addToCartAsync(item));
            setQuantity(1);
        } else {

            navigate("/login");
        }
    };

    // Add wishlist ///
    const handleAddRemoveFromWishlist = () => {
        if (loggedInUser && isAdminUser) {
            if (isInWishlist) {
                const itemIndex = wishlistItems.findIndex(item => item.product?._id === product?._id);
                dispatch(deleteWishlistItemByIdAsync(wishlistItems[itemIndex]._id));
            } else if (loggedInUser && isAdminUser) {
                dispatch(createWishlistItemAsync({ user: loggedInUser._id, product: product._id }));
            }
            setIsInWishlist(!isInWishlist);
        } else {
            toast.error("Please log in to add/remove items from the wishlist.");
        }
    };

    // Pass product and quantity as parameters
    const handleBuyNow = (product, quantity = 1) => {
        const isGuestUser = loggedInUser?._id === import.meta.env.VITE_GUESTUSER_ID;

        if (loggedInUser && !isGuestUser) {
            const checkoutData = {
                product: {
                    _id: product._id,
                    title: product.title,
                    price: product.price,
                    discountPercentage: product.discountPercentage,
                    thumbnail: product.thumbnail,
                },
                quantity,
            };
            navigate('/checkout', { state: checkoutData });
        } else {
            toast.error("Please login first to buy this product");
            navigate('/my-account');
        }
    };

    const handleGoToCart = () => {
        navigate('/cart');
    };
    const getYouTubeVideoId = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^\s&?]+)/);
        return match ? match[1] : null;
    };
    const videoId = getYouTubeVideoId(product?.videoLink);
    useEffect(() => {
        return () => {
            dispatch(clearSelectedProduct())
            dispatch(resetProductFetchStatus())
            // dispatch(resetReviewFetchStatus())
            dispatch(resetWishlistItemDeleteStatus())
            dispatch(resetWishlistItemAddStatus())
            dispatch(resetCartItemAddStatus())
        }
    }, [dispatch])


    // Function to parse the specs
    const rawSpecs = product?.technicalSpecification;

    // 2. Check if rawSpecs exists before parsing
    if (!rawSpecs) {
        return <div>Loading specifications...</div>;
    }


    const parseDescription = (product) => {
        const result = {};
        const lines = product?.description.split(/\r?\n/).map(line => line.trim()).filter(Boolean);

        let currentSection = "intro";
        result[currentSection] = "";

        lines.forEach((line) => {
            const isNewSection = /^[A-Za-z ]+:?$/.test(line);
            if (isNewSection) {
                currentSection = line.replace(":", "").trim();
                result[currentSection] = [];
            } else {
                if (currentSection === "intro") {
                    result[currentSection] += line + " ";
                } else {
                    result[currentSection].push(line);
                }
            }
        });

        return result;
    };

    const parsed = parseDescription(product);
    const features = parsed?.FEATURE || parsed?.Feature;
    return (
        <>
            <div className="product-page">

                <div className="sidebar-data">
                    <div className="categories">
                        {/* <button className="show-all">Show All Categories </button>
                        <div className="category-list">
                            <p>Drone Parts (2,061)</p>
                            <p>FPV Goggles (21)</p>
                            <p>Drone Kit (48)</p>
                            <p>Drone Frame and Accessories (339)</p>
                            <p>Flight Controller & Accessories (288)</p>
                            <p>Drone Transmitter and Receiver (228)</p>
                            <p>FPV Cameras (107)</p>
                            <p>FPV Camera Filters and Lenses (e)</p>
                            <p>Drone GPS Modules (86)</p>
                            <p>Drone Motor (636)</p>
                        </div> */}
                    </div>
                </div>

                <div className="product-content">
                    <div className="image-productinfo-section">
                        {/* Image Gallery Section */}
                        <div className="image-gallery">
                            <img src={selectedImage} alt="Main Product" className="main-image" />
                            <div className="thumbnail-group">
                                {product?.images.map((img, index) => (
                                    <div
                                        key={img}
                                        className={`thumbnail-wrapper ${selectedImage === img ? 'active' : ''}`}
                                        onClick={() => handleImageShow(img)}
                                    >
                                        <img
                                            src={img}
                                            alt={`Thumbnail ${index}`}
                                            className="thumbnail"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* {videoId && (
                                <div style={{ marginTop: '45px' }}>
                                    <iframe
                                        width="100%"
                                        height="200"
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        title="Product Video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{ borderRadius: "8px" }}
                                    ></iframe>
                                </div>

                            )} */}
                        </div>
                        {/* Product Info Section */}
                        <div className="product-info">
                            <div className="info">
                                <div className="product-header">
                                    <h5 className="product-category">
                                        {product?.category}
                                    </h5>
                                    <h1 className="product-title">{product?.title}</h1>
                                </div>
                                <p className="availability">
                                    Availability: {product?.stockQuantity <= 10
                                        ? `Only ${product?.stockQuantity} left`
                                        : product?.stockQuantity <= 20
                                            ? "Only few left"
                                            : <span >In Stock</span>}
                                </p>

                                <button className="add-wishlist" onClick={handleAddRemoveFromWishlist}>
                                    {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                                </button>
                                <p className="contact">
                                    <span> For bulk orders or B2B inquiries, email us:</span> <a href="mailto:engineering@orginv8.com">engineering@orginv8.com</a>
                                </p>
                                <hr />
                                <p className="sku">SKU: {product?.sku}</p>
                                {/* {Array.isArray(features) && features.length > 0 && (
                                    <ul className="specs-list">
                                        {features.map((item, index) => (
                                            <li key={index} className="specs-item">
                                                <span className="specs-value">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )} */}

                                <div className="price">
                                    {product?.discountPercentage > 0 ? (
                                        <>
                                            <span className="discounted-price ">₹{Math.round(priceAfterDiscount)}.00</span>
                                            <span className="original-price">₹{product?.price}.00</span>
                                            <span className="gst">(Incl. GST)</span>
                                        </>
                                    ) : (
                                        <>
                                            <span style={{ fontSize: '20px' }}>₹{product?.price}.00</span>
                                            <span style={{ fontSize: '14px' }}>(Incl. GST)</span>
                                        </>
                                    )}
                                </div>
                                {product?.stockQuantity <= 10 && (
                                    <div className="low-stock-product">
                                        <span>✓ Low Stock. Order Now!</span>
                                    </div>
                                )}

                                <div className="add-actions">
                                    <div className="quantity">
                                        <button onClick={handleDecreaseQty}>-</button>
                                        <span id="span">{quantity}</span>
                                        <button onClick={handleIncreaseQty}>+</button>
                                    </div>
                                    <div className="addbuybutton">
                                        {
                                            isProductAlreadyInCart ?
                                                <button className="add-cart" onClick={handleGoToCart}>In Cart</button>
                                                :
                                                <button className="add-cart" onClick={handleAddToCart}><FaCartPlus className="cart-icon" />Add to cart</button>

                                        }
                                        <button className="buy-now" onClick={() => handleBuyNow(product, quantity)}><FaCartPlus className="cart-icon" />Buy Now</button>
                                    </div>

                                </div>
                                <hr />
                                <div className="shipping-bar">
                                    <div className="features">
                                        <div className="feature-item">
                                            Have a Bulk Order?<br />
                                            <Link to="/bulk-enquiry" style={{ marginTop: '3px' }}>Click Here</Link>

                                        </div>
                                        <div className="feature-item">
                                            Need Support?<br />
                                            <Link to="/contact-us" style={{ marginTop: '3px' }}>Click Here</Link>
                                        </div>
                                        <div className="feature-item">
                                            Free Delivery<br />above ₹499
                                        </div>
                                        <div style={{ display: 'flex', gap: '16px', marginTop: '-13px' }}>
                                            <div>1 year Warranty</div>
                                            <div>Cash on Delivery</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="secondary-content">
                                        <p className="not-found-product">Didn't find what you are looking for?</p>
                                        <p className="product-details-brand">Brand: {product?.brand}</p>
                                        <p className="product-details-category">Category: {product?.category}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* New section  for product description and review */}
                    <div className="tab-section ">
                        <div className="tabs">
                            {tabs.map((tab) => (
                                <Link
                                    key={tab}
                                    to="#"
                                    className={`tab ${activeTab === tab ? "active" : ""}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveTab(tab);
                                    }}
                                >
                                    {tab}
                                </Link>
                            ))}
                        </div>

                        <div className="description-container">
                            {
                                activeTab === "Description" && (
                                    <ProductDescriptionTab description={product?.description} />
                                )
                            }
                            {
                                activeTab === "Specification" && (

                                    <TechnicalSpecifiction specStr={product?.technicalSpecification} />

                                )
                            }
                            {activeTab === "Warranty" && (
                                <div className="warranty-info">
                                    <h2 className="warranty-title">{product?.warranty}</h2>
                                    <hr />

                                </div>
                            )}

                            {
                                activeTab === "Reviews" && (
                                    <Reviews product={product} />
                                )
                            }


                        </div>
                    </div>

                </div>

            </div>

        </>
    );
};

export default ProductDetails;
