import React, { createContext, useContext, useState, useEffect } from "react";

import { CartStatusEnum } from "../model/Cart";
import { CartService } from "../services/cart/cart.service";

interface CartContextType {
  cartItems: any[];
  updateCartItems: (status?: CartStatusEnum) => Promise<void>;
  updateCartStatus: (cartIds: string | string[], status: CartStatusEnum) => Promise<void>;
  deleteCartItem: (cartId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const token = localStorage.getItem("token");
  const defaultStatus = CartStatusEnum.new;

  const updateCartItems = async (status?: CartStatusEnum) => {
    if (!token) {
      console.log("No token found, skipping cart fetch");
      return;
    }

    try {
      const response = await CartService.getCarts({
        searchCondition: {
          status: status ?? defaultStatus,
          is_delete: false
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10
        }
      });
      const items = Array.isArray(response.data.data.pageData) ? response.data.data.pageData : [response.data.data.pageData];
      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const updateCartStatus = async (cartIds: string | string[], status: CartStatusEnum) => {
    try {
      const idsArray = Array.isArray(cartIds) ? cartIds : [cartIds];

      const itemsToUpdate = cartItems.filter((item) => idsArray.includes(item._id));
      if (itemsToUpdate.length > 0) {
        const items = itemsToUpdate.map((item) => ({ _id: item._id, cart_no: item.cart_no }));
        await CartService.UpdateStatusCart({ status, items });
        updateCartItems(status); // Refresh cart items after status update
      } else {
        console.error(`No cart items found for the provided IDs: ${idsArray.join(", ")}`);
      }
    } catch (error) {
      console.error("Error updating cart status:", error);
    }
  };

  const deleteCartItem = async (cartId: string) => {
    try {
      await CartService.DeleteCart(cartId);
      console.log(`Cart item with ID ${cartId} deleted`);
      updateCartItems(CartStatusEnum.new); // Refresh cart items after deletion
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  useEffect(() => {
    if (token) {
      updateCartItems(CartStatusEnum.new);
    } else {
      setCartItems([]);
    }
  }, [token]);

  return <CartContext.Provider value={{ cartItems, updateCartItems, updateCartStatus, deleteCartItem }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};