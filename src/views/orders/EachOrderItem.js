import React, { useEffect, useState } from "react";
import {
  EachOrderItemContainer,
  EachOrderItemTextInput,
} from "../../styles/orders/Orders";

const EachOrderItem = ({
  item,
  setSelectedItems,
  selectedItems,
  route,
  preOrderedItem,
}) => {
  const [quantity, setQuantity] = useState("");

  const handleItemQuantity = () => {
    if (quantity.startsWith("0")) {
      setQuantity("");
      return;
    }
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

  // For the case of order revision
  useEffect(() => {
    if (route.name !== "주문수정") return;
    preOrderedItem.map((data) => {
      if (item.product_name == data.product_name) {
        setQuantity(data.quantity);
      }
    });
  }, []);

  return (
    <EachOrderItemContainer>
      <EachOrderItemTextInput
        placeholder={item.product_name}
        keyboardType="numeric"
        onChangeText={(text) => setQuantity(text)}
        value={quantity}
        onEndEditing={handleItemQuantity}
        onBlur={handleItemQuantity}
      />
    </EachOrderItemContainer>
  );
};

export default EachOrderItem;
