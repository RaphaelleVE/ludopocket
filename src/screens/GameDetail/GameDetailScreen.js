import React from 'react';
import {StyleSheet, Image, ImageBackground, View} from 'react-native';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import StatText from '../../components/StatText';
import colors from '../../config/colors';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

function GameDetailScreen({route, navigation}) {
  console.log('inscreen');
  const {game} = route.params;
  return (
    <Screen>
      <IconButton
        icon={() => <Icon name="arrow-left" color={colors.mainOrange} />}
        iconColor={colors.mainOrange}
        size={30}
        style={styles.arrow}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.mainContainer}>
        <Image style={styles.profilePic} source={game.image} />
        <AppText style={styles.text}>{game.title}</AppText>
        <StatText label={'nombre de jeux jouées:'} value={'23'} />
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
  arrow: {
    marginL: 10,
  },
  mainContainer: {
    flex: 1,
  },
  text: {
    alignSelf: 'center',
  },
});

export default GameDetailScreen;
