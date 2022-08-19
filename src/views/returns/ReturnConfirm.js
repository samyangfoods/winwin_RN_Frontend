import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import returnBagSlice from "../../redux/slices/returnbag";
import { useDispatch, useSelector } from "react-redux";
import { gunnyNumber, yearMonth } from "../../datas/ReturnData";
import { Picker } from "react-native-woodpicker";
import {
  VerticalDiv,
  HorizontalDiv,
  ProtmotionCreateContainer,
} from "../../styles/PromotionStyle";
import CategoryOfGunny from "../../components/CategoryOfReturnGunny";
import CategoryOfYearMohth from "../../components/CategoryOfReturnYearMonth";
import {
  useRetrunBagList,
  useReturnBagCreation,
} from "../../hooks/returnHooks";

export default function ReturnConfirm({
  navigation,
  returnSumEA,
  returnSumPrice,
  filteredReturnList,
}) {
  const [returnBagNumber, setReturnBagNumber] = useState({
    label: "1번",
    value: 1,
  });
  const [returnDate, setReturnDate] = useState({
    label: "22년 1월",
    value: 1,
  });

  // Redux
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const Sum = Math.round(returnSumPrice);
  const TotalSum = Sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const returnSumbit = async () => {
    try {
      const returnObj = {
        gunnyNumber: returnBagNumber,
        yearMonth: returnDate,
        totalQty: returnSumEA,
        totalValue: returnSumPrice,
        gunnySack: JSON.stringify(filteredReturnList),
      };

      const data = await useReturnBagCreation(token, returnObj);

      console.log("reponseData", data);

      if (data) {
        const response = await useRetrunBagList(token);
        if (response) {
          dispatch(
            returnBagSlice.actions.setReturnBag({
              array: [...response],
            })
          );
        }
      }
      Alert.alert("반품이 등록되었습니다!!");
      navigation.navigate("반품 리스트");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.tableContainer}>
      <HorizontalDiv>
        <VerticalDiv>
          <Text>마대번호</Text>
          <CategoryOfGunny
            pickedData={returnBagNumber}
            setPickedData={setReturnBagNumber}
          />
        </VerticalDiv>
        <VerticalDiv>
          <Text>반품날짜</Text>
          <CategoryOfYearMohth
            pickedData={returnDate}
            setPickedData={setReturnDate}
          />
        </VerticalDiv>
      </HorizontalDiv>
      <ScrollView style={{ marginTop: 40 }}>
        <View style={styles.lineContainer}>
          <View style={styles.headerContainer}>
            <Text style={[styles.headerStyle, { flex: 1 }]}>NO</Text>
            <Text style={[styles.headerStyle, { flex: 3 }]}>제품명</Text>
            <Text style={[styles.headerStyle, { flex: 1 }]}>수량</Text>
          </View>
        </View>

        {filteredReturnList.map((item, index) => {
          return (
            <View
              key={index}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <View style={styles.rowContainer}>
                <Text style={styles.row}>{item.product_no}</Text>
                <Text style={styles.rowMiddle}>{item.product_returnName}</Text>
                <Text style={styles.row}>{item.product_returnCount}</Text>
              </View>
            </View>
          );
        })}
        <View style={styles.totalContainer}>
          <View>
            <View style={[styles.rowContainer, { marginTop: 20 }]}>
              <Text style={{ flex: 3, textAlign: "center" }}>합계수량 :</Text>
              <Text style={{ flex: 1, marginLeft: 40 }}></Text>
              <Text style={{ flex: 5, textAlign: "right" }}>
                {Math.round(returnSumEA)} EA
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={{ flex: 3, textAlign: "center" }}>합계금액 :</Text>
              <Text style={{ flex: 1, marginLeft: 40 }}></Text>
              <Text style={{ flex: 5, textAlign: "right" }}>{TotalSum} 원</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            positon: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            marginTop: 30,
          }}
        >
          <Text style={{ fontSize: 17, textAlign: "center" }}>
            위의 내역을 등록하시겠습니까?
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <Button color="#ff7d0d" title="등 록 하 기" onPress={returnSumbit} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    padding: 10,
    flex: 1,
  },
  lineContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 340,
    height: 30,
    backgroundColor: "#01987A",
    borderBottomWidth: 0.6,
  },
  headerStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: "row",
    marginTop: 2,
    alignItems: "center",
    width: 340,
    borderBottomWidth: 0.3,
    height: 30,
  },
  row: { flex: 1, textAlign: "center" },
  rowMiddle: { flex: 3, marginLeft: 40 },
  input: {
    width: 100,
    height: 40,
    marginTop: 20,
    marginLeft: 10,
    fontSize: 15,
    color: "#006aff",
    borderWidth: 2,
    borderRadius: 10,
    zIndex: 10,
    textAlign: "center",
  },
  animatedStyle: {
    top: 25,
    left: 15,
    position: "absolute",
    borderRadius: 90,
    zIndex: 1,
  },
});
