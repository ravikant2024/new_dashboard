import React, { useEffect } from 'react';
import './refundPolicy.css';

const RefundPolicy = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    })
  }, [])
  return (
    <div className="refund-container">
      <h1 className="refund-title">Refund Policy</h1>

      <section>
        <h2>100% Refund/Replacement:</h2>
        <p>We guarantee to provide accurate descriptions and high quality product as mentioned in the website. In order to protect customers from shipping damage, item mismatch or parts missing etc., we are providing 2 days time (From the date of order delivery) to report the complaint kindly raise a ticket from the website by clicking on support page. Our technical team will verify the submitted details visually and will issue RMA number to return the material. Once we received the product our experts will verify the issue reported and will send the replacement items to the customer shipping cost prepaid by us.In case, we do not have the product in stock to provide replacement, we will issue 100% refund. Furthermore, no warranty will apply if the Product has been subject to misuse, static discharge, neglect, accident, modification, or has been soldered or altered in any way.Due to the nature of the products we are selling and our strict quality policy, we are unable to offer order cancellation and return without valid reason. Even though order cancelled and refunded.Due to the nature of the products we are selling and our strict quality policy, we are unable to offer order cancellation and return without valid reason. ORIGINAL INNOVATION LLP reserves the right to take the final decision on all refund request. . reserves the right to take the final decision on all refund request.</p>
      </section>

      <section>
        <h2>Canceling An Order:</h2>
        <p>You want it canceled? You can ask us (our support team ) to cancel your order, update an address. Customer Service will get back to you by email within one business day regarding your request. Only orders that are still in status “Pending” or “Payment Verification” can be altered or cancelled. If your order has already moved to a different status, you won’t be able to alter it or cancel it.In some cases Order cancellation may attract 5% bank charges depending on the payment methods used by customer.(It is because most of payment gateway providers collect their Commision even though order cancelled and refunded.).Due to the nature of the products we are selling and our strict quality policy, we are unable to offer order cancellation and return without valid reason. ORIGINAL INNOVATION LLP reserves the right to take the final decision on all refund request. .</p>
      </section>

      <section>
        <h2>Return Guidelines:</h2>
        <p>Once we confirmed the faulty item cannot be repairable by customer or by Remote Desktop , we will issue the RMA Number, which you have to meantion clearly on Shipping boxes. Do not write anything on the merchandise packaging (Product package). Defective unused merchandise will be replaced within 2 days of receipt. All returns must include a copy of the original packing list that came with your shipment.</p>
      </section>

      <section>
        <h2>Limits Of Responsibility:</h2>
        <p>We accept no responsibility for improper installation of our products. Electrical polarity must be properly observed in hooking up electrical components.</p>
        
      </section>

    </div>
  );
};

export default RefundPolicy;