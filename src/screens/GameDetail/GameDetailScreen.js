import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View, Alert} from 'react-native';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import ThreeSelectableButtons from '../../components/ThreeSelectableButtons';
import {useMutation, useQuery} from '@apollo/client';
import {
  INSERT_REGISTERED_GAMES,
  UPDATE_REGISTERED_GAMES,
  DELETE_ONE_REGISTERED_GAMES,
} from '../../services/graphql/mutation/RegisteredGameMutations';
import {GET_ONE_REGISTERED_GAME} from '../../services/graphql/query/RegisteredGameQueries';
import LoadingPopUp from '../../components/popup/LoadingPopUp';
import {
  updateRegisteredGames,
  useRegisteredGamesData,
} from '../../data/contexts/RegisteredGameContext';

import {useUserId} from '@nhost/react';

function GameDetailScreen({route, navigation}) {
  const {game} = route.params;
  //console.log(game);
  const imageUri = `data:image/jpeg;base64,${game.image}`;
  const userId = useUserId();

  const [registeredGameDataInScreen, setRegisteredGameData] = useState(null);
  //const {setRegisteredGamesDataForUpdate} = useRegisteredGamesData();

  const [loading, setLoading] = useState(true);
  const {RegisteredGamesData, setRegisteredGamesData} =
    useRegisteredGamesData();

  const {data} = useQuery(GET_ONE_REGISTERED_GAME, {
    variables: {boardGameID: game.barcodeID, userId},
    onCompleted: data => {
      if (data.REGISTERED_GAME.length > 0) {
        console.log(
          'registeredGameID:',
          data.REGISTERED_GAME[0].registeredGameID,
        );
        setRegisteredGameData(data.REGISTERED_GAME[0]);
      } else {
        setPossessionSelected(false);
        setPlayedSelected(false);
        setFavoriteSelected(false);
        setRegisteredGameData(null);
        console.log('No registered game found');
      }
      setLoading(false);
      //console.log('registeredGAme is ' + registeredGameDataInScreen);
    },
    onError: error => {
      console.error('Error fetching registered game:', error);
    },
  });

  const [possessionSelected, setPossessionSelected] = useState(false);
  const [playedSelected, setPlayedSelected] = useState(false);
  const [favoriteSelected, setFavoriteSelected] = useState(false);
  const [deleteRegisteredGame] = useMutation(DELETE_ONE_REGISTERED_GAMES, {
    onCompleted: data => {
      console.log('delete réussi');
      setRegisteredGameData(null);
    },
    onError: error => {
      console.error('Erreur lors de la suppression:', error);
    },
  });

  const [insertRegisteredGame, {loading: insertLoading}] = useMutation(
    INSERT_REGISTERED_GAMES,
    {
      onCompleted: async data => {
        console.log(
          'Jeu ajouté',
          data.insert_REGISTERED_GAME_one.registeredGameID,
        );
        setRegisteredGameData(data.insert_REGISTERED_GAME_one);
        // Obtenir les données et la fonction setRegisteredGamesData depuis le contexte
        const updatedRegisteredGames = [
          ...RegisteredGamesData,
          data.insert_REGISTERED_GAME_one,
        ]; // Ajouter le nouveau jeu à la liste existante
        updateRegisteredGames(updatedRegisteredGames, setRegisteredGamesData);
      },
      onError: error => {
        console.error('Error insert:', error);
        // Vous pouvez ajouter ici une logique de gestion des erreurs si nécessaire
      },
    },
  );
  const [updateRegisteredGame, {loading: updateLoading}] = useMutation(
    UPDATE_REGISTERED_GAMES,
    {
      onCompleted: async data => {
        try {
          const updatedRegisteredGames = RegisteredGamesData.map(game =>
            game.registeredGameID ===
            data.update_REGISTERED_GAME_by_pk.registeredGameID
              ? data.update_REGISTERED_GAME_by_pk
              : game,
          );
          console.log(setRegisteredGamesData.registeredGameID);
          updateRegisteredGames(updatedRegisteredGames, setRegisteredGamesData);
          console.log('Jeu mis à jour');

          if (
            !data.update_REGISTERED_GAME_by_pk.isOwned &&
            !data.update_REGISTERED_GAME_by_pk.isPlayed &&
            !data.update_REGISTERED_GAME_by_pk.isWished &&
            data.update_REGISTERED_GAME_by_pk.registeredGameID
          ) {
            await deleteRegisteredGame({
              variables: {
                registeredGameID:
                  data.update_REGISTERED_GAME_by_pk.registeredGameID,
              },
            });
          }
        } catch (error) {
          console.error('Error updating context:', error);
        }
      },
      onError: error => {
        console.error('Error update:', error);
      },
    },
  );

  useEffect(() => {
    if (registeredGameDataInScreen) {
      console.log('existe : ' + registeredGameDataInScreen.registeredGameID);
      setPossessionSelected(registeredGameDataInScreen.isOwned);
      setPlayedSelected(registeredGameDataInScreen.isPlayed);
      setFavoriteSelected(registeredGameDataInScreen.isWished);
    }
  }, [registeredGameDataInScreen]);

  const onAddBoardGame = async (isOwned, isPlayed, isWished) => {
    try {
      console.log(
        game.barcodeID +
          ' for user ' +
          userId +
          ', owned ' +
          isOwned +
          ',played ' +
          isPlayed +
          ', wished ' +
          isWished,
      );
      //console.log(registeredGameDataInScreen);
      if (
        registeredGameDataInScreen == null ||
        registeredGameDataInScreen.registeredGameID == null
      ) {
        console.log('try insert');
        await insertRegisteredGame({
          variables: {
            boardGameID: game.barcodeID,
            isOwned,
            isPlayed,
            isWished,
            userID: userId,
          },
        });
      } else {
        console.log('try update');
        await updateRegisteredGame({
          variables: {
            registeredGameID: registeredGameDataInScreen.registeredGameID,
            isOwned,
            isPlayed,
            isWished,
          },
        });
      }
    } catch (e) {
      Alert.alert('Failed to join the event!', e.message);
      console.error('Failed to join the event!', e.message);
    }
  };

  const handlePossessionPress = () => {
    const newPossessionSelected = !possessionSelected;
    setPossessionSelected(newPossessionSelected);
    onAddBoardGame(newPossessionSelected, playedSelected, favoriteSelected);
  };

  const handlePlayedPress = () => {
    const newPlayedSelected = !playedSelected;
    setPlayedSelected(newPlayedSelected);
    onAddBoardGame(possessionSelected, newPlayedSelected, favoriteSelected);
  };

  const handleFavoritePress = () => {
    const newFavoriteSelected = !favoriteSelected;
    setFavoriteSelected(newFavoriteSelected);
    onAddBoardGame(possessionSelected, playedSelected, newFavoriteSelected);
  };

  return (
    <Screen>
      <View style={styles.horizontalView}>
        <IconButton
          icon={() => <Icon name="arrow-left" color={colors.mainOrange} />}
          size={30}
          onPress={() => navigation.goBack()}
          style={styles.arrow}
        />
        <AppText style={styles.titleText}>{game.name}</AppText>
      </View>
      <View style={styles.mainContainer}>
        <Image style={styles.profilePic} source={{uri: imageUri}} />
        <ThreeSelectableButtons
          possessionSelected={possessionSelected}
          playedSelected={playedSelected}
          favoriteSelected={favoriteSelected}
          handlePossessionPress={handlePossessionPress}
          handlePlayedPress={handlePlayedPress}
          handleFavoritePress={handleFavoritePress}
        />
        <AppText style={styles.descText}>{game.description}</AppText>
        <LoadingPopUp visible={loading && insertLoading && updateLoading} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profilePic: {
    width: 170,
    height: 170,
    marginBottom: 10,
    alignSelf: 'center',
    resizeMode: 'contain',
    backgroundColor: colors.mainCream,
  },
  horizontalView: {
    flexDirection: 'row',
  },
  arrow: {
    marginLeft: 10,
  },
  mainContainer: {
    flex: 1,
  },
  titleText: {
    alignSelf: 'center',
    color: colors.mainOrange,
    fontWeight: 'bold',
  },
  descText: {
    alignSelf: 'flex-start',
    margin: 20,
    marginTop: 10,
    fontSize: 12,
  },
});

export default GameDetailScreen;
