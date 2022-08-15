import axios from 'axios'
import { basicApiUrl } from './urlSetting'

export const useOrderCreation = async (
  token,
  deliveryPlace,
  deliveryAddress,
  deliveryDate,
  deliveryTime,
  orderDetail
) => {
  const formData = new FormData()

  formData.append('deliveryPlace', deliveryPlace)
  formData.append('deliveryAddress', deliveryAddress)
  formData.append('deliveryDate', JSON.stringify(deliveryDate))
  formData.append('deliveryTime', deliveryTime)
  formData.append('orderDetail', JSON.stringify(orderDetail))

  console.log('🔥', formData)

  const { data } = await axios.post(`${basicApiUrl}/order`, formData, {
    headers: { authorization: `Bearer ${token}` },
  })

  return data
}

export const useOrderList = async (token) => {
  const { data } = await axios.get(`${basicApiUrl}/order`, {
    headers: { authorization: `Bearer ${token}` },
  })

  return data
}

export const useOrderItem = async () => {
  console.log('Hello world')
}

export const useOrderItemById = async (token, orderId) => {
  const { data } = await axios.get(`${basicApiUrl}/order/${orderId}`, {
    headers: { authorization: `Bearer ${token}` },
  })

  return data
}

export const useOrderUpdateById = async (
  token,
  orderId,
  deliveryPlace,
  deliveryAddress,
  deliveryDate,
  deliveryTime,
  orderDetail
) => {
  console.log('Delivery Place: ', deliveryPlace)
  console.log('Delivery Address: ', deliveryAddress)
  console.log('Delivery Date: ', deliveryDate)
  console.log('Delivery Time: ', deliveryTime)
  console.log('Order Detail: ', orderDetail)

  const formData = new FormData()

  formData.append('deliveryPlace', deliveryPlace)
  formData.append('deliveryAddress', deliveryAddress)
  formData.append('deliveryDate', deliveryDate)
  formData.append('deliveryTime', deliveryTime)
  formData.append('orderDetail', orderDetail)

  const { data } = await axios.put(
    `${basicApiUrl}/order/${orderId}`,
    formData,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  )

  return data
}

export const userOrderRemoval = async (token, orderId) => {
  const { data } = await axios.delete(`${basicApiUrl}/order/${orderId}`, {
    headers: { authorization: `Bearer ${token}` },
  })

  return data
}
