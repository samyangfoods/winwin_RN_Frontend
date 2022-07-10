import React, { useState } from "react";
import {
  EachOrderItemContainer,
  EachOrderItemTextInput,
} from "../../styles/orders/Orders";

const EachOrderItem = ({ item, setSelectedItems, selectedItems }) => {
  const [quantity, setQuantity] = useState("");

  const handleItemQuantity = () => {
    const { product_name } = item;
    const productInfo = {
      product_name,
      quantity,
    };

    if (selectedItems.length != 0) {
      selectedItems.map(async (data) => {
        if (data.product_name == product_name) {
          const copiedArray = selectedItems;
          const filteredArray = await copiedArray.filter(
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
        onSubmitEditing={handleItemQuantity}
      />
    </EachOrderItemContainer>
  );
};

export default EachOrderItem;
