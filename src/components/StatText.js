import React from 'react';
import AppText from '../components/AppText';
import {StyleSheet, View} from 'react-native';
import colors from '../config/colors';

//base app text
function StatText({label = '', value = ''}) {
  return (
    <View style={styles.mainContainer}>
      <AppText style={styles.labelText}>{label}</AppText>
      <AppText style={styles.valueText}>{value}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'baseline',
  },
  labelText: {
    fontSize: 13,
  },
  valueText: {
    fontSize: 17,
    color: colors.mainOrange,
    fontWeight: 'bold',
  },
});

export default StatText;
