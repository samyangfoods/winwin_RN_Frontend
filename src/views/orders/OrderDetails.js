import React, { useEffect, useState } from "react";
import { View } from "react-native";
import NotFound from "../../components/NotFound";
import { HorizontalDiv } from "../../styles/Auth";
import { Text } from "../../styles/Style";

const OrderDetails = ({ route }) => {
  const orderData = route.params.orderData[0];
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = async () => {
      let temp = 0;
      if (orderData) {
        orderData.map((data) => {
          const { quantity, product_price } = data;
          temp += quantity * product_price;
        });
      }

      setTotalPrice(temp);
    };

    const calculateTotalQuantity = async () => {
      let temp = 0;
      if (orderData) {
        orderData.map((data) => {
          const { quantity } = data;
          temp += parseInt(quantity);
        });
      }
      setTotalQuantity(temp);
    };

    calculateTotalPrice();
    calculateTotalQuantity();
  }, []);

  return (
    <View>
      <HorizontalDiv>
        <Text>제품명</Text>
        <Text>수량</Text>
        <Text>가격</Text>
      </HorizontalDiv>
      {orderData ? (
        orderData.map((data) => (
          <HorizontalDiv>
            <Text>{data.product_name}</Text>
            <Text>{data.quantity}</Text>
            <Text>{data.quantity * data.product_price}</Text>
          </HorizontalDiv>
        ))
      ) : (
        <NotFound />
      )}
      <HorizontalDiv>
        <Text>합계</Text>
        <Text>{totalQuantity} 박스</Text>
        <Text>{totalPrice}</Text>
      </HorizontalDiv>
    </View>
  );
};

export default OrderDetails;
