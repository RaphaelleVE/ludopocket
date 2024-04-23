import React, {useState} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import StatText from '../../components/StatText';
import colors from '../../config/colors';
import AppButton from '../../components/AppButton';
import LoadingPopUp from '../../components/popup/LoadingPopUp';

import {FloatingLabelInput} from 'react-native-floating-label-input';

function AddGameScreen({navigation}) {
  const [gameName, setGameName] = useState('');
  const [gameDescription, setGameDescription] = useState('');

  return (
    <Screen>
      <View style={styles.mainContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/petitchat.png')}
        />
        <View style={styles.inputContainer}>
          <FloatingLabelInput
            label={'Nom du jeu'}
            value={gameName}
            containerStyles={styles.inputContainerStyle}
            labelStyles={styles.labelStyle}
            onChangeText={value => setGameName(value)}
          />
          <FloatingLabelInput
            label={'Description du jeu'}
            value={gameDescription}
            onChangeText={value => setGameDescription(value)}
            containerStyles={styles.inputContainerStyle}
            labelStyles={styles.labelStyle}
            inputStyles={[styles.inputStyle, styles.multilineInputStyle]}
            multiline
          />
          <AppButton
            style={styles.button}
            title="Inscription"
            color="mainOrange"
            textColor="mainWhite"
          />
          <LoadingPopUp visible={false} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  button: {
    margin: 20,
  },
  image: {
    width: 180,
    height: 180,
    margin: 20,
    resizeMode: 'contain',
    backgroundColor: colors.mainCream,
    alignSelf: 'center',
  },
  inputContainer: {
    margin: 20,
    // borderBottomColor: colors.mainOrange,
    // borderBottomWidth: 2,
    //  borderRadius: 10, // Rounded corners
  },
  inputContainerStyle: {
    borderWidth: 1,
    paddingHorizontal: 10,
    padding: 10,
    backgroundColor: colors.mainWhite,
    borderColor: colors.mainOrange,
    borderRadius: 8,
    marginBottom: 20,
  },
  labelStyles: {
    backgroundColor: colors.mainWhite,
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  multilineInputStyle: {
    height: 100, // Height of the multiline input
    textAlignVertical: 'top', // Align text to the top
    paddingVertical: 10, // Add padding vertically
  },
});

export default AddGameScreen;
