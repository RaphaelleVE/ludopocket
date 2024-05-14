import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../config/colors';
import AppText from '../../components/AppText';

const CounterAndShowButtons = ({onPressSubtract, onPressAdd, numberPlayed}) => {
  return (
    <View style={styles.inline}>
      <AppText style={styles.descText}>Joué </AppText>
      <IconButton
        icon={() => <Icon name="minus" color={colors.mainOrange} />}
        color={colors.mainOrange}
        size={20}
        onPress={onPressSubtract}
      />
      <View style={styles.container}>
        <AppText style={styles.descText}> {numberPlayed} </AppText>
      </View>
      <IconButton
        icon={() => <Icon name="plus" color={colors.mainOrange} />}
        color={colors.mainOrange}
        size={20}
        onPress={onPressAdd}
      />
      <AppText style={styles.descText}> fois </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 5,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: colors.mainOrange,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 2,
  },
  buttonText: {
    color: colors.mainWhite,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CounterAndShowButtons;
