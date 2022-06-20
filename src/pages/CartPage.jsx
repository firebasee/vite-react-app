import { Box } from "@mantine/core";
import { useCallback, useEffect } from "react";
import CartDetails from "../components/cart/CartDetails";
import CartSummary from "../components/cart/CartSummary";
import useCartStore from "../store/useCartStore";

function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const setTotalPrice = useCartStore((state) => state.setTotalPrice);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const handleRemoveFromCart = useCallback(
    (item) => {
      removeFromCart(item);
    },
    [removeFromCart]
  );

  useEffect(() => {
    setTotalPrice();
  }, [cart]);

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        columnGap: 25,
        width: "95%",
        margin: "auto",
      })}
    >
      <Box sx={{ flex: 4 }}>
        <CartDetails cart={cart} removeFromCart={handleRemoveFromCart} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <CartSummary total={totalPrice} />
      </Box>
    </Box>
  );
}

export default CartPage;
