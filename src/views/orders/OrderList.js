import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Constant from "expo-constants";
import OrderAndReturnListItem from "../../components/OrderAndReturnListItem";
import { AntDesign } from "@expo/vector-icons";
import { OARScrollView } from "../../styles/OrderAndReturn";
import { MainContainer, PlusBtn } from "../../styles/Lounge";
import { useOrderList } from "../../hooks/orderHooks";
import { useSelector } from "react-redux";

const OrderList = ({ navigation }) => {
  // State Variables
  const [orderList, setOrderList] = useState([]);

  // Redux Variables
  const token = useSelector((state) => state.user.token);

  // UseEffect to set order list
  useEffect(() => {
    const requestOrderList = async () => {
      const response = await useOrderList(token);

      setOrderList(response);
    };

    requestOrderList();
  }, []);

  return (
    <MainContainer
      style={{
        marginTop: Constant.statusBarHeight,
      }}
    >
      <Header />

      <OARScrollView>
        {orderList.map((item) => (
          <OrderAndReturnListItem key={item.gunnyNumber} item={item} />
        ))}
      </OARScrollView>

      {/* Order Creation Button */}
      <PlusBtn onPress={() => navigation.navigate("주문하기")}>
        <AntDesign name="plus" size={24} color="white" />
      </PlusBtn>
    </MainContainer>
  );
};

export default OrderList;
