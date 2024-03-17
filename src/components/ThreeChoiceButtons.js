import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import colors from '../config/colors';

function ThreeChoiceButtons({activeToggle, onPress}) {
  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          activeToggle === 'collection' && styles.activeToggle,
        ]}
        onPress={() => onPress('collection')}>
        <Text
          style={[
            styles.toggleButtonText,
            activeToggle === 'collection' && styles.activeToggleText,
          ]}>
          Collection
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.toggleButton,
          activeToggle === 'wishlist' && styles.activeToggle,
        ]}
        onPress={() => onPress('wishlist')}>
        <Text
          style={[
            styles.toggleButtonText,
            activeToggle === 'wishlist' && styles.activeToggleText,
          ]}>
          Wishlist
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.toggleButton,
          activeToggle === 'played' && styles.activeToggle,
        ]}
        onPress={() => onPress('played')}>
        <Text
          style={[
            styles.toggleButtonText,
            activeToggle === 'played' && styles.activeToggleText,
          ]}>
          Joués
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  toggleButton: {
    padding: 10,
  },
  toggleButtonText: {
    color: colors.mainOrange, // Couleur du texte non sélectionné
  },
  activeToggle: {
    borderRadius: 50,
    backgroundColor: colors.mainOrange,
  },
  activeToggleText: {
    color: 'white', // Couleur du texte lorsqu'il est sélectionné
  },
});

export default ThreeChoiceButtons;
