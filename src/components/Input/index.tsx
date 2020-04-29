import React, {
  useEffect,
  useRef,
  useImperativeHandle /* this is used to create an instance for parent component access */,
  forwardRef /* required to export component with liked reference */,
  useState,
  useCallback,
} from 'react';
import { TextInputProps } from 'react-native';

/* libraries: */
import { useField } from '@unform/core';

/* styles: */
import { Container, TextInput, Icon } from './styles';

/* interfaces: */
interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}
interface InputValueRef {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  forwadedRef
) => {
  const inputRefElement = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueRef>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(forwadedRef, () => ({
    /* this is used to link (in this case a method) to the parent component reference  */
    focus() {
      inputRefElement.current.focus(); /* action of this method can be any... */
    },
  }));

  useEffect(() => {
    /* unform registering this imput on parent Form */
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputRefElement.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputRefElement.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />
      <TextInput
        ref={inputRefElement}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
