import { createContext, useEffect, useState } from "react";
import { API } from "../constants";
import axios from "axios";
export const DataContext = createContext();

export function DataProvider({ children }) {
  const [currentCategory, setCurrentCategory] = useState("mens");
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoadingProducts, setLoadingProducts] = useState(false);
  useEffect(() => {
    async function fetchProducts() {
      setLoadingProducts(true);
      if (currentCategory === "") {
        return;
      }
      const response = await axios.get(`${API}/products/${currentCategory}`);
      setProducts(response.data.products);
      setBrands(response.data.brands);
    }
    fetchProducts();
  }, [currentCategory]);
  useEffect(() => {
    setLoadingProducts(false);
  }, [products]);
  const value = {
    currentCategory,
    isLoadingProducts,
    setCurrentCategory,
    products,
    brands
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
