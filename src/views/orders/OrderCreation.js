import React, { useEffect, useState } from "react";
import { productData } from "../../datas/ProductData";
import { SectionList, View } from "react-native";
import EachOrderItem from "./EachOrderItem";
import { Text } from "../../styles/Style";
import {
  OrderCreationButton,
  OrderCreationContainer,
} from "../../styles/orders/Orders";
import { SectionGrid } from "react-native-super-grid";

const OrderList = ({ navigation }) => {
  // State Variables
  const [orderItems, setOrderItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

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

  const renderEachOrderItem = ({ item }) => {
    return (
      <EachOrderItem
        item={item}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
      />
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
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
          navigation.navigate("주문상세", { orderData: [selectedItems] })
        }
      >
        <Text style={{ color: "white" }}>주문하기</Text>
      </OrderCreationButton>
    </View>
  );
};

export default OrderList;
