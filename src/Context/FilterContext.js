import { createContext, useContext, useState } from "react";
import { DataContext } from "../Context/DataContext";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const { products } = useContext(DataContext);
  const updateBrands = (brandName) => {
    if (brands.includes(brandName)) {
      setBrands((brands) => brands.filter((brand) => brand !== brandName));
    } else {
      setBrands((brands) => [...brands, brandName]);
    }
  };
  const updateCategories = (categoryName) => {
    if (categories.includes(categoryName)) {
      setCategories((categories) =>
        categories.filter((category) => category !== categoryName)
      );
    } else {
      setCategories((categories) => [...categories, categoryName]);
    }
  };
  const filterByBrands = (products) => {
    if (brands.length === 0) {
      return products;
    }
    return products.filter((product) => brands.includes(product.brand));
  };
  const filterByCategories = (products) => {
    if (categories.length === 0) {
      return products;
    }
    return products.filter((product) => categories.includes(product.type));
  };
  const applyFiltersToProducts = (products, ...allFilters) => {
    const reducer = (accumulator, currentFn) => {
      const curryFn = (accumulator) => (currentFn) => currentFn(accumulator);
      return curryFn(accumulator)(currentFn);
    };
    return allFilters.reduce(reducer, products);
  };
  const filteredProducts = applyFiltersToProducts(
    products,
    filterByBrands,
    filterByCategories
  );
  const value = {
    filteredProducts,
    updateBrands,
    updateCategories
  };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
