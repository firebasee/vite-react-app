import { useCallback } from "react";
import useSWR from "swr";
import { Alert, Grid } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import ProductCard from "../components/product/ProductCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import usePageTitle from "../hooks/usePageTitle";
import { getProducts } from "../services/productService";
import useCartStore from "../store/useCartStore";

function ProductListPage() {
  usePageTitle({ title: "Home" });
  const { data, error } = useSWR("/api/products", getProducts);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = useCallback(
    (product) => {
      addToCart(product);
      showNotification({
        message: `Added item to cart`,
        title: "Item added",
        autoClose: 2000,
        color: "green",
        radius: "md",
        sx: (theme) => ({
          backgroundColor: theme.colors.green[500],
          width: "55%",
        }),
      });
    },
    [addToCart]
  );

  if (error)
    return (
      <Alert title="Error" color="red" radius={"lg"}>
        {error.message}
      </Alert>
    );

  if (!data) return <LoadingSpinner />;

  return (
    <Grid>
      {data.map((product, i) => (
        <Grid.Col key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard
            product={product}
            handleAddToCart={() => handleAddToCart(product)}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default ProductListPage;
