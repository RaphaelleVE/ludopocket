import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importer FontAwesome depuis react-native-vector-icons
import colors from '../../config/colors';

const WarningNoGamePopup = ({onClose, onAdd}) => {
  return (
    <View style={styles.container}>
      <Icon
        name="exclamation-triangle"
        size={24}
        color={colors.mainOrange}
        style={styles.icon}
      />

      <Text style={styles.message}>
        Le jeu scanné n'existe pas ! {'\n'} Veux-tu l'ajouter ?
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, {flex: 1}]} onPress={onClose}>
          <Text style={styles.buttonText}>Non</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {flex: 1}]} onPress={onAdd}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
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
    textAlign: 'center', // Centrer le texte dans le bouton
  },
});

export default WarningNoGamePopup;
