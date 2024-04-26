import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Card from './Card';
import {useNavigation} from '@react-navigation/native';

const GameList = ({data, onGamePress}) => {
  const navigation = useNavigation();
  const handleGamePress = item => {
    // Utiliser la navigation pour aller vers GameDetailScreen avec l'item
    navigation.navigate('GameDetailScreen', {
      game: item,
    });
  };

  return (
    <FlatList
      style={styles.screen}
      data={data}
      keyExtractor={item => item.barcodeID.toString()}
      renderItem={({item}) => (
        <Card
          title={item.name}
          image={item.image}
          id={item.barcodeID}
          onPress={() => handleGamePress(item)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginVertical: 10,
  },
});

export default GameList;
