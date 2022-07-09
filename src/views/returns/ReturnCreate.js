import { View, Text, ScrollView, Button } from 'react-native'
import React, { useState, useEffect } from 'react'

import { returnData } from '../../datas/ReturnData.js'
import ReturnItem from './ReturnItem'
import ReturnConfirm from './ReturnConfirm.js'

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

  const filteredReturnData = (e) => {
    const submitData = returnProductList.filter(
      (item) => item.product_returnCount > 0
    )
    setFilteredReturnList(submitData)
  }

  const onSubmitHandler = () => {}

  console.log('filteredReturnList', filteredReturnList)
  return (
    <View style={{ flex: 1 }}>
      {filteredReturnList.length > 0 ? (
        <ReturnConfirm
          returnSumEA={returnSumEA}
          returnSumPrice={returnSumPrice}
          filteredReturnList={filteredReturnList}
        />
      ) : (
        <View style={{ flex: 1 }}>
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
          <View style={{ marginBottom: 0, left: 0, right: 0 }}>
            <Button
              color='#ff7d0d'
              title='다       음'
              onPress={filteredReturnData}
            />
          </View>
        </View>
      )}
    </View>
  )
}
