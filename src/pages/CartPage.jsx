import { useCallback, useEffect } from "react";
import { Box, ScrollArea, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useModals } from "@mantine/modals";
import CartDetails from "../components/cart/CartDetails";
import CartSummary from "../components/cart/CartSummary";
import useCartStore from "../store/useCartStore";

function CartPage() {
  const modals = useModals();
  const cart = useCartStore((state) => state.cart);
  const setTotalPrice = useCartStore((state) => state.setTotalPrice);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const handleRemoveFromCart = useCallback(
    (item) => {
      modals.openConfirmModal({
        title: "Remove from cart?",
        children: (
          <Text>
            Are you sure you want to remove <strong>{item.name}</strong> from
          </Text>
        ),
        labels: {
          cancel: "Cancel",
          confirm: "Remove",
        },
        onCancel: () => {
          modals.closeModal();
        },
        onConfirm: () => {
          removeFromCart(item);
          modals.closeModal();
          showNotification({
            message: `Removed item from cart`,
            title: "Item removed",
            autoClose: 2000,
            color: "red",
            radius: "md",
            sx: (theme) => ({
              backgroundColor: theme.colors.red[500],
              width: "55%",
            }),
          });
        },
        confirmProps: {
          color: "red",
        },
      });
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
