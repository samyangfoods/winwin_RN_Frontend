import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { imageW140 } from "../secrets/urlSetting";
import {
  OARTitle,
  OARContainer,
  OARTitleContainer,
  OARContentsContainer,
  OARUserInfoContainer,
  OARComponentsContainer,
} from "../styles/OrderAndReturn";
import { Image } from "../styles/profiles/UserProfile";

const OrderAndReturnListItem = ({ item, userInfo, navigation }) => {
  const [totalCost, setTotalCost] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");

  useEffect(() => {
    const countTotal = async () => {
      let eachQuantity = 0;
      let eachCost = 0;
      const orderDetail = await JSON.parse(item?.orderDetail);
      orderDetail?.map((data) => {
        eachQuantity += parseInt(data.quantity);
        eachCost += parseInt(data.product_price);
      });

      setTotalQuantity(eachQuantity);
      setTotalCost(eachCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    };

    countTotal();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("주문확인", {
          orderInfo: item,
          orderData: [JSON.parse(item.orderDetail)],
        });
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
            <Text style={{ fontSize: 13 }}>
              {item.deliveryDate.slice(0, 10)}
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
