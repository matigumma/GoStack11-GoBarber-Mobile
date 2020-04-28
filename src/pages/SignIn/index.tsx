import React from 'react';
import { Image } from 'react-native';

import Imput from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />

      <Title>Make your LogOn</Title>
      <Imput name="email" icon="mail" placeholder="E-mail" />

      <Imput name="password" icon="lock" placeholder="Password" />

      <Button
        onPress={() => {
          console.log('click');
        }}
      >
        Enter
      </Button>
    </Container>
  );
};

export default SignIn;
