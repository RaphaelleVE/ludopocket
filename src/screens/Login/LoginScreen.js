import React, {useState} from 'react';
import {StyleSheet, Image, ImageBackground, Alert} from 'react-native';
import Screen from '../../components/Screen';
import Form from '../../components/forms/Form';
import AppButton from '../../components/AppButton';
import AppFormField from '../../components/forms/FormField';
import InputContainer from '../../components/forms/InputContainer';
import ButtonContainer from '../../components/forms/ButtonContainer';
import {nhostClient} from '../../services/nhostSDK/nhostInit';
import routes from '../../navigation/routes';

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //When user is connected, change the page to profile
  const handleLogin = async () => {
    try{
    await nhostClient.auth.signIn({
      email: email,
      password:  password
    })
    navigation.navigate(routes.BOTTOMBARNAVIGATOR);
  }catch(e){
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

export default LoginScreen;
