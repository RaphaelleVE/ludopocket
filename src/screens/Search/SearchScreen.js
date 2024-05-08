import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import CustomSearchBar from '../../components/CustomSearchBar';
import routes from '../../navigation/routes';
import GameList from '../../components/GameList';
import mockedData from '../../data/mockedData';
import {useQuery} from '@apollo/client';
import {GET_ALL_BOARD_GAMES} from '../../services/graphql/query/BoardGameQueries';
import LoadingPopUp from '../../components/popup/LoadingPopUp';

function SearchScreen({navigation}) {
  const {data, loading, error} = useQuery(GET_ALL_BOARD_GAMES);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');

  /*async function fetchData() {
    try {
      const { data } = await client.query({ query: GET_ALL_BOARD_GAMES });
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);*/

  useEffect(() => {
    if (!loading && data && data.BOARD_GAME && data.BOARD_GAME.length > 0) {
      console.log('Name of the first item:', data.BOARD_GAME[0].name);
      setFilteredData(data.BOARD_GAME);
    }
  }, [data, loading]);

  if (loading) {
    console.log('loading ');
    return;
  }
  if (error) {
    return Alert.alert('Oops', error.message);
  }
  console.log('call ' + data.BOARD_GAME);

  const handleSearch = searchText => {
    console.log('on search: ' + searchText);
    setSearchTerm(searchText);
    const filteredGameData = data.BOARD_GAME.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredData(filteredGameData);

    for (let game in filteredData) {
      console.log('game:' + game.name);
    }
  };

  return (
    <Screen>
      <CustomSearchBar style={styles.searchBar} onSearchPress={handleSearch} />
      <GameList data={filteredData} />
      <LoadingPopUp visible={loading} />
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
