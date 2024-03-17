import React from 'react';
import {StyleSheet, Image, ImageBackground, View} from 'react-native';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import StatText from '../../components/StatText';

function ProfileScreen({navigation}) {
  return (
    <Screen>
      <View style={styles.mainContainer}>
        <Image
          style={styles.profilePic}
          source={require('../../assets/petitchat.png')}
        />
        <AppText style={styles.text}>{'testpseudi'}</AppText>
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
  mainContainer: {
    flex: 1,
  },
  text: {
    alignSelf: 'center',
  },
});

export default ProfileScreen;
