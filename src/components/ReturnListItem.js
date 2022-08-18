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
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('주문확인', {
          orderInfo: item ? item : null,
          orderData: [JSON.parse(item?.orderDetail)],
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
            <Text style={{ fontSize: 13 }}>22년8월</Text>
          </OARComponentsContainer>
          <OARComponentsContainer>
            <Text>1번마대</Text>
          </OARComponentsContainer>
          <OARComponentsContainer>
            <Text>101 EA</Text>
          </OARComponentsContainer>
          <OARComponentsContainer>
            <Text>234,134 원</Text>
          </OARComponentsContainer>
        </OARContentsContainer>

        {/* <OARUserInfoContainer>
          <Image
            source={{ uri: imageW140 + userInfo.userImage }}
            style={{ width: 36, height: 36 }}
          />
          <Text style={{ padding: 10 }}>{userInfo.storeName}</Text>
        </OARUserInfoContainer> */}
      </OARContainer>
    </TouchableOpacity>
  )
}

export default ReturnListItem
