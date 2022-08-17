import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import { useOrderList, useOrderRemovalById } from "../hooks/orderHooks";
import { imageW140 } from "../secrets/urlSetting";
import {
  OARContainer,
  OARTitle,
  OARTitleContainer,
  OARContentsContainer,
  OARComponentsContainer,
  OARUserInfoContainer,
} from "../styles/OrderAndReturn";
import { Image } from "../styles/profiles/UserProfile";

const OrderAndReturnListItem = ({ item, userInfo, setOrderList }) => {
  const [totalCost, setTotalCost] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");

  useEffect(() => {
    const countTotal = () => {
      let eachQuantity = 0;
      let eachCost = 0;
      const orderDetail = JSON.parse(item.orderDetail);
      orderDetail.map((data) => {
        eachQuantity += parseInt(data.quantity);
        eachCost += parseInt(data.product_price);
      });

      setTotalQuantity(eachQuantity);
      setTotalCost(eachCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    };

    countTotal();
  }, []);

  const processOrderDelete = () => {
    Alert.alert("알림", "삭제하시겠습니까?", [
      { text: "아니오" },
      {
        text: "네",
        onPress: async () => {
          const data = await useOrderRemovalById(userInfo.token, item._id);
          if (data) {
            const response = await useOrderList(userInfo.token);
            setOrderList(response);
            Alert.alert("알림", "주문이 삭제되었습니다.");
          }
        },
      },
    ]);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        console.log("Hello");
      }}
    >
      <OARContainer>
        <OARTitleContainer>
          <OARComponentsContainer>
            <OARTitle>날짜</OARTitle>
          </OARComponentsContainer>
          <OARComponentsContainer>
            <OARTitle>수량</OARTitle>
          </OARComponentsContainer>
          <OARComponentsContainer>
            <OARTitle>금액</OARTitle>
          </OARComponentsContainer>
          <OARComponentsContainer>
            <OARTitle>배송시간</OARTitle>
          </OARComponentsContainer>
        </OARTitleContainer>

        <OARContentsContainer>
          <OARComponentsContainer>
            <Text style={{ fontSize: "13px" }}>
              {item.deliveryDate.slice(1, 11)}
            </Text>
          </OARComponentsContainer>
          <OARComponentsContainer>
            <Text>{totalQuantity}</Text>
          </OARComponentsContainer>
          <OARComponentsContainer>
            <Text>{totalCost}</Text>
          </OARComponentsContainer>
          <OARComponentsContainer>
            <Text>{item.deliveryTime}</Text>
          </OARComponentsContainer>
        </OARContentsContainer>

        <OARUserInfoContainer>
          <Image
            source={{ uri: imageW140 + userInfo.userImage }}
            style={{ width: 36, height: 36 }}
          />
          <Text style={{ padding: 10 }}>{userInfo.storeName}</Text>
        </OARUserInfoContainer>
      </OARContainer>
    </TouchableOpacity>
  );
};

export default OrderAndReturnListItem;
