import { Box, Group, Title, Text, ActionIcon } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "tabler-icons-react";

function Navbar() {
  const navigate = useNavigate();

  return (
    <Box
      sx={(theme) => ({
        position: "sticky",
        top: 0,
        zIndex: 98,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "70px",
        paddingLeft: theme.spacing.lg,
        paddingRight: theme.spacing.lg,
        backgroundColor: "#fff",
        boxShadow: theme.shadows.sm,
      })}
    >
      <Group>
        <Title
          sx={(theme) => ({ cursor: "pointer", color: theme.colors.indigo[6] })}
          onClick={() => navigate("/")}
        >
          <em>Store</em>
        </Title>
      </Group>
      <Group>
        <ActionIcon
          variant="transparent"
          color={"indigo"}
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart size={18} />
        </ActionIcon>
        <Text
          sx={(theme) => ({ cursor: "pointer", color: theme.colors.indigo[6] })}
          size="lg"
          variant="link"
          weight={600}
          onClick={() => navigate("/login")}
        >
          Login
        </Text>
        <Text
          sx={(theme) => ({ cursor: "pointer", color: theme.colors.indigo[6] })}
          size="lg"
          variant="link"
          weight={600}
          onClick={() => navigate("/register")}
        >
          Register
        </Text>
      </Group>
    </Box>
  );
}

export default Navbar;
