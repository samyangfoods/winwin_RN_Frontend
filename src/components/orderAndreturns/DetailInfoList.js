import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HorizontalDiv } from "../../styles/Component";
import NotFound from "../NotFound";

const DetailInfoList = ({ orderData, totalPrice, totalQuantity }) => {
  const Sum = Math.round(totalPrice);
  const TotalSum = Sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <>
      <HorizontalDiv style={styles.lineContainer}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerStyle, { flex: 2 }]}>제품명</Text>
          <Text style={[styles.headerStyle, { flex: 1 }]}>수량</Text>
          <Text style={[styles.headerStyle, { flex: 1 }]}>가격</Text>
        </View>
      </HorizontalDiv>

      {orderData ? (
        orderData.map((data, index) => (
          <View
            key={index}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.rowContainer}>
              <Text style={styles.rowMiddle}>{data.product_name}</Text>
              <Text style={styles.row}>{data.quantity}</Text>
              <Text style={styles.row}>
                {(data.quantity * data.product_price)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </View>
          </View>
        ))
      ) : (
        <NotFound />
      )}

      <View style={styles.totalContainer}>
        <View>
          <View style={[styles.rowContainer, { marginTop: 20 }]}>
            <Text style={{ flex: 3, textAlign: "center" }}>합계수량 :</Text>
            <Text style={{ flex: 1, marginLeft: 40 }}></Text>
            <Text style={{ flex: 5, textAlign: "right" }}>
              {totalQuantity} EA
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={{ flex: 3, textAlign: "center" }}>합계금액 :</Text>
            <Text style={{ flex: 1, marginLeft: 40 }}></Text>
            <Text style={{ flex: 5, textAlign: "right" }}>{TotalSum} 원</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default DetailInfoList;

const styles = StyleSheet.create({
  tableContainer: {
    padding: 10,
    flex: 1,
  },
  lineContainer: { justifyContent: "center", alignItems: "center" },
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
    width: 340,
    borderBottomWidth: 0.3,
  },
  row: { flex: 1, textAlign: "center" },
  rowMiddle: { flex: 2, marginLeft: 10 },
});
