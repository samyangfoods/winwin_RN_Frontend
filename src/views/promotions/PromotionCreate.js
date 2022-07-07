import React, { useEffect, useState } from "react";
import Calendar from "../../components/Calendar";
import Category from "../../components/Category";
import ImageAccess from "../../components/images/ImageAccess";
import ItemArray from "../../components/items/ItemArray";
import { Text } from "../../styles/Style";
import {
  ProtmotionCreateContainer,
  Body,
  VerticalDiv,
  HorizontalDiv,
  ShortInput,
  BtnContainer,
  FooterBtn,
  ItemCategory,
  HorizontalSeparator,
  TextBoxLong,
  TextBoxMiddle,
  TextBoxShort,
} from "../../styles/PromotionStyle";
import Address from "../../components/Address";
import { Btn } from "../../styles/Auth";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, Alert } from "react-native";
import {
  usePromotionCreation,
  usePromotions,
} from "../../hooks/promotionHooks";
import CategoryOfMarketListWithUserId from "../../components/CategoryOfMarketListWithUserId";
import { useMarketInfo, useMarketListWithId } from "../../hooks/marketHooks";
import promotionSlice from "../../redux/slices/Promotion";

const PromotionCreate = ({ navigation }) => {
  // Redux variables
  const token = useSelector((state) => state.user.token);
  const marketArray = useSelector((state) => state.market.array);
  const dispatch = useDispatch();

  // Hooks variables
  const [modal, setModal] = useState(false);
  const [marketName, setMarketName] = useState("");
  const [address, setAddress] = useState("");
  const [pos, setPos] = useState("");
  const [image, setImage] = useState([]);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [promotionCost, setPromotionCost] = useState("");
  const [promotionType, setPromotionType] = useState({
    label: "전단행사",
    value: 1,
  });
  const [promotionDetail, setPromotionDetail] = useState([]);
  const [loginLoading, setLoginLoading] = useState(false);

  // Button activation
  // Create button is remained disabled unless a user completes info input process
  const buttonActivated = Boolean(
    marketName &&
      address &&
      pos &&
      image[0] &&
      dateStart &&
      dateEnd &&
      promotionCost &&
      promotionDetail
  );

  // Handling functions
  const handlePos = (text) => {
    setPos(text);
  };
  const handlePromotionCost = (text) => {
    setPromotionCost(text);
  };
  const addItemArray = () => {
    setPromotionDetail([
      ...promotionDetail,
      {
        productName: "",
        price: "",
        promotionValue: "",
        prValue: "",
      },
    ]);
  };

  // Promotion creation process
  const submitPromotion = async () => {
    if (loginLoading) return;

    const promotionObj = {
      marketName: marketName.label || marketName,
      marketAddress: address,
      pos: parseInt(pos),
      image,
      start_date: dateStart.toString(),
      end_date: dateEnd.toString(),
      promotionType: promotionType.label,
      promotionCost: parseInt(promotionCost),
      promotionDetail,
    };

    try {
      setLoginLoading(true);

      const response = await usePromotionCreation(promotionObj, token);

      if (response) {
        const promotionData = await usePromotions(token);
        if (promotionData) {
          dispatch(
            promotionSlice.actions.setPromotion({
              array: [...promotionData],
            })
          );
        }
      }

      Alert.alert("알림", "행사가 등록되었습니다.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("알림", error.message);
    } finally {
      // Reset input parts
      setMarketName("");
      setAddress("");
      setPos("");
      setImage([]);
      setDateStart(new Date());
      setDateEnd(new Date());
      setPromotionCost("");
      setPromotionType({ label: "전단행사", value: 1 });
      setPromotionDetail([]);
      setLoginLoading(false);
      setMarketInfo(token);
    }
  };

  // Set Initial value at once
  const setMarketInfo = async (token) => {
    const markets = await useMarketListWithId(token);
    const firstMarketInfo = markets[0]._id;

    const { marketName, pos, marketAddress } = await useMarketInfo(
      firstMarketInfo,
      token
    );

    setMarketName(marketName);
    setPos(pos);
    setAddress(marketAddress);
  };

  useEffect(() => {
    setMarketInfo(token);
  }, [marketArray]);

  // Change market info whenever a user select a market
  useEffect(() => {
    const setMarketInfo = async (marketId, token) => {
      const { pos, marketAddress } = await useMarketInfo(marketId, token);

      setPos(pos);
      setAddress(marketAddress);
    };

    if (marketName) setMarketInfo(marketName.value, token);
  }, [marketName]);

  return (
    <ProtmotionCreateContainer>
      <Body>
        <HorizontalDiv>
          <VerticalDiv>
            <Text>소매점명</Text>
            {marketArray ? (
              <CategoryOfMarketListWithUserId
                marketName={marketName}
                setMarketName={setMarketName}
              />
            ) : (
              <Text>소매점 없음</Text>
            )}
          </VerticalDiv>
          <VerticalDiv>
            <Text>POS 수량</Text>
            <ShortInput
              placeholder="POS 수량"
              keyboardType="numeric"
              value={pos}
              onChangeText={(text) => handlePos(text)}
            />
          </VerticalDiv>
        </HorizontalDiv>

        {/* Address */}
        <Text>주소</Text>
        <Btn style={{ width: "100%" }} onPress={() => setModal(true)}>
          <Text>{address ? address : "주소 입력"}</Text>
        </Btn>

        {/* POS Quantity & Promotion Cost */}
        <HorizontalDiv>
          <VerticalDiv>
            <Text>행사종류</Text>
            <Category
              pickedData={promotionType}
              setPickedData={setPromotionType}
            />
          </VerticalDiv>
          <VerticalDiv>
            <Text>지원금액</Text>
            <ShortInput
              placeholder="지원금액"
              keyboardType="numeric"
              value={promotionCost}
              onChangeText={(text) => handlePromotionCost(text)}
            />
          </VerticalDiv>
        </HorizontalDiv>

        {/* Images */}
        <Text>이미지 등록</Text>
        <ImageAccess image={image} setImage={setImage} />

        {/* Duration */}
        <HorizontalDiv>
          <VerticalDiv>
            <Text>시작일</Text>
            <Calendar date={dateStart} setDate={setDateStart} />
          </VerticalDiv>
          <VerticalDiv>
            <Text>종료일</Text>
            <Calendar date={dateEnd} setDate={setDateEnd} />
          </VerticalDiv>
        </HorizontalDiv>
      </Body>

      <Body>
        {/* Promotion Items Details */}
        <Text>행사 내역</Text>

        <ItemCategory>
          <TextBoxLong>
            <Text>제품명</Text>
          </TextBoxLong>
          <TextBoxMiddle>
            <Text>가격</Text>
          </TextBoxMiddle>
          <TextBoxShort>
            <Text>수량</Text>
          </TextBoxShort>
          <TextBoxShort>
            <Text>PR</Text>
          </TextBoxShort>
        </ItemCategory>

        <HorizontalSeparator />
        <ItemArray
          item={promotionDetail}
          setItem={setPromotionDetail}
          addItemArray={addItemArray}  
        />
      </Body>

      <BtnContainer>
        <FooterBtn
          onPress={submitPromotion}
          disabled={!buttonActivated}
          style={{ backgroundColor: buttonActivated ? "#ff7d0d" : "#aaa" }}
        >
          {loginLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: "#fff" }}>등록하기</Text>
          )}
        </FooterBtn>
      </BtnContainer>

      {/* Address Modal Component */}
      {modal && <Address setAddress={setAddress} setModal={setModal} />}
    </ProtmotionCreateContainer>
  );
};

export default PromotionCreate;
