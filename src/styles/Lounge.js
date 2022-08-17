// Main, MarketList

import styled from "styled-components/native";

// Universal
export const MainContainer = styled.View`
  flex: 1;
`;
export const Top = styled.View`
  justify-content: center;
  margin: 3% 0;
`;
export const Bottom = styled.FlatList`
  flex: 10;
`;

// MarketList
export const PlusBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 5%;
  right: 5%;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 999px;
  background-color: #ff7d0d;
`;
