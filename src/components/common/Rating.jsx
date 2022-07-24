import { UnstyledButton } from "@mantine/core";

const Rating = ({ rate }) => {
  return (
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
              color: index <= Math.round(rate) ? theme.colors.indigo[5] : theme.colors.gray[5],
            })}
          >
            <span>&#9733;</span>
          </UnstyledButton>
        );
      })}
    </>
  );
};

export default Rating;
