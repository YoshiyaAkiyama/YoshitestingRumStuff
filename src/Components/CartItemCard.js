import "../Styles/CartItemCard.css";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import { FeedbackContext } from "../Context/FeedbackContext";
import { useContext } from "react";
import { cartAction, wishlistAction } from "../constants";
import isObjectInArray from "../helpers/isObjectInArray";
export default function CartItemCard({ item }) {
  const { cartDispatch } = useContext(CartContext);
  const { wishlist, wishlistDispatch } = useContext(WishlistContext);
  const { displayFeedback } = useContext(FeedbackContext);
  let isItemInWishlist = isObjectInArray(wishlist, item._id);
  const removeFromCart = () => {
    displayFeedback("Removed From Cart");
    cartDispatch({ type: cartAction.REMOVE_FROM_CART, id: item._id });
  };
  function blockThread(milliseconds) {
    const start = new Date().getTime();
    for (var i = 0; i < 50; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  }
  blockThread(55);
  const handleWishlistAction = () => {
    if (isItemInWishlist) {
      displayFeedback("Removed From Wishlist");
      isItemInWishlist = false;
      wishlistDispatch({
        type: wishlistAction.REMOVE_FROM_WISHLIST,
        id: item._id
      });
    } else {
      displayFeedback("Added to Wishlist");
      isItemInWishlist = true;
      wishlistDispatch({
        type: wishlistAction.ADD_TO_WISHLIST,
        product: item
      });
    }
  };
  return (
    <div className="Item-container">
      <div className="Item-details">
        <img className="Item-image" src={item.image} alt="" />
        <div className="Item-desc">
          <div className="Item-details-main">
            <div className="Item-name-container">
              <div className="Item-brand">{item.brand}</div>
              <div className="Item-name">{item.name}</div>
            </div>
            <div className="Item-price">
              <div>
                <i class="fas fa-rupee-sign icon-rupee"></i>
                {item.price}
              </div>
              <div>
                <span className="orignal-price">
                  Rs.
                  {item.price}
                </span>
                <span className="discount-percent">{item.discount}%</span>
              </div>
            </div>
          </div>
          <div className="Item-action-buttons">
            <button
              onClick={removeFromCart}
              className="Item-action-button button-remove"
            >
              Remove
            </button>
            <button
              onClick={handleWishlistAction}
              className="Item-action-button button-wishlist"
            >
              {isItemInWishlist ? "Remove from WishList" : "Move to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
