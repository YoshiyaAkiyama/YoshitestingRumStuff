import "../Styles/CartPage.css";
import { CartContext } from "../Context/CartContext";
import { useContext } from "react";
import CartItemCard from "../Components/CartItemCard";
import Footer from "../Components/Footer";
import getTotalDiscount from "../helpers/getTotalDiscount";
import sumValueArrayOfObjects from "../helpers/sumValueArrayOfObjects";
export default function CartPage() {
  const { cart } = useContext(CartContext);
  const cartTotal = sumValueArrayOfObjects(cart, "price");
  const discount = getTotalDiscount(cart);
  let discountedTotal = (cartTotal * discount) / 100;
  discountedTotal = discountedTotal ? discountedTotal.toFixed(2) : 0;
  const handleFetch = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <section className="Cart-container">
        <div className="Cart-products">
          <div className="Cart-products-title">
            <span>My Cart ({cart.length} items)</span>
            <span>Total: Rs.{cartTotal}</span>
          </div>
          <div className="Cart-items-container">
            {cart.length === 0 ? <h3>Cart Empty</h3> : ""}
            {cart.map((item) => (
              <CartItemCard id={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="Cart-checkout">
          <div className="Price-container">
            <div className="Price-header">
              PRICE DETAILS ({cart.length} items)
            </div>
            <div className="Price-breakup-container">
              <div className="Price-breakup-row">
                <span className="Price-title">Total MRP</span>
                <span className="Price-value">
                  <i class="fas fa-rupee-sign icon-rupee"></i>
                  {cartTotal}
                </span>
              </div>
              <div className="Price-breakup-row">
                <span className="Price-title">Discount on MRP</span>
                <span className="Price-value color-green">
                  -&nbsp;
                  <i class="fas fa-rupee-sign icon-rupee color-green"></i>
                  {discountedTotal}
                </span>
              </div>
              <div className="Price-breakup-row">
                <span className="Price-title">Delivery Charges</span>
                <span className="Price-value color-green">FREE</span>
              </div>
              <div className="Price-total-row">
                <span className="Total-header">Total Amount</span>
                <span className="Total-value">
                  <i class="fas fa-rupee-sign icon-rupee"></i>
                  {(cartTotal - discountedTotal).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="Button-container">
            <button onClick={handleFetch} className="Checkout-button">
              Place Order
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
