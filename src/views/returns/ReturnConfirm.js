import { View, Text, ScrollView, Button, StyleSheet } from 'react-native'
import React from 'react'

export default function ReturnConfirm({
  navigation,
  returnSumEA,
  returnSumPrice,
  filteredReturnList,
}) {
  const Sum = Math.round(returnSumPrice)
  const TotalSum = Sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const returnSumbit = () => {}

  return (
    <View style={styles.tableContainer}>
      <ScrollView>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 340,
              height: 30,
              backgroundColor: '#01987A',
              borderBottomWidth: 0.6,
            }}
          >
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: '#fff',
                fontSize: 16,
              }}
            >
              NO
            </Text>
            <Text
              style={{
                flex: 3,
                textAlign: 'center',
                color: '#fff',
                fontSize: 16,
              }}
            >
              제품명
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: '#fff',
                fontSize: 16,
              }}
            >
              수량
            </Text>
          </View>
        </View>

        {filteredReturnList.map((item, index) => {
          return (
            <View
              key={index}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 2,
                  alignItems: 'center',
                  width: 340,
                  borderBottomWidth: 0.3,
                  height: 30,
                }}
              >
                <Text style={{ flex: 1, textAlign: 'center' }}>
                  {item.product_no}
                </Text>
                <Text style={{ flex: 3, marginLeft: 40 }}>
                  {item.product_returnName}
                </Text>
                <Text style={{ flex: 1, textAlign: 'center' }}>
                  {item.product_returnCount}
                </Text>
              </View>
            </View>
          )
        })}
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignItems: 'center',
                width: 340,
                borderBottomWidth: 0.3,
                height: 30,
              }}
            >
              <Text style={{ flex: 3, textAlign: 'center' }}>합계수량 :</Text>
              <Text style={{ flex: 1, marginLeft: 40 }}></Text>
              <Text style={{ flex: 5, textAlign: 'right' }}>
                {Math.round(returnSumEA)} EA
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 2,
                alignItems: 'center',
                width: 340,
                borderBottomWidth: 0.3,
                height: 30,
              }}
            >
              <Text style={{ flex: 3, textAlign: 'center' }}>합계금액 :</Text>
              <Text style={{ flex: 1, marginLeft: 40 }}></Text>
              <Text style={{ flex: 5, textAlign: 'right' }}>{TotalSum} 원</Text>
            </View>
          </View>
          <View style={{ padding: 40 }}>
            <Text style={{ fontSize: 17 }}> 위의 내역을 등록하시겠습니까?</Text>
          </View>
        </View>

        <View style={{ positon: 'absolute', left: 0, right: 0, bottom: 0 }}>
          <Button color='#ff7d0d' title='등 록 하 기' onPress={returnSumbit} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  tableContainer: {
    padding: 10,
    flex: 1,
  },
})
