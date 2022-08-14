import React, { useState } from "react";
import {
  EachOrderItemContainer,
  EachOrderItemTextInput,
} from "../../styles/orders/Orders";

const EachOrderItem = ({ item, setSelectedItems, selectedItems }) => {
  const [quantity, setQuantity] = useState("");

  const handleItemQuantity = () => {
    if (quantity.startsWith("0")) setQuantity("");
    if (quantity == "") return;

    const { product_name, product_price } = item;
    const productInfo = {
      product_name,
      quantity,
      product_price,
    };

    if (selectedItems.length != 0) {
      selectedItems.map(async (data) => {
        if (data.product_name == product_name) {
          const filteredArray = await selectedItems.filter(
            (item) => item.product_name != product_name
          );

          setSelectedItems([...filteredArray, productInfo]);
        } else {
          setSelectedItems([...selectedItems, productInfo]);
        }
      });
    } else {
      setSelectedItems([productInfo]);
    }
  };

  return (
    <EachOrderItemContainer>
      <EachOrderItemTextInput
        placeholder={item.product_name}
        keyboardType="numeric"
        onChangeText={(text) => setQuantity(text)}
        value={quantity}
        onSubmitEditing={handleItemQuantity}
        onBlur={handleItemQuantity}
      />
    </EachOrderItemContainer>
  );
};

export default EachOrderItem;
