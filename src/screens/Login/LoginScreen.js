import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, ImageBackground, Alert} from 'react-native';
import Screen from '../../components/Screen';
import Form from '../../components/forms/Form';
import AppButton from '../../components/AppButton';
import AppFormField from '../../components/forms/FormField';
import InputContainer from '../../components/forms/InputContainer';
import ButtonContainer from '../../components/forms/ButtonContainer';
import routes from '../../navigation/routes';
import LoadingPopUp from '../../components/popup/LoadingPopUp';

import {useUserData, useSignInEmailPassword} from '@nhost/react';

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signInEmailPassword, isLoading} = useSignInEmailPassword();

  const handleLogin = async () => {
    try {
      if (isLoading) {
        return;
      }
      const {error, isSuccess} = await signInEmailPassword(email, password);
      if (error) {
        console.log(error.message);
        Alert.alert("Couldn't sign in!", error.message);
      }
      if (isSuccess) {
        // console.log(userData.id + userData);
        setPassword('');
        navigation.navigate(routes.BOTTOMBARNAVIGATOR);
      }
    } catch (e) {
      console.log(e.message);
      Alert.alert('Error during Login', e.message);
    }
  };

  return (
    <Screen>
      <ImageBackground
        blurRadius={3.5}
        source={require('../../assets/bg-login.png')}
        style={styles.background}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo-login.png')}
        />

        <Form
          initialValues={{email: email, password: password}}
          onSubmit={values => console.log(values)}>
          <InputContainer>
            <AppFormField
              name="email"
              state={email}
              placeholder="Email"
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={text => setEmail(text)}
            />
            <AppFormField
              name="password"
              state={password}
              placeholder="Mot de passe"
              secureTextEntry
              textContentType="password"
              onChangeText={text => setPassword(text)}
            />
          </InputContainer>

          <ButtonContainer>
            <AppButton title="Connexion" onPress={handleLogin} />
            <AppButton
              title="Inscription"
              color="mainWhite"
              textColor="mainBlue"
              onPress={() => navigation.navigate(routes.SIGNUP)}
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
    width: 350,
    height: 350,
    top: 70,
    alignItems: 'center',
    position: 'absolute',
  },
});

export default LoginScreen;
