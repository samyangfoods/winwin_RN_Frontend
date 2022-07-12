import styled from "styled-components/native";

export const OARContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 2%;
`;

export const OARScrollView = styled.ScrollView`
  flex: 1;
  margin-top: 10;
`;

export const OARHorizontalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 40px;
  border: 1px solid #e6e7f2;
  border-radius: 10px;
  background-color: white;
  padding: 5px;
`;

export const OARNumberButton = styled.TouchableOpacity``;
export const OARNumberButtonView = styled.View`
  align-items: center;
  justify-content: center;
  margin-left: 1px;
  width: 25px;
  height: 25px;
  background-color: #ff7d0d;
  color: #fff;
  border-radius: 10px;
`;

export const OARVerticalLineContainer = styled.View``;

export const OARVerticalLineTextInput = styled.TextInput`
  border-left-width: 1px;
  border-color: #dfdfdd;
`;
