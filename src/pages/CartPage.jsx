import { useCallback, useEffect } from "react";
import { Box, ScrollArea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import CartDetails from "../components/cart/CartDetails";
import CartSummary from "../components/cart/CartSummary";
import useCartStore from "../store/useCartStore";

function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const setTotalPrice = useCartStore((state) => state.setTotalPrice);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const setCartItemCount = useCartStore((state) => state.setCartItemCount);

  const handleRemoveFromCart = useCallback(
    (item) => {
      removeFromCart(item);
      showNotification({
        message: `Removed ${item.title} from cart`,
        title: "Item removed",
        autoClose: 2000,
        color: "red",
        radius: "md",
        sx: (theme) => ({ backgroundColor: theme.colors.red[500] }),
      });
    },
    [removeFromCart]
  );

  useEffect(() => {
    setTotalPrice();
    setCartItemCount();
  }, [cart]);

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        columnGap: 25,
        width: "95%",
        margin: "auto",
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
          flexDirection: "column",
        },
      })}
    >
      <Box sx={{ flex: 4 }}>
        <ScrollArea type="always" sx={{ padding: 4, height: 400 }}>
          <CartDetails
            cart={cart}
            removeFromCart={handleRemoveFromCart}
            total={totalPrice}
          />
        </ScrollArea>
      </Box>
      <Box sx={{ flex: 1 }}>
        <CartSummary total={totalPrice} />
      </Box>
    </Box>
  );
}

export default CartPage;
