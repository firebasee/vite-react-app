import { ActionIcon, Table } from "@mantine/core";
import { Trash } from "tabler-icons-react";

function CartDetails({ cart, removeFromCart }) {
  return (
    <Table fontSize={"md"}>
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
                <td>{item?.price}</td>
                <td>{(item?.quantity * item?.price).toFixed(2) ?? 0}</td>
                <td>
                  <ActionIcon onClick={() => removeFromCart(item)}>
                    <Trash color="#ec4444" />
                  </ActionIcon>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

export default CartDetails;
