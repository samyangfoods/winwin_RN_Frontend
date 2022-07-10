import React, { useState } from "react";
import { productData } from "../../datas/ProductData";
import { FlatList, View } from "react-native";
import EachOrderItem from "./EachOrderItem";
import NotFound from "../../components/NotFound";
import { Text } from "../../styles/Style";
import {
  OrderCreationButton,
  OrderCreationContainer,
} from "../../styles/orders/Orders";

const OrderList = ({ navigation }) => {
  // State Variables
  const [orderItems, setOrderItems] = useState(productData);
  const [selectedItems, setSelectedItems] = useState([]);

  console.log("1=====================");
  console.log("✨ Selected Array: ", selectedItems);

  return (
    <OrderCreationContainer
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>----제품군----</Text>
      {orderItems ? (
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {orderItems.map((product) => (
              <EachOrderItem
                key={product.product_id}
                item={product}
                setSelectedItems={setSelectedItems}
                selectedItems={selectedItems}
              />
            ))}
          </View>
          <OrderCreationButton>
            <Text style={{ color: "white" }}>주문하기</Text>
          </OrderCreationButton>
        </View>
      ) : (
        <NotFound />
      )}
    </OrderCreationContainer>
  );
};

export default OrderList;
