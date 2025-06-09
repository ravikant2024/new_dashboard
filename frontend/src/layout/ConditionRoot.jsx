import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsAuthChecked, selectLoggedInUser } from "../features/auth/AuthSlice";
import { RootLayout } from "./RootLayout";


const ConditionalRoot = () => {
    const location = useLocation();
    const loggedInUser = useSelector(selectLoggedInUser);
    const isAuthChecked = useSelector(selectIsAuthChecked);
    const guestUserId = import.meta.env.VITE_GUESTUSER_ID;

    const isGuest = loggedInUser?._id === guestUserId;
    const isAdmin = loggedInUser?.isAdmin;
    const isVerified = loggedInUser?.isVerified;

    const isLogoutPath = location.pathname === "/logout";

    // 🔒 Wait until auth check is done
    if (!isAuthChecked) {
        return <div>Checking authentication...</div>;
    }

    // 🚫 Don't redirect on logout
    if (isAdmin && isVerified && !isGuest && !isLogoutPath) {
        return <Navigate to="/admin-dashboard" replace />;
    }

    // ✅ Otherwise, show the RootLayout
    return <RootLayout />;
};

export default ConditionalRoot;
