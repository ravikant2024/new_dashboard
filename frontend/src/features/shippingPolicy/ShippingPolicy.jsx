import React, { useEffect } from 'react'
import './ShippingPolicy.css';
const ShippingPolicy = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])
    return (
        <div>
            <div className="shipping-container">
                <h1 className="shipping-heading">Shipping Policy</h1>

                <section>
                    <h2>Shipping Policies</h2>
                    <p>To ensure that your order reaches you in the fastest time and in good condition, we only ship through reputed courier agencies. While we shall strive to ship all items in your order together, this may not always be possible due to product characteristics, or availability. However, we will inform you before doing it. If you believe that the product is not in good condition, or if the packaging is tampered with or damaged, before accepting delivery of the goods, please refuse to take delivery of the package, and call our Customer Care *+919599466635 or Contact us, mentioning your order reference number. We shall make our best efforts to ensure that a replacement delivery is made to you at the earliest. You may track the shipping status of your order on our website, by clicking at Track your Order section. Please note all items (including gifts) will be shipped with an invoice mentioning the price, as per Indian Tax Regulations.</p>                </section>

                <section>
                    <h2>Shipping Partners</h2>
                    <p>We use Fedex, Aramex to ship our products to your destination as available during checkout and chosen by you. We also can ship through EMS Speed post on special request to remote locations, if you think that our shipping partners does not have coverage or served you improperly. HOWEVER, WE CAN’T GUARANTEE TO COMPLY TO YOUR REQUEST. This is due to the reason each shipment content is being verified by the post office before accepting. If they feel that the item may be damaged, then they will not accept the shipment.</p></section>

                <section>
                    <h2>Shipping Time / Delivery Time</h2>
                    <p>We make our best efforts to ship your order within same day of the order. 99% of our orders are shipped within 24 Hours. We ship on week days (Monday to Saturday), excluding public holidays. Orders placed on SUNDAY will be shipped only on MONDAY Orders placed before 1.00 PM will be shipped on the same day except on Sundays and Public Holidays. Shipments through courier partner , if created before 02:00 PM will be picked up by them on the same day. Otherwise, the shipment will be picked up only on the next day. Though we can guarantee a delivery time of 2-5 days to anywhere in India, it is totally beyond our control. Each shipping companies have their own methods, intermediate transit locations etc. and the delivery time is not predictable. Please plan your order allowing sufficient time for the delivery instead of last minute orders.</p>
                </section>

                <section>
                    <h2>Guarantee/Warranty</h2>
                    <p>All items are delivered with standard warranty (unless otherwise specified in the product page) to protect the customers from any manufacturing defect.If you have any problems with your order, please notify us within this duration from date of shipment of any defective product. You agree to pay for the return shipping on exchanges and returns and we will reimburse this cost upon verification of a defect with the product. We will replace or repair the damaged products at free of cost with shipping prepaid by us. In case ,we do not have the product in stock to provide replacement, we will issue 100% refund. Furthermore, no warranty will apply if the Product has been subject to misuse, static discharge, neglect, accident, modification, or has been soldered or altered in any way. To the product need to be exchanged, firstly, please send the photos of damaged products to us. We will estimate the damages then decide the best way to exchange or return the product.If the particular item is not in stock to replace ,we will provide the full refund.</p>
                </section>

            </div>
        </div>
    )
}

export default ShippingPolicy
