import Footer from "../Components/Footer";
import "../Styles/WishlistPage.css";
import ProductCard from "../Components/ProductCard";
import { WishlistContext } from "../Context/WishlistContext";
import { useContext } from "react";
export default function WishlistPage() {
  const { wishlist } = useContext(WishlistContext);
  return (
    <>
      <div className="Wishlist-title">
        <div className="Wishlist-title-container">
          <h1>My Wishlist</h1>
          <span>&nbsp;-{wishlist.length} items</span>
        </div>
      </div>
      <div className="Wishlist-products-container">
        <div className="Wishlist-products">
          {wishlist.length === 0 ? (
            <h3 style={{ height: "200px" }}>Wishlist Empty</h3>
          ) : (
            ""
          )}
          {wishlist.map((product) => (
            <ProductCard id={product._id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
