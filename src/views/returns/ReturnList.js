import React from "react";
import Header from "../../components/Header";
import Constant from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import { MainContainer } from "../../styles/Lounge";
import { PlusBtn } from "../../styles/Lounge";
import OrderAndReturnListItem from "../../components/OrderAndReturnListItem";
import { OARScrollView } from "../../styles/OrderAndReturn";

export default function ReturnList({ navigation }) {
  const returnValueDummyData = [
    {
      gunnyNumber: 1,
      user: "object(1222333255)",
      ReturnMonth: "22년 7월",
      sumValue: 125,
      sumPrice: 125265,
      // gunnySack : 마대
      gunnySack: [
        { code: "333266", productName: "짱구", value: 2 },
        { code: "333267", productName: "왕짱구", value: 12 },
        { code: "333268", productName: "삼양라면", value: 3 },
        { code: "333269", productName: "불닭볶음면", value: 7 },
        { code: "333210", productName: "달고나짱구", value: 33 },
        { code: "333211", productName: "짜짜로니", value: 25 },
        { code: "333212", productName: "맛있는라면", value: 16 },
      ],
    },
    {
      gunnyNumber: 2,
      user: "object(1222333255)",
      ReturnMonth: "22년 7월",
      sumValue: 125,
      sumPrice: 125265,
      // gunnySack : 마대
      gunnySack: [
        { code: "333266", productName: "짱구", value: 2 },
        { code: "333267", productName: "왕짱구", value: 12 },
        { code: "333268", productName: "삼양라면", value: 3 },
        { code: "333269", productName: "불닭볶음면", value: 7 },
        { code: "333210", productName: "달고나짱구", value: 33 },
        { code: "333211", productName: "짜짜로니", value: 25 },
        { code: "333212", productName: "맛있는라면", value: 16 },
      ],
    },
  ];

  return (
    <MainContainer
      style={{
        marginTop: Constant.statusBarHeight,
      }}
    >
      <Header />

      <OARScrollView>
        {returnValueDummyData.map((item) => (
          <OrderAndReturnListItem key={item.gunnyNumber} item={item} />
        ))}
      </OARScrollView>

      <PlusBtn onPress={() => navigation.navigate("반품등록")}>
        <AntDesign name="plus" size={24} color="white" />
      </PlusBtn>
    </MainContainer>
  );
}
