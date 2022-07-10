import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import Constant from 'expo-constants'
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons'
import { MainContainer } from '../../styles/Lounge'
import { PlusBtn } from '../../styles/Lounge'

export default function ReturnList({ navigation }) {
  const returnValueDummyData = [
    {
      gunnyNumber: 1,
      user: 'object(1222333255)',
      ReturnMonth: '22년 7월',
      sumValue: 125,
      sumPrice: 125265,
      // gunnySack : 마대
      gunnySack: [
        { code: '333266', productName: '짱구', value: 2 },
        { code: '333267', productName: '왕짱구', value: 12 },
        { code: '333268', productName: '삼양라면', value: 3 },
        { code: '333269', productName: '불닭볶음면', value: 7 },
        { code: '333210', productName: '달고나짱구', value: 33 },
        { code: '333211', productName: '짜짜로니', value: 25 },
        { code: '333212', productName: '맛있는라면', value: 16 },
      ],
    },
    {
      gunnyNumber: 2,
      user: 'object(1222333255)',
      ReturnMonth: '22년 7월',
      sumValue: 125,
      sumPrice: 125265,
      // gunnySack : 마대
      gunnySack: [
        { code: '333266', productName: '짱구', value: 2 },
        { code: '333267', productName: '왕짱구', value: 12 },
        { code: '333268', productName: '삼양라면', value: 3 },
        { code: '333269', productName: '불닭볶음면', value: 7 },
        { code: '333210', productName: '달고나짱구', value: 33 },
        { code: '333211', productName: '짜짜로니', value: 25 },
        { code: '333212', productName: '맛있는라면', value: 16 },
      ],
    },
  ]

  return (
    <MainContainer
      style={{
        marginTop: Constant.statusBarHeight,
      }}
    >
      <Header />
      <ScrollView>
        <View style={styles.container}>
          {returnValueDummyData.map((item) => {
            return (
              <View style={styles.returnListContainer} key={item.gunnyNumber}>
                <View style={styles.returnItemContainer}>
                  <TouchableOpacity>
                    <View style={styles.gunnyNumber}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 15,
                        }}
                      >
                        {item.gunnyNumber}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View style={{ marginLeft: 5 }}>
                    <Text style={{ fontSize: 12 }}>{item.ReturnMonth}</Text>
                  </View>
                  <View>
                    <TextInput
                      style={styles.verticalLine}
                      editable={false}
                      selectTextOnFocus={false}
                    />
                  </View>
                  <View>
                    <Text style={{ fontSize: 12 }}>{item.sumValue} EA</Text>
                  </View>
                  <View>
                    <TextInput
                      style={styles.verticalLine}
                      editable={false}
                      selectTextOnFocus={false}
                    />
                  </View>
                  <View>
                    <Text style={{ fontSize: 12 }}>{item.sumPrice} 원</Text>
                  </View>
                  <View>
                    <TextInput
                      style={styles.verticalLine}
                      editable={false}
                      selectTextOnFocus={false}
                    />
                  </View>
                  <View style={{ width: 30 }}>
                    <TouchableOpacity>
                      <FontAwesome name='edit' size={20} color='black' />
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginRight: 10 }}>
                    <TouchableOpacity>
                      <MaterialCommunityIcons
                        name='delete-circle-outline'
                        size={20}
                        color='black'
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
      <PlusBtn onPress={() => navigation.navigate('반품등록')}>
        <AntDesign name='plus' size={24} color='white' />
      </PlusBtn>
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '90%',
    width: '100%',
    marginTop: 30,
    shadowColor: '#000',
  },
  returnListContainer: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E6E7F2',
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gunnyNumber: {
    marginLeft: 1,
    width: 25,
    height: 25,
    backgroundColor: '#ff7d0d',
    color: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnItemContainer: {
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
  },
  verticalLine: {
    borderLeftWidth: 1,
    borderColor: '#dfdfdd',
  },
})
