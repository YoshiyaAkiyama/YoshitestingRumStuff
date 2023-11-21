import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import LandingPage from "./Pages/LandingPage";
import ProductsDisplay from "./Pages/ProductsDisplay";
import WishlistPage from "./Pages/WishlistPage";
import CartPage from "./Pages/CartPage";
import { DataProvider } from "./Context/DataContext";
import { CartProvider } from "./Context/CartContext";
import { WishlistProvider } from "./Context/WishlistContext";
import { FeedbackProvider } from "./Context/FeedbackContext";
import Feedback from "./Components/Feedback";
import { FilterProvider } from "./Context/FilterContext";

// add @datadog/browser-rum in the dependancies

// IMPORTANT ===>> add the RUM init code below and useCrossSiteSessionCookie: true

import { datadogRum } from "@datadog/browser-rum";

datadogRum.init({
  applicationId: "b868918a-5c49-49ca-a88d-fd67e3af9753",
  clientToken: "pube3f0325136815c4c9339a9f9358c2f23",
  site: "datadoghq.com",
  service: "beforeSendTest",
  env: "test",
  version: "1.0.0",
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: "mask-user-input",
  useCrossSiteSessionCookie: true,
  beforeSend: (event) => {
    event.context.stuff = "hello";
    console.log(event);
  }
});

export default function App() {
  return (
    <div className="App">
      <DataProvider>
        <Navbar />
        <Banner />
        <CartProvider>
          <WishlistProvider>
            <FeedbackProvider>
              <FilterProvider>
                <Feedback />
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route
                    path="/products/:category"
                    element={<ProductsDisplay />}
                  />
                  <Route path="wishlist" element={<WishlistPage />} />
                  <Route path="cart" element={<CartPage />} />
                </Routes>
              </FilterProvider>
            </FeedbackProvider>
          </WishlistProvider>
        </CartProvider>
      </DataProvider>
    </div>
  );
}
