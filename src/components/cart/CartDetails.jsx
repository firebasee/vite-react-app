import { ActionIcon, Table, Text } from "@mantine/core";
import { Trash } from "tabler-icons-react";

function CartDetails({ cart, removeFromCart, total }) {
  return (
    <Table fontSize={"md"} captionSide="bottom">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cart &&
          cart.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item?.title}</td>
                <td>{item?.quantity}</td>
                <td>
                  {" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(item?.price)}
                </td>
                <td>
                  {" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(item?.price * item?.quantity)}
                </td>
                <td>
                  <ActionIcon onClick={() => removeFromCart(item)}>
                    <Trash color="#ec4444" />
                  </ActionIcon>
                </td>
              </tr>
            );
          })}
      </tbody>
      <caption style={{ fontWeight: 800, color: "#3a3a3a" }}>
        Total Price:{" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(total)}
      </caption>
    </Table>
  );
}

export default CartDetails;
