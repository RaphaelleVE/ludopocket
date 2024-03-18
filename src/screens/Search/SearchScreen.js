import React, {useState} from 'react';
import {StyleSheet, FlatList, Image, ImageBackground} from 'react-native';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import CustomSearchBar from '../../components/CustomSearchBar';
import routes from '../../navigation/routes';
import GameList from '../../components/GameList';
import mockedData from '../../data/mockedData';

function SearchScreen({navigation}) {
  const [data, setData] = useState(mockedData);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = searchText => {
    console.log('on search: ' + searchText);
    setSearchTerm(searchText);
    setFilteredData(
      mockedData.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
    setData(filteredData);
    for (let game in filteredData) {
      console.log('game:' + filteredData.title);
    }
  };

  return (
    <Screen>
      <CustomSearchBar style={styles.searchBar} onSearchPress={handleSearch} />
      <GameList data={filteredData} />
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
