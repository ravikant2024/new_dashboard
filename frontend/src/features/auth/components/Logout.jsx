import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAsync, selectLoggedInUser } from '../AuthSlice'
import { clearCart } from '../../cart/CartSlice'
import { useNavigate } from 'react-router-dom'
import { resetUserInfo } from '../../user/UserSlice'

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loggedInUser = useSelector(selectLoggedInUser);

    useEffect(() => {
        dispatch(logoutAsync())
        dispatch(resetUserInfo());
        dispatch(clearCart());
    }, [dispatch]);

    useEffect(() => {
        navigate("/")

    }, [loggedInUser])

    return (
        <></>
    );

}

export default Logout
