import React, {useState} from 'react';
import {StyleSheet, Image, View, Alert, TouchableOpacity} from 'react-native';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import StatText from '../../components/StatText';
import colors from '../../config/colors';
import AppButton from '../../components/AppButton';
import LoadingPopUp from '../../components/popup/LoadingPopUp';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import ImagePicker from 'react-native-image-crop-picker';
import {useMutation} from '@apollo/client';
import {INSERT_BOARD_GAME} from '../../services/graphql/mutation/BoardGameMutations';
import RNFS from 'react-native-fs';

function AddGameScreen({route, navigation}) {
  const {barcode} = route.params;
  const [gameName, setGameName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const [gameDescription, setGameDescription] = useState('');
  const [insertBoardGame, {loading: insertLoading}] = useMutation(
    INSERT_BOARD_GAME,
    {
      onCompleted: async data => {
        console.log('Jeu ajouté', data.insert_BOARD_GAME_one.barcodeID);
        navigation.navigate('GameDetailScreen', {
          game: data.insert_BOARD_GAME_one,
        });
      },
      onError: error => {
        console.error('Error insert:', error);
      },
    },
  );

  const handleImagePicker = () => {
    ImagePicker.openPicker({
      width: 800,
      height: 600,
      cropping: true,
    })
      .then(image => {
        RNFS.readFile(image.path, 'base64')
          .then(data => {
            const imageToShow = `data:${image.mime};base64,${data}`;
            setSelectedImage(imageToShow);
            setBase64Image(data);
            console.log('Selected Image URI:', imageToShow);
          })
          .catch(error => {
            console.log('RNFS Error: ', error);
          });
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const handleCreateGame = () => {
    if (!gameName || !gameDescription || !base64Image) {
      Alert.alert('Missing Information', 'Please fill all fields');
      return;
    }

    console.log('Nom du jeu:', gameName);
    console.log('Description du jeu:', gameDescription);
    insertBoardGame({
      variables: {
        barcodeID: barcode,
        description: gameDescription,
        image: base64Image,
        name: gameName,
      },
    });
    //console.log('Image en base64:', selectedImage);
  };

  return (
    <Screen>
      <View style={styles.mainContainer}>
        <AppText style={styles.titleText}>
          {'Ajouter un jeu à la base de donnée'}
        </AppText>
        <TouchableOpacity
          onPress={handleImagePicker}
          style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={
              selectedImage
                ? {uri: selectedImage}
                : require('../../assets/default-image.png')
            }
          />
        </TouchableOpacity>
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
            title="CRÉER"
            color="mainOrange"
            textColor="mainWhite"
            onPress={handleCreateGame}
          />
          <LoadingPopUp visible={insertBoardGame} />
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
  imageContainer: {
    marginRight: 50,
    marginLeft: 50,
  },
  inputContainer: {
    margin: 20,
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
  titleText: {
    alignSelf: 'center',
    color: colors.mainBlue,
    fontStyle: 'italic',
    fontSize: 18,
  },
  multilineInputStyle: {
    height: 100,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },
});

export default AddGameScreen;
