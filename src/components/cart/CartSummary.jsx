import { Box, Text, Title } from "@mantine/core";

function CartSummary({ total }) {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        rowGap: 65,
        height: "auto",
        padding: theme.spacing.xl,
        boder: "1px solid #615f5f",
        boxShadow: theme.shadows.md,
        borderRadius: theme.radius.md,
        textAlign: "center",
      })}
    >
      <Title order={2}>Cart Summary</Title>
      <Text color="gray" weight={700}>
        Total Price{" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(total)}
      </Text>
    </Box>
  );
}

export default CartSummary;
