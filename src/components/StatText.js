import React from 'react';
import AppText from '../components/AppText';
import {StyleSheet, View} from 'react-native';

//base app text
function StatText({label = '', value = ''}) {
  return (
    <View style={styles.mainContainer}>
      <AppText>{label}</AppText>
      <AppText>{value}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
  },
});

export default StatText;
