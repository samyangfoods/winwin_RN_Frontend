import axios from "axios";

export const useOrderCreation = async (
  token,
  deliveryPlace,
  deliveryAddress,
  deliveryDate,
  deliveryTime,
  orderDetail
) => {
  console.log("Delivery Place: ", deliveryPlace);
  console.log("Delivery Address: ", deliveryAddress);
  console.log("Delivery Date: ", deliveryDate);
  console.log("Delivery Time: ", deliveryTime);
  console.log("Order Detail: ", orderDetail);

  const formData = new FormData();

  formData.append("deliveryPlace", deliveryPlace);
  formData.append("deliveryAddress", deliveryAddress);
  formData.append("deliveryDate", deliveryDate);
  formData.append("deliveryTime", deliveryTime);
  formData.append("orderDetail", orderDetail);

  const { data } = await axios.post(`${basicApiUrl}/order`, formData, {
    headers: { authorization: `Bearer ${token}` },
  });

  return data;
};

export const useOrderList = async () => {
  const { data } = await axios.get(`${basicApiUrl}/order`, {
    headers: { authorization: `Bearer ${token}` },
  });
};
