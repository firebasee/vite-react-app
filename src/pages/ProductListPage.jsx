import { useCallback } from "react";
import useSWR from "swr";
import { Alert, Grid } from "@mantine/core";
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
