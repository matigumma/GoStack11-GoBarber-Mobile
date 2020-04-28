import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background-color: #ff9000;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;
export const ButtonText = styled.Text`
  font-size: 20px;
  color: #312e38;
  font-family: 'RobotoSlab-Medium';
`;
