import React from 'react'
import { BasicContainer } from '../styles/Style'
import { StyledPickerInPromotionDetail } from '../styles/Component'
import { gunnyNumber } from '../datas/ReturnData'

//TODO: 행사 생성 레이아웃 변경하기 로직에 맞게

const CategoryOfGunny = ({ pickedData, setPickedData }) => {
  return (
    <BasicContainer>
      <StyledPickerInPromotionDetail
        item={pickedData ? pickedData : { label: '번호 선택하세요', value: 0 }}
        items={gunnyNumber}
        onItemChange={setPickedData}
        title='마대 번호'
        placeholder='마대번호를 선택하세요'
        textInputStyle={{ textAlign: 'center' }}
      />
    </BasicContainer>
  )
}

export default CategoryOfGunny
