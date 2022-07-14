import React from 'react'
import { BasicContainer } from '../styles/Style'
import { StyledPickerInPromotionDetail } from '../styles/Component'
import { yearMonth } from '../datas/ReturnData'

//TODO: 행사 생성 레이아웃 변경하기 로직에 맞게

const CategoryOfGunny = ({ pickedData, setPickedData }) => {
  return (
    <BasicContainer>
      <StyledPickerInPromotionDetail
        item={
          pickedData
            ? pickedData
            : { label: '반품 날짜를 선택하세요!', value: 0 }
        }
        items={yearMonth}
        onItemChange={setPickedData}
        title='반품 날짜'
        placeholder='반품날짜를 선택하세요'
        textInputStyle={{ textAlign: 'center' }}
      />
    </BasicContainer>
  )
}

export default CategoryOfGunny
