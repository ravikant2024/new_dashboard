// src/App.js
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layout/RootLayout';
import HomePage from './pages/HomePage';
import MyAccountPage from './pages/MyAccountPage';
import CartPage from './pages/CartPage';
import TruckOrderPage from './pages/TruckOrderPage';
import OrdersPage from './pages/OrdersPage';
import OtpVerificationPage from './pages/OtpVerificationPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { UserFetchDetails } from './hooks/userAuth/UserFetchDetails';
import { selectLoggedInUser } from './features/auth/AuthSlice';
import { useSelector } from 'react-redux';
import UserProfile from './features/user/components/UserProfile';
import CheckoutPage from './pages/CheckoutPage';
import { Protected } from "./features/auth/components/Protected";
import { useAuthCheck } from './hooks/userAuth/useAuthCheck';
import Logout from './features/auth/components/Logout';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import Dashboard from './adminpanel/pages/Dashboard';
import AddBrandPage from './adminpanel/pages/AddBrandPage';
import AddCategoryPage from './adminpanel/pages/AddCategoryPage';
import AddProductPage from './adminpanel/pages/AddProductPage';
import OrdersDetailsPage from './adminpanel/pages/OrdersDetailsPage';
import AdminSettingPage from './adminpanel/pages/AdminSettingPage';
import ProfilePage from './adminpanel/pages/ProfilePage';
import PageNotFound from './pages/PageNotFound';
import WishlistPage from './pages/WishlistPage';
import AddCouponPage from './adminpanel/pages/AddCouponPage';
import CouponListPage from './adminpanel/pages/CouponListPage';
import PaymentPage from './pages/PaymentPage';
import OrderSuccess from './pages/OrderSuccess';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ResetPassword from './features/auth/components/myAccount/ResetPassword';
import AdminLayOut from './layout/AdminLayOut';
import AdminLoginPage from './adminpanel/pages/AdminLoginPage';
import UsersList from './adminpanel/users/components/UsersList';
import ListProductPage from './adminpanel/pages/ListProductPage';
import { ProtectedAdmin } from './features/auth/components/ProtectedAdmin';
import ListCategoryPage from './adminpanel/pages/ListCategoryPage';
import CategorySidebarList from './features/categories/catSidebarDropDown/CategorySidebarList';
import AddBlogPage from './adminpanel/pages/AddBlogPage';
import BlogDetails from './features/blogs/components/BlogDetails';
import BlogList from './adminpanel/addBlog/BlogList';
import BulkEnquiryPage from './pages/BulkEnquiryPage';
import B2BPage from './pages/B2BPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import ContactUs from './features/contact/componets/ContactUs';
import ViewAllBlogPage from './pages/ViewAllBlogPage';
import ViewAllVideoPage from './pages/ViewAllVideoPage';
import AboutUs from './features/aboutUs/components/AboutUs';
import Careers from './features/careers/components/Careers';
import RefundPolicy from './features/refundPolicy/RefundPolicy';
import PrivacyPolicy from './features/privacyPolicy/PrivacyPolicy';
import ShippingPolicy from './features/shippingPolicy/ShippingPolicy';
import ConditionalRoot from './layout/ConditionRoot';
import SearchProductListPage from './pages/SearchProductListPage';
import ContactUserPage from './adminpanel/pages/ContactUserPage';
import BulkEnquiryFormpage from './pages/BulkEnquiryFormpage';
import BulkEnquiryListPage from './adminpanel/pages/BulkEnquiryListPage';
function App() {
  const loggedInUser = useSelector(selectLoggedInUser);
  useAuthCheck();
  UserFetchDetails(loggedInUser);

  return (
    <>
      <ReactTooltip id="global-tooltip" place="top" effect="solid" />
      <Routes>
        {/* Public route WITHOUT RootLayout */}
        <Route path="/bulk-enquiry" element={<BulkEnquiryPage />} />
        <Route path="b2b" element={<B2BPage />} />
        {/* Routes that use RootLayout */}
        <Route path="/" element={<ConditionalRoot />}>
          <Route index element={<HomePage />} />
          <Route path="my-account" element={<MyAccountPage />} />
          <Route path="order-tracking" element={<TruckOrderPage />} />
          <Route path="verify-otp" element={<OtpVerificationPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="refund-policy" element={<RefundPolicy />} />
          <Route path="shipping-policy" element={<ShippingPolicy />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="careers" element={<Careers />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="reset-password/:userId/:passwordResetToken" element={<ResetPassword />} />
          <Route path="product-category/:name" element={<CategorySidebarList />} />
          <Route path="blog/:id" element={<BlogDetails />} />
          <Route path='latest-products' element={<NewArrivalsPage />} />
          <Route path='view-all-blogs' element={<ViewAllBlogPage />} />
          <Route path='view-all-video' element={<ViewAllVideoPage />} />
          <Route path='search-product-list' element={<SearchProductListPage />} />
          <Route path='bulk-enquiry/enquiry' element={<BulkEnquiryFormpage />} />

          {/* Protected Routes */}
          <Route path="cart" element={<Protected><CartPage /></Protected>} />
          <Route path="user-profile" element={<Protected><UserProfile /></Protected>} />
          <Route path="checkout" element={<Protected><CheckoutPage /></Protected>} />
          <Route path="logout" element={<Protected><Logout /></Protected>} />
          <Route path="product-details/:id" element={<Protected><ProductDetailsPage /></Protected>} />
          <Route path="orders" element={<Protected><OrdersPage /></Protected>} />
          <Route path="order-success/:id" element={<Protected><OrderSuccessPage /></Protected>} />
          <Route path="order-success" element={<Protected><OrderSuccess /></Protected>} />

          {/* 404 Page */}
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* Admin Login Page (outside layout) */}
        {/* <Route path="/my-account" element={<AdminLoginPage />} /> */}

        {/* Admin dashboard with admin layout */}
        <Route path="/admin-dashboard" element={<ProtectedAdmin><AdminLayOut /></ProtectedAdmin>}>
          <Route index element={<Dashboard />} />
          <Route path="add-brand" element={<AddBrandPage />} />
          <Route path="add-category" element={<AddCategoryPage />} />
          <Route path="add-products" element={<AddProductPage />} />
          <Route path="product-list" element={<ListProductPage />} />
          <Route path="order-details" element={<OrdersDetailsPage />} />
          <Route path="setting" element={<AdminSettingPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="add-coupon" element={<AddCouponPage />} />
          <Route path="list-coupon" element={<CouponListPage />} />
          <Route path="users-list" element={<UsersList />} />
          <Route path="category-list" element={<ListCategoryPage />} />
          <Route path="add-blog" element={<AddBlogPage />} />
          <Route path="blog-list" element={<BlogList />} />
          <Route path="contactus-user-list" element={<ContactUserPage />} />
          <Route path="bulk-enquiry-list" element={<BulkEnquiryListPage />} />
        </Route>
        {/* Payment Page */}
        <Route path="/payment_page" element={<PaymentPage />} />
      </Routes>

    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
