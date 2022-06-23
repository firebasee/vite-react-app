import {
  Box,
  Group,
  Title,
  Text,
  ActionIcon,
  Indicator,
  Tooltip,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Logout } from "tabler-icons-react";
import useCartStore from "../../store/useCartStore";
import useAuthStore from "../../store/useAuthStore";
import { useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const cartItemCount = useCartStore((state) => state.cartItemCount);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  function onLogout() {
    logout();
    navigate("/");
    showNotification({
      message: "Logout successful",
      color: "teal",
    });
  }

  useEffect(() => {}, [isLoggedIn, logout]);

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
          <Indicator
            radius={"xl"}
            color="indigo"
            inline
            label={cartItemCount ?? 0}
            size={14}
          >
            <ShoppingCart size={24} />
          </Indicator>
        </ActionIcon>

        {isLoggedIn ? (
          <Tooltip transition={"skew-up"} label="Logout" color="indigo">
            <ActionIcon onClick={onLogout} color="indigo">
              <Logout size={24} />
            </ActionIcon>
          </Tooltip>
        ) : (
          <>
            <Text
              sx={(theme) => ({
                cursor: "pointer",
                color: theme.colors.indigo[6],
              })}
              size="lg"
              variant="link"
              weight={600}
              onClick={() => navigate("/login")}
            >
              Login
            </Text>
            <Text
              sx={(theme) => ({
                cursor: "pointer",
                color: theme.colors.indigo[6],
              })}
              size="lg"
              variant="link"
              weight={600}
              onClick={() => navigate("/register", { replace: true })}
            >
              Register
            </Text>
          </>
        )}
      </Group>
    </Box>
  );
}

export default Navbar;
