import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;
export const Title = styled.Text`
  font-size: 20px;
  margin: 64px 0 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`;

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;

  padding: 16px 0 ${16 + getBottomSpace()}px;
  border-top-width: 1px;
  border-color: #232129;
`;
export const BackToSignInText = styled.Text`
  color: #f4ede8;
  font-size: 18px;
  margin-left: 8px;

  font-family: 'RobotoSlab-Regular';
`;
