import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Alert} from 'react-native';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import StatText from '../../components/StatText';
import {useUser} from '../../data/contexts/UserContext';
import {useRegisteredGamesData} from '../../data/contexts/RegisteredGameContext';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import {useUserAvatarUrl, Storage} from '@nhost/react';
import {useMutation} from '@apollo/client';
import {UPDATE_USER_AVATAR} from '../../services/graphql/mutation/UserMutations';

function ProfileScreen({navigation}) {
  const {userData} = useUser();
  const {RegisteredGamesData} = useRegisteredGamesData();
  const [stats, setStats] = useState({
    nbOfGamesOwned: '',
    nbOfGamesPlayed: '',
    nbOfGamesOwnedButNotPlayed: '',
    nbOfGamesPlayedInTotal: '',
    mostPlayedGame: '',
    mostRecentGame: '',
    leastRecentGame: '',
  });

  //useEffect to get and calculate all statistics
  useEffect(() => {
    if (RegisteredGamesData) {
      const totalOwned = RegisteredGamesData.filter(
        game => game.isOwned,
      ).length;
      const totalPlayed = RegisteredGamesData.filter(
        game => game.isPlayed,
      ).length;
      const totalOwnedNotPlayed = RegisteredGamesData.filter(
        game => game.isOwned && !game.isPlayed,
      ).length;
      const totalGamesPlayed = RegisteredGamesData.reduce(
        (total, game) => total + game.numberOfTimePlayed,
        0,
      );
      //Get most played game (list if there is more than one)
      let mostPlayed = '';
      let maxNumberOfTimePlayed = 0;
      console.log('avant');
      RegisteredGamesData.forEach(game => {
        if (game.numberOfTimePlayed > maxNumberOfTimePlayed) {
          mostPlayed = game.BOARD_GAME.name;
          maxNumberOfTimePlayed = game.numberOfTimePlayed;
        } else if (game.numberOfTimePlayed === maxNumberOfTimePlayed) {
          mostPlayed += `, ${game.BOARD_GAME.name}`;
        }
      });
      //get least and most recent game played
      let mostRecentGame = null;
      let mostRecentDate = new Date(0);
      let leastRecentGame = null;
      let leastRecentDate = new Date();
      RegisteredGamesData.forEach(game => {
        const gameDate = new Date(game.dateLastPlayed);
        if (gameDate > mostRecentDate) {
          mostRecentGame = game.BOARD_GAME.name;
          mostRecentDate = gameDate;
        } else if (gameDate.getTime() === mostRecentDate.getTime()) {
          mostRecentGame += `, ${game.BOARD_GAME.name}`;
        }
        if (gameDate < leastRecentDate) {
          leastRecentGame = game.BOARD_GAME.name;
          leastRecentDate = gameDate;
        } else if (gameDate.getTime() === leastRecentDate.getTime()) {
          leastRecentGame += `, ${game.BOARD_GAME.name}`;
        }
      });

      const maxLength = 12;
      mostRecentGame =
        mostRecentGame?.length > maxLength
          ? mostRecentGame.substring(0, 12) + '...'
          : mostRecentGame;
      leastRecentGame =
        leastRecentGame?.length > maxLength
          ? leastRecentGame.substring(0, 13) + '...'
          : leastRecentGame;
      setStats({
        ...stats,
      });

      setStats({
        ...stats,
        nbOfGamesOwned: totalOwned,
        nbOfGamesPlayed: totalPlayed,
        nbOfGamesOwnedButNotPlayed: totalOwnedNotPlayed,
        nbOfGamesPlayedInTotal: totalGamesPlayed,
        mostPlayedGame: mostPlayed || 'Aucun jeu joué',
        mostRecentGame: mostRecentGame || 'Aucun jeu joué',
        leastRecentGame: leastRecentGame || 'Aucun jeu joué',
      });
    }
  }, [RegisteredGamesData]);

  return (
    <Screen>
      <View style={styles.mainContainer}>
        <AppText style={styles.text}>Bonjour, {userData?.displayName}!</AppText>
        <AppText style={styles.text}>Voici ton palmares:</AppText>
        <StatText label={'Jeu le plus joué: '} value={stats.mostPlayedGame} />
        <StatText
          label={'Nombre de jeux différents jouées: '}
          value={stats.nbOfGamesPlayed}
        />
        <StatText
          label={'Nombre de parties totales jouées: '}
          value={stats.nbOfGamesPlayedInTotal}
        />
        <StatText
          label={'Nombre de jeux possédé: '}
          value={stats.nbOfGamesOwned}
        />
        <StatText
          label={'Nombre de jeux possédé mais non jouées: '}
          value={stats.nbOfGamesOwnedButNotPlayed}
        />
        <StatText
          label={'Nombre de jeux différents jouées: '}
          value={stats.nbOfGamesPlayed}
        />
        <StatText
          label={'Jeu joué le moins recemment: '}
          value={stats.mostRecentGame}
        />
        <StatText
          label={'Jeu joué le plus recemment: '}
          value={stats.leastRecentGame}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profilePic: {
    width: 200,
    height: 200,
    margin: 50,
    marginBottom: 10,
    alignSelf: 'center',
    borderRadius: 100,
  },
  mainContainer: {
    flex: 1,
    margin: 20,
  },
  text: {
    alignSelf: 'center',
    margin: 25,
    fontSize: 15,
  },
  imageContainer: {
    alignSelf: 'center',
  },
});

export default ProfileScreen;
