import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthChecked, selectLoggedInUser } from "../AuthSlice";

export const ProtectedAdmin = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const guestUserId = import.meta.env.VITE_GUESTUSER_ID;
  const isGuestUser = loggedInUser?._id === guestUserId;
  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  if (
    loggedInUser &&
    loggedInUser.isVerified &&
    loggedInUser.isAdmin &&
    !isGuestUser
  ) {
    return children;
  }

  return <Navigate to="/" replace />;
};
