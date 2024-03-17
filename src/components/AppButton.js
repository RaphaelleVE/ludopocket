import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../config/colors';

//base app button
function AppButton({
  title,
  onPress,
  color = 'mainBlue',
  textColor = 'mainWhite',
  styleParam,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, styleParam, {backgroundColor: colors[color]}]}
      onPress={onPress}>
      <Text style={[styles.text, {color: colors[textColor]}]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    width: '100%',
    marginVertical: 5,
  },
  text: {
    color: colors.mainWhite,
    textTransform: 'uppercase',
    fontSize: 20,
  },
});

export default AppButton;
