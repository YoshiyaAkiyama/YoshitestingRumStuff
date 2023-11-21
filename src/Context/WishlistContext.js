import { createContext, useReducer } from "react";
import { wishlistAction } from "../constants";
export const WishlistContext = createContext();

function wishlistReducer(wishlist, action) {
  switch (action.type) {
    case wishlistAction.ADD_TO_WISHLIST:
      return [...wishlist, action.product];
    case wishlistAction.REMOVE_FROM_WISHLIST:
      return wishlist.filter((product) => product._id !== action.id);
    default:
      return wishlist;
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, wishlistDispatch] = useReducer(wishlistReducer, []);
  const value = { wishlist, wishlistDispatch };
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}
