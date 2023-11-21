import "../Styles/ProductCard.css";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { FeedbackContext } from "../Context/FeedbackContext";
import { cartAction, wishlistAction } from "../constants";
import { WishlistContext } from "../Context/WishlistContext";
import isObjectInArray from "../helpers/isObjectInArray";
export default function ProductCard({ inWishlist, product }) {
  const { displayFeedback, setFeedbackText } = useContext(FeedbackContext);
  const { cart, cartDispatch } = useContext(CartContext);
  const { wishlist, wishlistDispatch } = useContext(WishlistContext);
  let isProductInCart = isObjectInArray(cart, product._id);
  let isProductInWishlist = isObjectInArray(wishlist, product._id);
  const discountPrice = ((product.price / 100) * product.discount).toFixed(0);
  const handleCartActions = () => {
    if (isProductInCart) {
      displayFeedback("Removed From Cart");
      isProductInCart = false;
      cartDispatch({ type: cartAction.REMOVE_FROM_CART, id: product._id });
    } else {
      displayFeedback("Added to Cart");
      isProductInCart = true;
      cartDispatch({ type: cartAction.ADD_TO_CART, product: product });
    }
  };
  const handleWishlistActions = () => {
    if (isProductInWishlist) {
      displayFeedback("Removed From Wishlist");
      isProductInWishlist = false;
      wishlistDispatch({
        type: wishlistAction.REMOVE_FROM_WISHLIST,
        id: product._id
      });
    } else {
      displayFeedback("Added to Wishlist");
      isProductInWishlist = true;
      wishlistDispatch({
        type: wishlistAction.ADD_TO_WISHLIST,
        product: product
      });
    }
  };
  return (
    <>
      <div className="ProductCard">
        <div className="ProductCard-body">
          <img className="Product-image" src={product.image} alt="" />
          <div className="Product-info">
            <div className="Product-actions">
              <div className="Action-Buttons">
                <button
                  onClick={handleWishlistActions}
                  className="Action-button Button-wishlist"
                >
                  <i
                    className={`far ${
                      isProductInWishlist ? "fa-trash-alt" : "fa-heart"
                    }`}
                  ></i>
                </button>
                &nbsp;
                <button
                  onClick={handleCartActions}
                  className="Action-button Button-cart"
                >
                  {isProductInCart ? "Remove From Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
            <h3 className="Product-brand">{product.brand}</h3>
            <h4 className="Product-name">{product.name}</h4>
            <div className="Product-price">
              <span>
                <span className="Product-discountedPrice">
                  Rs. {product.price - discountPrice}
                </span>
                <span className="Product-orignalPrice">Rs.{product.price}</span>
              </span>
              <span className="Product-discountPercent">
                ({product.discount}% OFF)
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
