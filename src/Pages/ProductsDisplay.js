import ProductCard from "../Components/ProductCard";
import useToggleState from "../customHooks/useToggleState";
import FilterSideBar from "../Components/FilterSideBar";
import { FilterContext } from "../Context/FilterContext";
import "../Styles/ProductsDisplay.css";
import { useContext } from "react";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import { DataContext } from "../Context/DataContext";

export default function ProductsDisplay(props) {
  const { currentCategory, isLoadingProducts } = useContext(DataContext);
  const { filteredProducts } = useContext(FilterContext);
  const [displayFilters, toggleDisplayFilters] = useToggleState(true);
  const handleFilterDisplay = () => {
    toggleDisplayFilters();
  };
  if (isLoadingProducts) {
    return <Loader />;
  }
  return (
    <>
      <main>
        <div className="Products-title">
          <div className="Products-title-container">
            <h1>{currentCategory}</h1>
            <span>&nbsp;- {filteredProducts.length} items</span>
          </div>
        </div>
        <section className="Main-section">
          <div>
            <button onClick={handleFilterDisplay} className="Filter-button">
              Filters{" "}
              <i
                className={`fas fa-arrow-left ${
                  displayFilters ? "rotate-180" : ""
                }`}
              ></i>
            </button>
            <FilterSideBar displayFilters={displayFilters} />
            <div
              className="Product-list"
              style={{ marginLeft: !displayFilters ? "" : "252px" }}
            >
              {filteredProducts.map((product) => (
                <ProductCard id={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
