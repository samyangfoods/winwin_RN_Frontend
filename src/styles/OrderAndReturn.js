import styled from "styled-components/native";

export const OARContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 0% 5%;
  margin-bottom: 7%;
  border-radius: 8px;
  border: 1px solid #e6e7f2;
  background-color: white;
  box-shadow: 1px 5px 2px #aaa;
`;

export const OARScrollView = styled.ScrollView`
  flex: 1;
  margin-top: 10;
`;

export const OARTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border: 1px solid transparent;
  border-bottom-color: #aaa9a9;
  margin: 0 3%;
`;

export const OARContentsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 3%;
`;

export const OARComponentsContainer = styled.View`
  align-items: center;
  width: 25%;
  padding: 2% 0;
`;

export const OARUserInfoContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: #e6e7f2;
  border-radius: 8px;
`;

export const OARTitle = styled.Text`
  font-weight: bold;
`;
