import axios from "axios";
import { basicApiUrl } from "../secrets/urlSetting";

export const useOrderCreation = async (token, orderObj) => {
  console.log("🔥🔥🔥🔥🔥🔥");
  console.log(orderObj);

  const { data } = await axios.post(`${basicApiUrl}/order`, orderObj, {
    headers: { authorization: `Bearer ${token}` },
  });

  return data;
};

export const useOrderList = async (token) => {
  const { data } = await axios.get(`${basicApiUrl}/order`, {
    headers: { authorization: `Bearer ${token}` },
  });

  return data.myOrders;
};

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
