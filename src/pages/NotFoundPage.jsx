import { Stack, Title, Center, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Center>
      <Stack align={"center"}>
        <Title>404 - Not Found</Title>
        <Anchor
          sx={(theme) => ({
            fontSize: "1.6rem",
            fontWeight: 700,
          })}
          component={Link}
          to="/"
        >
          Go to Home
        </Anchor>
      </Stack>
    </Center>
  );
}

export default NotFoundPage;
