import { View, Text, ScrollView, Button, StyleSheet } from 'react-native'
import React from 'react'
import marketSlice from '../../redux/slices/market'
import returnSlice from '../../redux/slices/return'
import { useDispatch, useSelector } from 'react-redux'

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
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <View style={styles.rowContainer}>
                <Text style={styles.row}>{item.product_no}</Text>
                <Text style={styles.rowMiddle}>{item.product_returnName}</Text>
                <Text style={styles.row}>{item.product_returnCount}</Text>
              </View>
            </View>
          )
        })}
        <View style={styles.totalContainer}>
          <View>
            <View style={[styles.rowContainer, { marginTop: 20 }]}>
              <Text style={{ flex: 3, textAlign: 'center' }}>합계수량 :</Text>
              <Text style={{ flex: 1, marginLeft: 40 }}></Text>
              <Text style={{ flex: 5, textAlign: 'right' }}>
                {Math.round(returnSumEA)} EA
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={{ flex: 3, textAlign: 'center' }}>합계금액 :</Text>
              <Text style={{ flex: 1, marginLeft: 40 }}></Text>
              <Text style={{ flex: 5, textAlign: 'right' }}>{TotalSum} 원</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            positon: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            marginTop: 30,
          }}
        >
          <Text style={{ fontSize: 17, textAlign: 'center' }}>
            위의 내역을 등록하시겠습니까?
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
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
  lineContainer: { justifyContent: 'center', alignItems: 'center' },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 340,
    height: 30,
    backgroundColor: '#01987A',
    borderBottomWidth: 0.6,
  },
  headerStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 2,
    alignItems: 'center',
    width: 340,
    borderBottomWidth: 0.3,
    height: 30,
  },
  row: { flex: 1, textAlign: 'center' },
  rowMiddle: { flex: 3, marginLeft: 40 },
})
