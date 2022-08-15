<<<<<<< HEAD
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
=======
import axios from "axios";
import { basicApiUrl } from "../secrets/urlSetting";

export const useOrderCreation = async (token, orderObj) => {
  const {
    deliveryPlace,
    deliveryAddress,
    deliveryDate,
    deliveryTime,
    orderDetail,
  } = orderObj;

  const formData = new FormData();

  formData.append("deliveryPlace", deliveryPlace);
  formData.append("deliveryAddress", deliveryAddress);
  // formData.append("deliveryDate", JSON.stringify(deliveryDate));
  formData.append("deliveryDate", "2022-01-01");
  formData.append("deliveryTime", deliveryTime);
  // formData.append("orderDetail", JSON.stringify(orderDetail));
  formData.append("orderDetail", "Hello");

  console.log("🔥 FormData created: ", formData);
>>>>>>> 412933d7e3c0d301d25cd13a861c0419997e12ef

  const { data } = await axios.post(`${basicApiUrl}/order`, formData, {
    headers: { authorization: `Bearer ${token}` },
  })

<<<<<<< HEAD
  return data
}
=======
  // console.log("🔥 response: ", data);

  return data;
};
>>>>>>> 412933d7e3c0d301d25cd13a861c0419997e12ef

export const useOrderList = async (token) => {
  const { data } = await axios.get(`${basicApiUrl}/order`, {
    headers: { authorization: `Bearer ${token}` },
  })

<<<<<<< HEAD
  return data
}
=======
  return data.myOrders;
};
>>>>>>> 412933d7e3c0d301d25cd13a861c0419997e12ef

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
