import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {IconButton} from 'react-native-paper';
import AppText from './AppText';
import colors from '../config/colors';

function ThreeSelectableButtons({
  possessionSelected,
  playedSelected,
  favoriteSelected,
  handlePossessionPress,
  handlePlayedPress,
  handleFavoritePress,
}) {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={[
          styles.button,
          possessionSelected && {backgroundColor: colors.mainOrange},
        ]}
        onPress={handlePossessionPress}>
        <AppText
          style={{
            color: possessionSelected ? 'white' : colors.mainOrange,
            fontSize: 12,
          }}>
          Possédé
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          playedSelected && {backgroundColor: colors.mainOrange},
        ]}
        onPress={handlePlayedPress}>
        <AppText
          style={{
            color: playedSelected ? 'white' : colors.mainOrange,
            fontSize: 12,
          }}>
          Joué
        </AppText>
      </TouchableOpacity>
      <IconButton
        icon={() => (
          <Icon
            name="heart"
            color={favoriteSelected ? 'white' : colors.mainOrange}
          />
        )}
        iconColor={favoriteSelected ? 'white' : colors.mainOrange}
        mode="outlined"
        size={15}
        onPress={handleFavoritePress}
        style={[
          styles.favoriteButton,
          favoriteSelected && {backgroundColor: colors.mainOrange},
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.mainOrange,
  },
  favoriteButton: {
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderColor: colors.mainOrange,
  },
});

export default ThreeSelectableButtons;
