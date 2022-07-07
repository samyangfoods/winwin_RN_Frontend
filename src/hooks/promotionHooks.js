import axios from "axios";
import { basicApiUrl } from "./urlSetting";

export const usePromotions = async (token) => {
  const { data } = await axios.get(`${basicApiUrl}/promotion`, {
    headers: {
      authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": true,
    },
  });

  return data.promotions;
};

// Create Promotion
export const usePromotionCreation = async (promotionObj, token) => {
  const formData = new FormData();
  const {
    marketName,
    marketAddress,
    pos,
    image,
    start_date,
    end_date,
    promotionType,
    promotionCost,
    promotionDetail,
  } = promotionObj;

  // Build formData in order to send promotion data to server.
  formData.append("marketName", marketName);
  formData.append("marketAddress", marketAddress);
  formData.append("pos", pos);
  formData.append("start_date", start_date);
  formData.append("end_date", end_date);
  formData.append("promotionType", promotionType);
  formData.append("promotionCost", promotionCost);
  formData.append("file1", image[0]);
  formData.append("file2", image[1]);
  formData.append("file3", image[2]);
  formData.append("file4", image[3]);
  formData.append("promotionDetail", JSON.stringify(promotionDetail));

  // Send back result to frontend.
  const { data } = await axios.post(`${basicApiUrl}/promotion`, formData, {
    headers: { authorization: `Bearer ${token}` },
  });

  return data;
};

export const usePromotionUpdate = async (token, promotionObj, promotionId) => {
  const formData = new FormData();
  const {
    images,
    start_date,
    end_date,
    promotionType,
    promotionDetail,
  } = promotionObj;

  console.log("✅ promotionId: ", promotionId);

  formData.append("start_date", start_date);
  formData.append("end_date", end_date);
  formData.append("promotionDetail", JSON.stringify(promotionDetail));
  formData.append("promotionType", promotionType);
  formData.append("file1", images[0]);
  if (images[1]) formData.append("file2", images[1]);
  if (images[2]) formData.append("file3", images[2]);
  if (images[3]) formData.append("file4", images[3]);

  console.log("✅ formData: ", formData);

  const { data } = await axios.put(
    `${basicApiUrl}/promotion/${promotionId}`,
    formData,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

  if (data) {
    console.log("✅ result data: ", data);
    return data;
  }
};

export const usePromotionDelete = async (token, promotionId) => {
  const { data } = await axios.delete(
    `${basicApiUrl}/promotion/${promotionId}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

  return data;
};
