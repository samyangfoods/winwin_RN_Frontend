import { View, Text, ScrollView, Button } from 'react-native'
import React, { useState, useEffect } from 'react'

import { returnData } from '../../datas/ReturnData.js'
import ReturnItem from './ReturnItem'

export default function ReturnCreate({ navigation }) {
  const [returnProductList, setReturnProductList] = useState(returnData)
  const [returnSumEA, setReturnSumEA] = useState(0)
  const [returnSumPrice, setReturnSumPrice] = useState(0)
  const [filteredReturnList, setFilteredReturnList] = useState([])

  const changeReturnValue = (product_sapcode, product_returnCount) => {
    const newReturnList = returnProductList.map((item) =>
      item.product_sapcode === product_sapcode
        ? { ...item, product_returnCount }
        : item
    )
    setReturnProductList(newReturnList)
  }

  useEffect(() => {
    const _returnSumPrice = returnProductList.reduce((acc, cur) => {
      if (cur.product_returnCount > 0) {
        return acc + cur.product_returnCount * cur.product_returnPrice
      } else {
        return acc
      }
    }, 0)
    setReturnSumPrice(_returnSumPrice)

    const _returnSumEA = returnProductList.reduce((acc, cur) => {
      if (cur.product_returnCount > 0) {
        return acc + cur.product_returnCount * 1
      } else {
        return acc
      }
    }, 0)
    setReturnSumEA(_returnSumEA)
  }, [returnProductList])

  const returnConfirm = (e) => {
    const submitData = returnProductList.filter(
      (item) => item.product_returnCount > 0
    )
    setFilteredReturnList(submitData)
    console.log(filteredReturnList)
  }

  return (
    <View>
      <View>
        <Button
          title='등록하기'
          onPress={() => {
            returnConfirm
          }}
        />
      </View>
      <ScrollView>
        <View
          style={{
            width: '100%',
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {returnProductList.map((item, index) => {
            return (
              <ReturnItem
                key={item.product_sapcode}
                item={item}
                index={index}
                changeReturnValue={changeReturnValue}
              />
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}
