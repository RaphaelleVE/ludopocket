import React, {useEffect} from 'react';
import {StyleSheet, Image, ImageBackground, View} from 'react-native';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import StatText from '../../components/StatText';
import {useUser} from '../../data/contexts/UserContext';

function ProfileScreen({navigation}) {
  const {userData} = useUser();

  console.log('profile ' + userData.id);
  return (
    <Screen>
      <View style={styles.mainContainer}>
        <Image
          style={styles.profilePic}
          source={require('../../assets/petitchat.png')}
        />
        <AppText style={styles.text}>{userData.displayName}</AppText>
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
