import React from 'react'
import '../css/OrderSuccessPage.css'
import { selectUserInfo } from '../features/user/UserSlice'
import { resetCurrentOrder, selectCurrentOrder } from '../features/orders/OrderSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
const OrderSuccessPage = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const currentOrder=useSelector(selectCurrentOrder)
  const userDetails=useSelector(selectUserInfo)

  useEffect(()=>{
      if(!currentOrder){
          navigate("/")
      }
  },[currentOrder])
  const handleButtonClick = () => {
    // dispatch(resetCurrentOrder());  
    navigate('/orders');  
  };
  return (
   <>
   <div className="container">
    <div className="order-success">
      {/* <div className="animation">
        <img src="path_to_order_success_animation.gif" alt="Order Success"/>
      </div> */}

      <div className="order-success-details">
        <h6 className="greeting">Hey {userDetails?.name}</h6>
        <h5 className="order-confirmation">Your Order #{currentOrder?._id} is confirmed</h5>
        <p className="thank-you">Thank you for shopping with us❤️</p>
      </div>

      <div className="order-actions">
        {/* <button to={'/orders'} onClick={()=>dispatch(resetCurrentOrder())}>Check order status in my orders</button> */}
        <button onClick={handleButtonClick}>
      Check order status in my orders
    </button>
      </div>
    </div>
  </div>
   </>
  )
}

export default OrderSuccessPage


