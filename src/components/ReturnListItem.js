import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { imageW140 } from '../secrets/urlSetting'
import {
  OARTitle,
  OARContainer,
  OARTitleContainer,
  OARContentsContainer,
  OARUserInfoContainer,
  OARComponentsContainer,
} from '../styles/OrderAndReturn'
import { Image } from '../styles/profiles/UserProfile'

const ReturnListItem = ({ item, userInfo, navigation }) => {
  console.log('아이템', item)
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('반품확인', {
          returnBagInfo: item ? item : null,
          returnbagData: [JSON.parse(item)],
        })
      }}
    >
      <OARContainer>
        <OARTitleContainer>
          <OARComponentsContainer>
            <OARTitle>년월</OARTitle>
          </OARComponentsContainer>
          <OARComponentsContainer>
            <OARTitle>마대번호</OARTitle>
          </OARComponentsContainer>
          <OARComponentsContainer>
            <OARTitle>수량</OARTitle>
          </OARComponentsContainer>
          <OARComponentsContainer>
            <OARTitle>금액</OARTitle>
          </OARComponentsContainer>
        </OARTitleContainer>

        <OARContentsContainer>
          <OARComponentsContainer>
            <Text style={{ fontSize: 13 }}>{item.yearMonth}</Text>
          </OARComponentsContainer>
          <OARComponentsContainer>
            <Text>{item.gunnyNumber}</Text>
          </OARComponentsContainer>
          <OARComponentsContainer>
            <Text>{item.totalQty}개</Text>
          </OARComponentsContainer>
          <OARComponentsContainer>
            <Text>{item.totalValue}원</Text>
          </OARComponentsContainer>
        </OARContentsContainer>

        <OARUserInfoContainer>
          <Image
            source={{ uri: imageW140 + userInfo.userImage }}
            style={{ width: 36, height: 36 }}
          />
          <Text style={{ padding: 10 }}>{userInfo.storeName}</Text>
        </OARUserInfoContainer>
      </OARContainer>
    </TouchableOpacity>
  )
}

export default ReturnListItem
