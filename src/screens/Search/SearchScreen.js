import React, {useState} from 'react';
import {StyleSheet, FlatList, Image, ImageBackground} from 'react-native';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import CustomSearchBar from '../../components/CustomSearchBar';
import routes from '../../navigation/routes';
import GameList from '../../components/GameList';

const mockedData = [
  {
    id: 1,
    title: 'Monopoly',
    description: 'eihbaeribhaer',
    image: require('../../assets/monopoly.jpg'),
  },
  {
    id: 2,
    title: 'Bonne paye',
    description: 'qffl fvhevfhjfvhj',
    image: require('../../assets/bonnePaye.jpeg'),
  },
];

function searchGameByName() {
  console.log('je cherche');
}

function SearchScreen({navigation}) {
  const [data, setData] = useState(/* Votre liste de données initiale */);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = searchText => {
    // Mettez à jour le terme de recherche
    setSearchTerm(searchText);

    // Filtrer la liste en fonction du terme de recherche
    const filteredData = data.filter(item =>
      item.nom.toLowerCase().includes(searchText.toLowerCase()),
    );

    // Mettez à jour les données filtrées
    setData(filteredData);
  };

  const handleGamePress = item => {
    navigation.navigate(routes.PRODUCTDETAILSCREEN, {product: item});
  };

  return (
    <Screen>
      <CustomSearchBar
        style={styles.searchBar}
        onPress={() => console.log('oo')}
      />
      <GameList data={mockedData} onPress={handleGamePress} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  searchBar: {
    width: '500',
    margin: 10,
  },
});

export default SearchScreen;
