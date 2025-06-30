import React from 'react'
// import "./orderDetails2.css"
const OrderDetails2 = () => {
  return (
    <>
     <div class="page">

    {/* <!--‑‑ Filter sidebar ‑‑--> */}
    <aside class="sidebar">
      <h2 class="sidebar__title">Filters</h2>

      <section class="filter">
        <h4 class="filter__heading">ORDER STATUS</h4>
        <label><input type="checkbox" /> On the way</label>
        <label><input type="checkbox" /> Delivered</label>
        <label><input type="checkbox" /> Cancelled</label>
        <label><input type="checkbox" /> Returned</label>
      </section>

      <section class="filter">
        <h4 class="filter__heading">ORDER TIME</h4>
        <label><input type="checkbox" /> Last 30 days</label>
        <label><input type="checkbox" /> 2024</label>
        <label><input type="checkbox" /> 2023</label>
        <label><input type="checkbox" /> 2022</label>
      </section>
    </aside>

    {/* <!--‑‑ Main content ‑‑--> */}
    <main class="content">

      {/* <!-- Search bar --> */}
      <form class="search">
        <input type="search" placeholder="Search your orders here" />
        <button type="submit">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
            <line x1="17" y1="17" x2="22" y2="22" stroke="currentColor" stroke-width="2"/>
          </svg>
          Search Orders
        </button>
      </form>

      {/* <!-- One order card --> */}
      <article class="order">
        <img src="https://via.placeholder.com/80x80/004225/ffffff?text=T" alt="" class="order__thumb" />
        <div class="order__info">
          <h3 class="order__title">Triptee Solid Men Polo Neck Dark Green T‑shirt</h3>
          <p class="order__meta">Color: Dark Green&nbsp;&nbsp; Size: M</p>
        </div>
        <p class="order__price">₹301</p>
        <div class="order__status order__status--success">
          <p class="order__status-head"><span class="dot"></span> Arriving tomorrow by 11 pm</p>
          <p class="order__status-sub">Your item has been shipped.</p>
        </div>
      </article>

      {/* <!-- Failed payment example --> */}
      <article class="order">
        <img src="https://via.placeholder.com/80x80/004225/ffffff?text=T" alt="" class="order__thumb" />
        <div class="order__info">
          <h3 class="order__title">Triptee Solid Men Polo Neck Dark Green T‑shirt</h3>
          <p class="order__meta">Color: Dark Green&nbsp;&nbsp; Size: M</p>
        </div>
        <p class="order__price">₹301</p>
        <div class="order__status order__status--danger">
          <p class="order__status-head"><span class="dot"></span> Order Not Placed</p>
          <p class="order__status-sub">Your payment was not confirmed by the bank.</p>
        </div>
      </article>

  
      <article class="order">
        <img src="https://via.placeholder.com/80x80/facc15/000000?text=Y" alt="" class="order__thumb" />
        <div class="order__info">
          <h3 class="order__title">EVIQE Men Solid Casual Yellow Shirt</h3>
          <p class="order__meta">Color: Yellow&nbsp;&nbsp; Size: M</p>
        </div>
        <p class="order__price">₹326</p>
        <div class="order__status order__status--danger">
          <p class="order__status-head"><span class="dot"></span> Cancelled on Jun 23</p>
          <p class="order__status-sub">
            You requested a cancellation due to quality issues with the product.
          </p>
        </div>
      </article>

    </main>
  </div>
    </>
  )
}

export default OrderDetails2
