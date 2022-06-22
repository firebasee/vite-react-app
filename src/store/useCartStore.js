import create from "zustand";

const useCartStore = create((set, get) => ({
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  totalPrice: 0,
  cartItemCount: 0,
  addToCart: (item) => {
    let foundItem = get().cart?.find((cartItem) => cartItem.id === item.id);

    if (foundItem) {
      let newItem = Object.assign(foundItem, {
        quantity: foundItem.quantity + 1,
      });
      set((state) => ({
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.id === item.id ? newItem : cartItem
        ),
      }));
    } else {
      set((state) => ({
        cart: [...state.cart, { ...item, quantity: 1 }],
      }));
    }
    localStorage.setItem("cart", JSON.stringify(get().cart));
  },
  removeFromCart: (item) => {
    set((state) => ({
      cart: state.cart.filter((cartItem) => cartItem.id !== item.id),
    }));

    localStorage.setItem("cart", JSON.stringify(get().cart));
  },
  incrementQuantity: (item) => {
    let foundItem = get().cart?.find((cartItem) => cartItem.id === item.id);

    if (foundItem) {
      let newItem = Object.assign(foundItem, {
        quantity: foundItem.quantity + 1,
      });
      set((state) => ({
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.id === item.id ? newItem : cartItem
        ),
      }));
    }
    localStorage.setItem("cart", JSON.stringify(get().cart));
  },
  decrementQuantity: (item) => {
    let foundItem = get().cart?.find((cartItem) => cartItem.id === item.id);

    if (foundItem) {
      let newItem = Object.assign(foundItem, {
        quantity: foundItem.quantity - 1,
      });
      set((state) => ({
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.id === item.id ? newItem : cartItem
        ),
      }));
    }
    localStorage.setItem("cart", JSON.stringify(get().cart));
  },
  clearCart: () => {
    set((state) => ({
      cart: [],
      totalPrice: 0,
    }));
    localStorage.removeItem("cart");
  },
  setTotalPrice: () => {
    let total = 0;
    get().cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    set((state) => ({
      totalPrice: total,
    }));
  },
  setCartItemCount: () => {
    let count = 0;
    get().cart.forEach((item) => {
      count += item.quantity;
    });
    set((state) => ({
      cartItemCount: count,
    }));
  },
}));

export default useCartStore;
