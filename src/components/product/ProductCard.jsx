import {
  Card,
  Image,
  Group,
  Badge,
  Text,
  Button,
  AspectRatio,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "tabler-icons-react";

function ProductCard({ product, handleAddToCart }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={(theme) => ({
        padding: theme.spacing.sm,
        boxShadow: theme.shadows.md,
      })}
    >
      <Card.Section>
        <AspectRatio ratio={600 / 500}>
          <Image src={product.image} alt={product.name} fit="cover" />
        </AspectRatio>
      </Card.Section>

      <Text weight={500} lineClamp={1} mt={10}>
        {product.title}
      </Text>

      <Group position="apart" mt={10}>
        <Text weight={700} color="gray">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(product.price)}
        </Text>
        <Badge color="indigo">{product.category}</Badge>
      </Group>

      <Group mt={15}>
        <Button
          variant="subtle"
          color="indigo"
          leftIcon={<ShoppingCart size={16} />}
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
        <Button
          variant="light"
          onClick={() => navigate(`products/${product.id}`)}
        >
          Details
        </Button>
      </Group>
    </Card>
  );
}

export default ProductCard;
