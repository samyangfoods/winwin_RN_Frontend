import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import {
  useOrderItem,
  useOrderList,
  useOrderRemovalById,
} from "../hooks/orderHooks";
import {
  OARContainer,
  OARNumberButton,
  OARVerticalLineContainer,
  OARVerticalLineTextInput,
  OARNumberButtonView,
  OARHorizontalContainer,
} from "../styles/OrderAndReturn";

const OrderAndReturnListItem = ({ item, setOrderList }) => {
  const token = useSelector((state) => state.user.token);

  const processOrderDelete = () => {
    Alert.alert("알림", "삭제하시겠습니까?", [
      { text: "아니오" },
      {
        text: "네",
        onPress: async () => {
          const data = await useOrderRemovalById(token, item._id);
          if (data) {
            const response = await useOrderList(token);
            setOrderList(response);
            Alert.alert("알림", "주문이 삭제되었습니다.");
          }
        },
      },
    ]);
  };

  return (
    <TouchableOpacity onPress={() => useOrderItem()}>
      <OARContainer>
        <OARHorizontalContainer>
          <OARNumberButton>
            <OARNumberButtonView>
              <Text style={{ color: "#fff", fontSize: 15 }}>
                {item.deliveryPlace}
              </Text>
            </OARNumberButtonView>
          </OARNumberButton>

          <View style={{ marginLeft: 5 }}>
            <Text style={{ fontSize: 12 }}>{item.deliveryPlace}</Text>
          </View>

          <OARVerticalLineContainer>
            <OARVerticalLineTextInput
              editable={false}
              selectTextOnFocus={false}
            />
          </OARVerticalLineContainer>

          <View>
            <Text style={{ fontSize: 12 }}>{item.sumValue} EA</Text>
          </View>

          <OARVerticalLineContainer>
            <OARVerticalLineTextInput
              editable={false}
              selectTextOnFocus={false}
            />
          </OARVerticalLineContainer>

          <View>
            <Text style={{ fontSize: 12 }}>{item.sumPrice} 원</Text>
          </View>

          <OARVerticalLineContainer>
            <OARVerticalLineTextInput
              editable={false}
              selectTextOnFocus={false}
            />
          </OARVerticalLineContainer>

          <View style={{ width: 30 }}>
            <TouchableOpacity>
              <FontAwesome name="edit" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ marginRight: 10 }}>
            <TouchableOpacity onPress={processOrderDelete}>
              <MaterialCommunityIcons
                name="delete-circle-outline"
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </OARHorizontalContainer>
      </OARContainer>
    </TouchableOpacity>
  );
};

export default OrderAndReturnListItem;
