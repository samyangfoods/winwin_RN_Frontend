import axios from 'axios'
import { basicApiUrl } from '../secrets/urlSetting'

export const useReturnBagCreation = async (token, retrnObj) => {
  const { data } = await axios.post(`${basicApiUrl}/returnbag`, retrnObj, {
    headers: { authorization: `Bearer ${token}` },
  })

  return data
}

export const useRetrunBagList = async (token) => {
  const { data } = await axios.get(`${basicApiUrl}/returnbag`, {
    headers: { authorization: `Bearer ${token}` },
  })

  return data.myOrders
}
