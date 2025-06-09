import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthChecked, selectLoggedInUser } from "../AuthSlice"; 

export const Protected = ({ children }) => {
    const loggedInUser = useSelector(selectLoggedInUser);  
        const isAuthChecked = useSelector(selectIsAuthChecked);

    if (!isAuthChecked) {
        return null;  
    }
    if (loggedInUser && loggedInUser.isVerified) {
        return children;  
    }
    
    return <Navigate to="/my-account" replace />;
};


