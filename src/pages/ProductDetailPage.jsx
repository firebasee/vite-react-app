import { useParams } from "react-router-dom";
import useSWR from "swr";
import {
  Box,
  Alert,
  Image,
  Title,
  Text,
  Badge,
  Button,
  Group,
  UnstyledButton,
} from "@mantine/core";
import { ShoppingCart } from "tabler-icons-react";
import { getProduct } from "../services/productService";
import LoadingSpinner from "../components/common/LoadingSpinner";
import usePageTitle from "../hooks/usePageTitle";
import useCartStore from "../store/useCartStore";
import { useCallback } from "react";

function ProductDetailPage() {
  const { id } = useParams();
  const { data, error } = useSWR([`${id}`, id], getProduct);
  usePageTitle({ title: `${data?.title}` ?? "Details" });
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = useCallback(
    (product) => {
      addToCart(product);
    },
    [addToCart]
  );
  if (error)
    return (
      <Alert title="Error" variant="filled" color="red" radius={"lg"}>
        {error.message}
      </Alert>
    );

  if (!data) return <LoadingSpinner />;

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        columnGap: "44px",
        padding: theme.spacing.lg,
      })}
    >
      <Box
        sx={{
          flex: 1,
        }}
      >
        <Image
          src={data.image}
          alt={data.title}
          fit="contain"
          width="100%"
          height="70vh"
        />
      </Box>
      <Box
        sx={() => ({
          display: "flex",
          alignItems: "start",
          flexDirection: "column",
          rowGap: "24px",
          flex: 2,
        })}
      >
        <Badge color="indigo">{data.category}</Badge>
        <Title>{data.title}</Title>
        <Text>{data.description}</Text>

        <Group>
          <>
            {[...Array(5)].map((_, index) => {
              index += 1;
              return (
                <UnstyledButton
                  sx={(theme) => ({
                    cursor: "auto",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    color:
                      index <= Math.round(data?.rating?.rate)
                        ? theme.colors.indigo[5]
                        : theme.colors.gray[5],
                  })}
                >
                  <span>&#9733;</span>
                </UnstyledButton>
              );
            })}
          </>
          <Text color="gray" weight={600}>
            {data?.rating?.count} reviews
          </Text>
        </Group>

        <Text weight={700} color="gray" size="lg">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(data.price)}
        </Text>

        <Group mt={"auto"} ml="auto" mb={44}>
          <Button
            size="md"
            color="indigo"
            leftIcon={<ShoppingCart size={22} />}
            onClick={() => handleAddToCart(data)}
          >
            Add to cart
          </Button>
        </Group>
      </Box>
    </Box>
  );
}

export default ProductDetailPage;
