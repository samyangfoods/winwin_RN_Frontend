import React, { useEffect, useState } from "react";
import EachOrderItem from "./EachOrderItem";
import { productData } from "../../datas/ProductData";
import { View } from "react-native";
import { Text } from "../../styles/Style";
import { SectionGrid } from "react-native-super-grid";
import {
  OrderCreationButton,
  OrderCreationContainer,
} from "../../styles/orders/Orders";

const OrderList = ({ navigation, route }) => {
  // State Variables
  const [orderItems, setOrderItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Variables
  const orderId = route.params?.orderId;

  // This useEffect will arrange product data into specific sections
  useEffect(() => {
    let newReleased = [];
    let plate = [];
    let snack = [];
    let sauce = [];
    let etc = [];
    let sampleArray = [
      {
        title: "신제품",
        data: newReleased,
      },
      {
        title: "용기면",
        data: plate,
      },
      {
        title: "스낵류",
        data: snack,
      },
      {
        title: "소스류",
        data: sauce,
      },
      {
        title: "기타",
        data: etc,
      },
    ];

    productData.map((data) => {
      switch (true) {
        case data.product_id < 200:
          newReleased.push(data);
          return;
        case data.product_id >= 300 && data.product_id < 400:
          plate.push(data);
          return;
        case data.product_id >= 500 && data.product_id < 550:
          snack.push(data);
          return;
        case data.product_id >= 550 && data.product_id < 560:
          sauce.push(data);
          return;
        case data.product_id >= 560:
          etc.push(data);
          return;
      }
    });

    setOrderItems(sampleArray);
  }, []);

  // For the case of Order Revision
  useEffect(() => {
    if (route.name !== "주문수정") return;
    setSelectedItems(route.params.orderData[0]);
  }, []);

  // Handling functions
  const renderEachOrderItem = ({ item }) => {
    return (
      <EachOrderItem
        key={item.product_id}
        item={item}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
        route={route}
        preOrderedItem={route.params?.orderData[0]}
      />
    );
  };

  return (
    <OrderCreationContainer>
      <SectionGrid
        itemDimension={100}
        sections={orderItems}
        renderItem={renderEachOrderItem}
        renderSectionHeader={({ section }) => (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>{section.title}</Text>
          </View>
        )}
      />

      <OrderCreationButton
        onPress={() =>
          navigation.navigate("주문상세", {
            orderId: orderId,
            orderData: [selectedItems],
          })
        }
        disabled={selectedItems.length == 0 ? true : false}
        style={{
          backgroundColor: selectedItems.length != 0 ? "#ff7d0d" : "#aaa",
          marginBottom: 30,
        }}
      >
        <Text style={{ color: "white" }}>
          {route.name == "주문수정" ? "수정" : "주문"}하기
        </Text>
      </OrderCreationButton>
    </OrderCreationContainer>
  );
};

export default OrderList;
