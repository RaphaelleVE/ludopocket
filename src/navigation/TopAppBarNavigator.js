import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {nhostClient} from '../services/nhostSDK/nhostInit';

import colors from '../config/colors';

function TopAppBarNavigator({title}) {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await nhostClient.auth.signOut();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Icon name="sign-out" color={colors.white} size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.mainBlue,
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginLeft: 15,
  },
});

export default TopAppBarNavigator;
