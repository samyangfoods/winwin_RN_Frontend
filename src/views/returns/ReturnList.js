import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import Constant from 'expo-constants'
import { AntDesign } from '@expo/vector-icons'
import { MainContainer } from '../../styles/Lounge'
import { PlusBtn } from '../../styles/Lounge'
import { OARScrollView } from '../../styles/OrderAndReturn'
import ReturnListItem from '../../components/ReturnListItem'
import { useReturnBagList } from '../../hooks/returnHooks'
import NotFound from '../../components/NotFound'

export default function ReturnList({ navigation }) {
  // Redux Variables
  const userInfo = useSelector((state) => state.user)
  const returnData = useSelector((state) => state.returnbag.array)

  // State Variables
  const [returnBagList, setReturnBagList] = useState(returnData)
  console.log(returnBagList)

  // UseEffect to set returnbag list
  useEffect(() => {
    const getReturnBagByUser = async () => {
      const response = await useReturnBagList(userInfo.token)

      setReturnBagList(response)
    }

    getReturnBagByUser()
  }, [returnData])

  return (
    <MainContainer
      style={{
        marginTop: Constant.statusBarHeight,
      }}
    >
      <Header />

      {returnBagList.length != 0 ? (
        <OARScrollView>
          {returnBagList.map((item, index) => (
            <ReturnListItem userInfo={userInfo} item={item} key={index} />
          ))}
        </OARScrollView>
      ) : (
        <NotFound title={'반품'} />
      )}

      <PlusBtn onPress={() => navigation.navigate('반품등록')}>
        <AntDesign name='plus' size={24} color='white' />
      </PlusBtn>
    </MainContainer>
  )
}
