import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "../../styles/Style";
import {
  InfoContainer,
  OrderCreationButton,
  OrderCreationContainer,
} from "../../styles/orders/Orders";
import { HorizontalDiv } from "../../styles/Auth";
import { StyledPicker } from "../../styles/Component";
import Calendar from "../../components/Calendar";
import DetailInfoList from "../../components/orderAndreturns/DetailInfoList";
import {
  useOrderCreation,
  useOrderList,
  useOrderUpdateById,
  userOrderRemovalById,
} from "../../hooks/orderHooks";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import orderSlice from "../../redux/slices/order";

const OrderDetails = ({ route, navigation }) => {
  // State Variables
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [locationAddress, setLocationAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({
    label: "창고",
    value: 1,
  });
  const [selectedDelivery, setSelectedDelivery] = useState({
    label: "오전배송",
    value: 1,
  });
  const [deliveryDate, setDeliveryDate] = useState(new Date());

  // Redux Variable
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  // Variables
  const isOrderRevision = Boolean(route.name == "주문확인");
  const orderInfo = route.params.orderInfo;
  const orderData = route.params.orderData[0];
  const locationCategory = [
    { label: "창고", value: 1 },
    { label: "서한종합유통", value: 2 },
    { label: "우리식자재마트", value: 3 },
  ];
  const deliveryCategory = [
    { label: "오전배송", value: 1 },
    { label: "오후배송", value: 2 },
  ];

  // useEffect setting: total price and product quantity
  useEffect(() => {
    const calculateTotalPrice = async () => {
      let temp = 0;
      if (orderData) {
        orderData.map((data) => {
          const { quantity, product_price } = data;
          temp += quantity * product_price;
        });
      }

      await setTotalPrice(temp);
    };

    const calculateTotalQuantity = async () => {
      let temp = 0;
      if (orderData) {
        orderData.map((data) => {
          const { quantity } = data;
          temp += parseInt(quantity);
        });
      }
      await setTotalQuantity(temp);
    };

    calculateTotalPrice();
    calculateTotalQuantity();
  }, []);

  // For the case of order revision
  useEffect(() => {
    if (route.name !== "주문확인") return;

    setDeliveryDate(new Date(orderInfo.deliveryDate));

    switch (orderInfo.deliveryPlace) {
      case "창고":
        setSelectedLocation({ label: "창고", value: 1 });
        return;
      case "서한종합유통":
        setSelectedLocation({ label: "서한종합유통", value: 2 });
        return;
      case "우리식자재마트":
        setSelectedLocation({ label: "우리식자재마트", value: 3 });
        return;
    }

    switch (orderInfo.deliveryTime) {
      case "오전배송":
        setSelectedDelivery({ label: "오전배송", value: 1 });
        return;
      case "오후배송":
        setSelectedDelivery({ label: "오후배송", value: 2 });
        return;
    }
  }, []);

  // Location address init
  useEffect(() => {
    const setMarketInfo = async (location) => {
      switch (location) {
        case "창고":
          setLocationAddress("창고 주소");
          return;
        case "서한종합유통":
          setLocationAddress("서한종합유통 주소");
          return;
        case "우리식자재마트":
          setLocationAddress("우리식자재마트 주소");
          return;
      }
    };

    if (selectedLocation) setMarketInfo(selectedLocation.label);
  }, [selectedLocation]);

  // Handling Functions
  const handleLocation = (text) => {
    setSelectedLocation(text);

    switch (text.label) {
      case "창고":
        setLocationAddress("창고 주소");
        return;
      case "서한종합유통":
        setLocationAddress("서한종합유통 주소");
        return;
      case "우리식자재마트":
        setLocationAddress("우리식자재마트 주소");
        return;
    }
  };
  const handleDelivery = (text) => {
    setSelectedDelivery(text);
  };
  const processOrderChange = () => {
    navigation.navigate("주문수정", {
      orderId: orderInfo._id,
      orderData: [orderData],
    });
  };
  const processOrder = async () => {
    const orderId = route.params?.orderId;

    if (orderId === undefined) {
      try {
        const orderObj = {
          deliveryPlace: selectedLocation.label,
          deliveryAddress: locationAddress,
          deliveryDate: deliveryDate,
          deliveryTime: selectedDelivery.label,
          orderDetail: JSON.stringify(orderData),
        };

        const data = await useOrderCreation(token, orderObj);
        if (data) {
          const response = await useOrderList(token);

          if (response) {
            dispatch(
              orderSlice.actions.setOrder({
                array: [...response],
              })
            );
          }
          Alert.alert("주문이 등록되었습니다.");
          navigation.navigate("주문");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      //TODO: 주문 수정 로직 최적화 필요. 수정 작업사항 반영안됨
      try {
        const orderObj = {
          deliveryPlace: selectedLocation.label,
          deliveryAddress: locationAddress,
          deliveryDate: deliveryDate,
          deliveryTime: selectedDelivery.label,
          orderDetail: JSON.stringify(orderData),
        };

        const data = await useOrderUpdateById(token, orderId, orderObj);
        if (data) {
          const response = await useOrderList(token);

          if (response) {
            dispatch(
              orderSlice.actions.setOrder({
                array: [...response],
              })
            );
            Alert.alert("주문이 수정되었습니다.");
            navigation.navigate("주문");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const processOrderDelete = () => {
    Alert.alert("알림", "삭제하시겠습니까?", [
      { text: "아니오" },
      {
        text: "네",
        onPress: async () => {
          const data = await userOrderRemovalById(token, orderInfo._id);
          if (data) {
            const response = await useOrderList(token);

            if (response) {
              dispatch(
                orderSlice.actions.setOrder({
                  array: [...response],
                })
              );
            }
            Alert.alert("알림", "주문이 삭제되었습니다.");
            navigation.navigate("주문");
          }
        },
      },
    ]);
  };

  return (
    <OrderCreationContainer>
      <View style={{ marginBottom: 20 }}>
        <HorizontalDiv style={{ marginTop: 20 }}>
          <StyledPicker
            style={{ width: 150, height: 40 }}
            item={selectedLocation}
            items={locationCategory}
            onItemChange={(text) => handleLocation(text)}
            title="배송 장소"
            placeholder="배송 장소를 선택하세요"
            textInputStyle={{ textAlign: "center" }}
            disabled={isOrderRevision ? true : false}
          />
          <InfoContainer>
            <Text>{locationAddress}</Text>
          </InfoContainer>
        </HorizontalDiv>

        <HorizontalDiv style={{ marginTop: 20 }}>
          <StyledPicker
            style={{ width: 150, height: 40 }}
            item={selectedDelivery}
            items={deliveryCategory}
            onItemChange={(text) => handleDelivery(text)}
            title="배송 시간"
            placeholder="배송 시간을 선택하세요"
            textInputStyle={{ textAlign: "center" }}
            disabled={isOrderRevision ? true : false}
          />
          <InfoContainer>
            <Calendar
              date={deliveryDate}
              setDate={setDeliveryDate}
              isOrderRevision={isOrderRevision}
            />
          </InfoContainer>
        </HorizontalDiv>
      </View>

      <DetailInfoList
        orderData={orderData}
        totalPrice={totalPrice}
        totalQuantity={totalQuantity}
      />

      <HorizontalDiv style={{ marginTop: 15, justifyContent: "center" }}>
        <Text style={{ fontSize: 17, textAlign: "center" }}>
          위의 내역을 {isOrderRevision ? "수정" : "등록"}하시겠습니까?
        </Text>
      </HorizontalDiv>

      {isOrderRevision ? (
        <View style={{ flexDirection: "row" }}>
          <OrderCreationButton
            onPress={() => processOrderChange()}
            style={{ width: "30%", margin: 8 }}
          >
            <Text style={{ color: "white" }}>수정하기</Text>
          </OrderCreationButton>
          <OrderCreationButton
            onPress={() => processOrderDelete()}
            style={{ backgroundColor: "gray", width: "30%", margin: 8 }}
          >
            <Text style={{ color: "white" }}>삭제하기</Text>
          </OrderCreationButton>
        </View>
      ) : (
        <OrderCreationButton onPress={() => processOrder()}>
          <Text style={{ color: "white" }}>주문하기</Text>
        </OrderCreationButton>
      )}
    </OrderCreationContainer>
  );
};

export default OrderDetails;
