import { useCallback, useEffect } from "react";
import { Box, ScrollArea, Text, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useModals } from "@mantine/modals";
import CartDetails from "../components/cart/CartDetails";
import CartSummary from "../components/cart/CartSummary";
import useCartStore from "../store/useCartStore";
import priceFormatter from "../utils/priceFormatter";

function CartPage() {
  const modals = useModals();
  const cart = useCartStore((state) => state.cart);
  const setTotalPrice = useCartStore((state) => state.setTotalPrice);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const handleRemoveFromCart = useCallback(
    (item) => {
      modals.openConfirmModal({
        centered: true,
        overlayBlur: 1,
        title: <Title order={5}>Item Remove From Cart?</Title>,
        children: <Text weight={500}>Are you sure you want to remove {item.title} from cart</Text>,
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
      <Box
        sx={{
          flex: 4,
          alignItems: "stretch",
          rowGap: 25,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ScrollArea type="always" sx={{ padding: 4, height: 500 }}>
          <CartDetails cart={cart} removeFromCart={handleRemoveFromCart} total={totalPrice} />
        </ScrollArea>
        <Text ml={"auto"} mr={4} weight={600}>
          Total Price: {priceFormatter(totalPrice)}
        </Text>
      </Box>
      <Box sx={{ flex: 1 }}>
        <CartSummary total={totalPrice} />
      </Box>
    </Box>
  );
}

export default CartPage;
