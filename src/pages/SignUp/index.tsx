import React, { useCallback, useRef } from 'react';
import {
  Image,
  ScrollView,
  KeyboardAvoidingView /* it is for move container up when keyboard apear */,
  Platform,
  View,
  TextInput,
  Alert,
} from 'react-native';

/* libraries: */
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core'; /* interface Form */
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

/* utils/services: */
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

/* components: */
import Imput from '../../components/Input';
import Button from '../../components/Button';

/* images: */
import logoImg from '../../assets/logo.png';

/* styles: */
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

/* interfaces: */
interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({}); /* empty errors */

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .required('E-mail is required')
            .email('Should be a valid e-mail'),
          password: Yup.string().min(6, 'Password is required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert(
          `Great! ${data.name}!`,
          'Your account has been successfully created'
        );

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        Alert.alert('SignUp error', 'Error ocurr during SignUp');
      }
    },
    [navigation]
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
          /* this is for scroll when keyboard is open */
        >
          <Container>
            <Image source={logoImg} />
            <View>
              {/* hack for KeyboardAvoidingView, to apply animation on text */}
              <Title>Create your account</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Imput
                name="name"
                icon="user"
                placeholder="Name"
                autoCapitalize="words"
                autoCorrect
                autoCompleteType="name"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus(); /* focus email input */
                }}
              />

              <Imput
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus(); /* focus password input */
                }}
              />

              <Imput
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Password"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm(); /* fire event submit method  */
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm(); /* fire event submit method  */
                }}
              >
                Create
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      >
        <Icon name="arrow-left" size={20} color="#ff9000" />
        <BackToSignInText>Back to logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
