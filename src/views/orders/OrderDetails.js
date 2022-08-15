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
import { useOrderCreation } from "../../hooks/orderHooks";
import { useSelector } from "react-redux";

const OrderDetails = ({ route }) => {
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
  const token = useSelector((state) => state.user.token);

  // Variables
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
    setSelectedLocation(text.label);

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
    setSelectedDelivery(text.label);
  };
  const processOrder = async () => {
    // console.log("✅✅✅✅✅✅");
    // console.log(selectedLocation.label);
    // console.log(locationAddress);
    // console.log(deliveryDate);
    // console.log(selectedDelivery.label);
    // console.log(orderData);
    // console.log("✅✅✅✅✅✅");

    try {
      const orderObj = {
        deliveryPlace: selectedLocation.label,
        deliveryAddress: locationAddress,
        deliveryDate,
        deliveryTime: selectedDelivery.label,
        orderDetail: orderData,
      };
      const data = await useOrderCreation(token, orderObj);
      console.log("🔥 data is returned", data);
    } catch (error) {
      console.log(error);
    }

    //TODO: 주문이 성공하면 Alert 띄우기
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
          />
          <InfoContainer>
            <Calendar date={deliveryDate} setDate={setDeliveryDate} />
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
          위의 내역을 등록하시겠습니까?
        </Text>
      </HorizontalDiv>

      <OrderCreationButton onPress={() => processOrder()}>
        <Text style={{ color: "white" }}>주문하기</Text>
      </OrderCreationButton>
    </OrderCreationContainer>
  );
};

export default OrderDetails;
