import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  OARContainer,
  OARNumberButton,
  OARVerticalLineContainer,
  OARVerticalLineTextInput,
  OARNumberButtonView,
  OARHorizontalContainer,
} from "../styles/OrderAndReturn";

const OrderAndReturnListItem = ({ item }) => {
  return (
    <OARContainer>
      <OARHorizontalContainer>
        <OARNumberButton>
          <OARNumberButtonView>
            <Text style={{ color: "#fff", fontSize: 15 }}>
              {item.gunnyNumber}
            </Text>
          </OARNumberButtonView>
        </OARNumberButton>

        <View style={{ marginLeft: 5 }}>
          <Text style={{ fontSize: 12 }}>{item.ReturnMonth}</Text>
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
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="delete-circle-outline"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </OARHorizontalContainer>
    </OARContainer>
  );
};

export default OrderAndReturnListItem;
