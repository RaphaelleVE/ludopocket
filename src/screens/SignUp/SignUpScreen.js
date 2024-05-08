import React, {useState} from 'react';
import {StyleSheet, Image, ImageBackground, Alert} from 'react-native';
import Screen from '../../components/Screen';
import AppButton from '../../components/AppButton';
import * as Yup from 'yup';
import Form from '../../components/forms/Form';
import routes from '../../navigation/routes';
import InputContainer from '../../components/forms/InputContainer';
import ButtonContainer from '../../components/forms/ButtonContainer';
import AppFormField from '../../components/forms/FormField';
import LoadingPopUp from '../../components/popup/LoadingPopUp';

import {useUserId, useSignUpEmailPassword, useNhostClient} from '@nhost/react';

let emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

// Define the form validation schema using Yup for email and password
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

// Function to handle user sign-up
function SignupScreen({navigation}) {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    pseudo: '',
  });

  const nhostClient = useNhostClient();
  const {signUpEmailPassword, isLoading} = useSignUpEmailPassword();
  const userId = useUserId();

  const formDataValid = React.useMemo(() => {
    if (
      !emailRegex.test(formState.email) ||
      formState.password.length < 5 ||
      formState.password !== formState.confirmPassword
    ) {
      return false;
    } else {
      return true;
    }
  }, [
    formState.email,
    formState.password,
    formState.confirmPassword,
    formState.pseudo,
  ]);

  const handleRegister = async () => {
    if (isLoading) {
      console.log('is already loading');
      return;
    }

    if (formDataValid) {
      console.log('formvalid');
      try {
        console.log('try');
        const {error, isSuccess} = await signUpEmailPassword(
          formState.email,
          formState.password,
          {
            displayName: formState.pseudo,
          },
        );
        console.log('end call');
        console.log(userId);
        if (error) {
          Alert.alert('Oops', error.message);
        }
        if (isSuccess) {
          console.log(userId);
          navigation.navigate(routes.BOTTOMBARNAVIGATOR);
        }
      } catch (e) {
        console.log(e.message);
        Alert.alert('Error Registering Account', e.message);
      }
    } else {
      Alert.alert('Invalid Form Fields');
    }
  };
  return (
    <Screen>
      <ImageBackground
        blurRadius={3.5}
        style={styles.background}
        source={require('../../assets/bg-login.png')}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo-login.png')}
        />

        <Form
          initialValues={{
            email: formState.email,
            password: formState.password,
            confirmPassword: formState.confirmPassword,
          }}
          onSubmit={values => console.log(values)}
          validationSchema={validationSchema}>
          <InputContainer>
            <AppFormField
              name="pseudo"
              state={formState.pseudo}
              placeholder="Pseudo"
              onChangeText={text => {
                setFormState({
                  ...formState,
                  pseudo: text,
                });
              }}
            />
            <AppFormField
              name="email"
              state={formState.email}
              placeholder="Email"
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={text => {
                setFormState({
                  ...formState,
                  email: text,
                });
              }}
            />
            <AppFormField
              name="password"
              state={formState.password}
              placeholder="Mot de passe"
              secureTextEntry
              textContentType="password"
              onChangeText={text => {
                setFormState({
                  ...formState,
                  password: text,
                });
              }}
            />
            <AppFormField
              name="confirmPassword"
              state={formState.confirmPassword}
              placeholder="Confirmation du mot de passe"
              secureTextEntry
              textContentType="password"
              onChangeText={text => {
                setFormState({
                  ...formState,
                  confirmPassword: text,
                });
              }}
            />
          </InputContainer>

          <ButtonContainer>
            <AppButton title="Inscription" onPress={handleRegister} />
            <AppButton
              title="Connexion"
              color="mainWhite"
              textColor="mainBlue"
              onPress={() => navigation.navigate(routes.LOGIN)}
            />
          </ButtonContainer>
        </Form>
        <LoadingPopUp visible={isLoading} />
      </ImageBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    top: 70,
    alignItems: 'center',
    position: 'absolute',
  },
});

export default SignupScreen;
