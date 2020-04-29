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

/* components: */
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import Imput from '../../components/Input';
import Button from '../../components/Button';

/* images: */
import logoImg from '../../assets/logo.png';

/* styles: */
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

/* interfaces: */
interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({}); /* empty errors */

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail is required')
          .email('Should be a valid e-mail'),
        password: Yup.string().required('Password is required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }
      Alert.alert('Login error', 'Error ocurr during login');
    }
  }, []);

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
              <Title>Make your LogOn</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Imput
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Imput
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Password"
                secureTextEntry
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
                Enter
              </Button>
            </Form>

            <ForgotPassword
              onPress={() => {
                console.log('forgot');
              }}
            >
              <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Create account</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
