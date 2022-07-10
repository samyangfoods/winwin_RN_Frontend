import React, { useState } from "react";
import { View } from "react-native";
import NotFound from "../../components/NotFound";
import { Text } from "../../styles/Style";

const OrderDetails = ({ route }) => {
  const [orderData, setOrderData] = useState(route.params.orderData[0]);

  console.log(orderData);

  return (
    <View>
      {orderData ? (
        orderData.map((data) => <Text>{data.product_name}</Text>)
      ) : (
        <NotFound />
      )}
    </View>
  );
};

export default OrderDetails;
