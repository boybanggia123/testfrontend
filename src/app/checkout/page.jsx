// Tải Stripe với khóa công khai

const Checkout = () => {
  return <h2> Checkout</h2>;
};

export default Checkout;
// return (
//   <div className="container my-5">
//   <div className="row">

//     <div className="col-md-7">

//       <div className="d-flex justify-content-between mb-3">
// <img src="img/shoppay.jpg" alt="ShopPay" className="img-fluid w-25" />
// <img src="img/paypal.png" alt="PayPal" className="img-fluid w-25" />
// <img src="img/google.png"  alt="GPay" className="img-fluid w-25"  />
// </div>



//       <div className="text-center my-3">OR</div>

//       <div className="mb-4">
//         <h5>Account</h5>
//         <p>duantonghiep123@gmail.com</p>
//         <hr />
//       </div>

//       <h5>DELIVERY</h5>
//       <form>
//         <div className="form-group mb-3">
//           <label>Country/Region</label>
//           <select className="form-control">    
//             <option>English</option>
//             <option>Vietnamese</option>
//             <option>China</option>
//           </select>
//         </div>

//         <div className="form-row mb-3">
//           <div className="col">
//             <input type="text" className="form-control" placeholder="First name" />
//           </div> 
//           <div className="col"> 
//             <input type="text" className="form-control" placeholder="Last name" />
//           </div>
//         </div>

//         <input type="text" className="form-control mb-3" placeholder="Company (optional)" />
//         <input type="text" className="form-control mb-3" placeholder="Address" />
//         <input type="text" className="form-control mb-3" placeholder="Apartment, suite, etc. (optional)" />

//         <div className="form-row mb-3">
//           <div className="col">
//             <input type="text" className="form-control" placeholder="City" />
//           </div>
//           <div className="col">
//             <input type="text" className="form-control" placeholder="State" />
//           </div>
//           <div className="col">
//             <input type="text" className="form-control" placeholder="ZIP code" />
//           </div>
//         </div>

//         <input type="text" className="form-control mb-3" placeholder="Phone" />
//       </form>


//       <h5 className="mt-4">PAYMENT METHOD</h5>
//       <form>
// <div className="form-check mb-3 d-flex justify-content-between align-items-center">
//   <div>
//     <input className="form-check-input" type="radio" name="paymentMethod" id="creditCard" />
//     <label className="form-check-label" htmlFor="creditCard">
//       Credit card
//     </label>
//   </div>

//   <img src="img/visa.png" alt="Credit Card Logos" className="img-fluid" style={{ width: '70px' }} />
// </div>

// <input type="text" className="form-control mb-3" placeholder="Card number" />
// <input type="text" className="form-control mb-3" placeholder="Expiration date (MM/YY)" />
// <input type="text" className="form-control mb-3" placeholder="Security code" />
// <input type="text" className="form-control mb-3" placeholder="Name on card" />


// <div className="form-check mb-3">
//   <input className="form-check-input" type="checkbox" id="sameAddress" />
//   <label className="form-check-label" htmlFor="sameAddress">
//     Use shipping address as billing address
//   </label>
// </div>

// <div className="form-check mb-3 d-flex justify-content-between align-items-center">
//   <div>
//     <input className="form-check-input" type="radio" name="paymentMethod" id="payPal" />
//     <label className="form-check-label" htmlFor="payPal">
//       PayPal
//     </label>
//   </div>
//   <img src="img/Paypal.png" alt="PayPal" className="img-fluid" style={{ width: '70px' }} />
// </div>
// </form>
//     </div> 
//     <div className="col-md-5">
//       <div className="border p-4">
//         <div className="d-flex justify-content-between mb-2">
//           <img src="img/pant1.webp" alt="Jeans" className="img-fluid" style={{ width: '50px' }} />
//           <span>Off The Clock Stretch Cargo Skinny Jeans</span>
//           <span>$20.99</span>
//         </div>
//         <div className="d-flex justify-content-between mb-2">
//           <img src="img/shoes2.webp" alt="Trench Coat" className="img-fluid" style={{ width: '50px' }} />
//           <span>Wanna Be Loved Trench Coat</span>
//           <span>$20.99</span>
//         </div>
//         <hr />
//         <div className="d-flex justify-content-between">
//           <span>Subtotal (2 items)</span>
//           <span>$92.98</span>
//         </div>
//         <div className="d-flex justify-content-between">
//           <span>Shipping</span>
//           <span>$0</span>
//         </div>
//         <hr />
//         <div className="d-flex justify-content-between">
//           <strong>Total</strong>
//           <strong>$92.98</strong>
//         </div>
//         <div className="mt-3">
//           <input type="text" className="form-control" placeholder="Discount code or gift card" />
//           <button className="btn btn-outline-secondary mt-2 w-100">Apply</button>
//         </div>
//         <div className="form-check mt-4">
//           <input className="form-check-input" type="checkbox" id="rememberMe" />
//           <label className="form-check-label" htmlFor="rememberMe">
//             Save my information for a faster checkout
//           </label>
//         </div>
//         <button className="btn btn-primary btn-lg w-100 mt-3" style={{ backgroundColor: 'black', color: 'white' }}>Pay Now</button>
//       </div>
//     </div>
//   </div>
// </div>


// );