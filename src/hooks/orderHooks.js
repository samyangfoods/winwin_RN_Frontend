<<<<<<< HEAD
import axios from 'axios'
import { basicApiUrl } from '../secrets/urlSetting'

export const useOrderCreation = async (token, orderObj) => {
  const {
    deliveryPlace,
    deliveryAddress,
    deliveryDate,
    deliveryTime,
    orderDetail,
  } = orderObj

  const formData = new FormData()

  formData.append('deliveryPlace', deliveryPlace)
  formData.append('deliveryAddress', deliveryAddress)
  formData.append('deliveryDate', JSON.stringify(deliveryDate))
  formData.append('deliveryTime', deliveryTime)
  formData.append('orderDetail', JSON.stringify(orderDetail))

  // console.log("🔥 FormData created: ", formData);

  const { data } = await axios.post(`${basicApiUrl}/order`, formData, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })

  console.log('🔥 response: ', data)

  return data
}
=======
import axios from "axios";
import { basicApiUrl } from "../secrets/urlSetting";

export const useOrderCreation = async (token, orderObj) => {
  const { data } = await axios.post(`${basicApiUrl}/order`, orderObj, {
    headers: { authorization: `Bearer ${token}` },
  });

  return data;
};
>>>>>>> b7ab14ed0830f7721f521256688f1be9c6a563bb

export const useOrderList = async (token) => {
  const { data } = await axios.get(`${basicApiUrl}/order`, {
    headers: { authorization: `Bearer ${token}` },
  });

<<<<<<< HEAD
  return data.myOrders
}

export const useOrderItem = async () => {
  console.log('Hello world')
}
=======
  return data.myOrders;
};
>>>>>>> b7ab14ed0830f7721f521256688f1be9c6a563bb

export const useOrderItemById = async (token, orderId) => {
  const { data } = await axios.get(`${basicApiUrl}/order/${orderId}`, {
    headers: { authorization: `Bearer ${token}` },
  });

  return data;
};

export const useOrderUpdateById = async (token, orderId, orderObj) => {
  const { data } = await axios.put(
    `${basicApiUrl}/order/${orderId}`,
    orderObj,
    { headers: { authorization: `Bearer ${token}` } }
  );

  return data;
};

export const userOrderRemovalById = async (token, orderId) => {
  const { data } = await axios.delete(`${basicApiUrl}/order/${orderId}`, {
    headers: { authorization: `Bearer ${token}` },
  });

  return data;
};
