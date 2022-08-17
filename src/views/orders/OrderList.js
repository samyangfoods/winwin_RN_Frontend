import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Constant from "expo-constants";
import OrderAndReturnListItem from "../../components/OrderAndReturnListItem";
import { AntDesign } from "@expo/vector-icons";
import { OARScrollView } from "../../styles/OrderAndReturn";
import { MainContainer, PlusBtn } from "../../styles/Lounge";
import { useOrderList } from "../../hooks/orderHooks";
import { useSelector } from "react-redux";
import NotFound from "../../components/NotFound";

const OrderList = ({ navigation }) => {
  // Redux Variables
  const userInfo = useSelector((state) => state.user);
  const orderData = useSelector((state) => state.order.array);

  // State Variables
  const [orderList, setOrderList] = useState(orderData);

  // UseEffect to set order list
  useEffect(() => {
    const requestOrderList = async () => {
      const response = await useOrderList(userInfo.token);

      setOrderList(response);
    };

    requestOrderList();
  }, [orderData]);

  return (
    <MainContainer
      style={{
        marginTop: Constant.statusBarHeight,
      }}
    >
      <Header />

      {orderList.length != 0 ? (
        <OARScrollView>
          {orderList.map((item) => (
            <OrderAndReturnListItem
              key={item._id}
              item={item}
              userInfo={userInfo}
              navigation={navigation}
            />
          ))}
        </OARScrollView>
      ) : (
        <NotFound title={"주문"} />
      )}

      {/* Order Creation Button */}
      <PlusBtn onPress={() => navigation.navigate("주문하기")}>
        <AntDesign name="plus" size={24} color="white" />
      </PlusBtn>
    </MainContainer>
  );
};

export default OrderList;
