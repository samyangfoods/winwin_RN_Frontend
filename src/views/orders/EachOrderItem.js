import React, { useEffect, useRef, useState } from "react";
import {
  EachOrderItemContainer,
  EachOrderItemTextInput,
} from "../../styles/orders/Orders";
import { View, Text, Animated } from "react-native";

const EachOrderItem = ({
  item,
  setSelectedItems,
  selectedItems,
  route,
  preOrderedItem,
}) => {
  // State Variables
  const [isFocused, setIsFocused] = useState(false);
  const [quantity, setQuantity] = useState("");

  // Variables
  const moveText = useRef(new Animated.Value(0)).current;
  const activeLabelStyle = {
    color: !isFocused ? "#aaa" : "#006aff",
    fontSize: 9,
  };
  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [-8, -42],
  });
  const animStyle = { transform: [{ translateY: yVal }] };

  // Text Animation
  useEffect(() => {
    if (quantity !== "") {
      moveTextTop();
      setIsFocused(true);
    } else if (quantity === "") {
      moveTextBottom();
      setIsFocused(false);
    }
  }, [quantity]);

  // For the case of order revision
  useEffect(() => {
    if (route.name !== "주문수정") return;
    preOrderedItem.map((data) => {
      if (item.product_name == data.product_name) {
        setQuantity(data.quantity);
      }
    });
  }, []);

  // Handling Functions
  const handleItemQuantity = () => {
    if (quantity.startsWith("0")) {
      setQuantity("");
      return;
    }
    if (quantity == "") return;

    const { product_name, product_price } = item;
    const productInfo = {
      product_name,
      quantity,
      product_price,
    };

    if (selectedItems.length != 0) {
      selectedItems.map(async (data) => {
        if (data.product_name == product_name) {
          const filteredArray = await selectedItems.filter(
            (item) => item.product_name != product_name
          );

          setSelectedItems([...filteredArray, productInfo]);
        } else {
          setSelectedItems([...selectedItems, productInfo]);
        }
      });
    } else {
      setSelectedItems([productInfo]);
    }
  };
  const handleChangeText = (text) => {
    setQuantity(text);
    handleItemQuantity();
  };
  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Animated.View
        style={[
          {
            top: 25,
            left: 10,
            position: "absolute",
          },
          animStyle,
        ]}
      >
        <Text
          style={[
            { color: "grey", fontSize: 8, width: 99, marginLeft: 1 },
            activeLabelStyle,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.product_name}
        </Text>
      </Animated.View>

      <EachOrderItemContainer>
        <EachOrderItemTextInput
          onChangeText={(text) => handleChangeText(text)}
          value={quantity}
          onEndEditing={handleItemQuantity}
          onBlur={handleItemQuantity}
          blurOnSubmit
          keyboardType="numeric"
        />
      </EachOrderItemContainer>
    </View>
  );
};

export default EachOrderItem;
