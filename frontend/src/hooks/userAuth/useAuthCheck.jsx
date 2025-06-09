import { useEffect } from 'react'
import { checkAuthAsync, selectLoggedInUser } from '../../features/auth/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'

export const useAuthCheck = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loggedInUser) {
      dispatch(checkAuthAsync())
    }
  }, [dispatch, loggedInUser])
}
