import React, {useState} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import ThreeSelectableButtons from '../../components/ThreeSelectableButtons';

function GameDetailScreen({route, navigation}) {
  const {game} = route.params;
  const [possessionSelected, setPossessionSelected] = useState(false);
  const [playedSelected, setPlayedSelected] = useState(false);
  const [favoriteSelected, setFavoriteSelected] = useState(false);

  const handlePossessionPress = () => {
    setPossessionSelected(!possessionSelected);
    if(possessionSelected){
      game.description = "test"
    }
  };

  const handlePlayedPress = () => {
    setPlayedSelected(!playedSelected);
  };

  const handleFavoritePress = () => {
    setFavoriteSelected(!favoriteSelected);
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
        <AppText style={styles.titleText}>{game.title}</AppText>
      </View>
      <View style={styles.mainContainer}>
        <Image style={styles.profilePic} source={game.image} />
        <ThreeSelectableButtons
          possessionSelected={possessionSelected}
          playedSelected={playedSelected}
          favoriteSelected={favoriteSelected}
          handlePossessionPress={handlePossessionPress}
          handlePlayedPress={handlePlayedPress}
          handleFavoritePress={handleFavoritePress}
        />
        <AppText style={styles.descText}>{game.description}</AppText>
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
