import axios from 'axios'
import { basicApiUrl } from '../secrets/urlSetting'

export const useReturnBagCreation = async (token, returnObj) => {
  console.log('ReturnObj', returnObj)

  const { data } = await axios.post(`${basicApiUrl}/returnbag`, returnObj, {
    headers: { authorization: `Bearer ${token}` },
  })

  return data
}

export const useReturnBagList = async (token) => {
  const { data } = await axios.get(`${basicApiUrl}/returnbag`, {
    headers: { authorization: `Bearer ${token}` },
  })

  return data.myReturnBags
}
