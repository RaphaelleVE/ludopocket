import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Screen from '../../components/Screen';
import CustomSearchBar from '../../components/CustomSearchBar';
import ThreeChoiceButtons from '../../components/ThreeChoiceButtons';
import GameList from '../../components/GameList';
import routes from '../../navigation/routes';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../config/colors';
import {useRegisteredGamesData} from '../../data/contexts/RegisteredGameContext';

function CollectionScreen({navigation}) {
  const {RegisteredGamesData} = useRegisteredGamesData();
  const [activeToggle, setActiveToggle] = useState('collection');
 //const [data, setData] = useState(RegisteredGamesData);
  const [filteredData, setFilteredData] = useState(RegisteredGamesData);
  const [searchTerm, setSearchTerm] = useState('');

  /*useEffect(() => {
    if (RegisteredGamesData) {
      setData(RegisteredGamesData);
      setFilteredData(RegisteredGamesData);
      console.log('jeu enregistré ' + RegisteredGamesData);
    }
  }, [RegisteredGamesData]);*/

  useEffect(() => {
    if (RegisteredGamesData) {
      filterGameData(activeToggle, searchTerm);
    }
    console.log('setup filter ');
  }, [RegisteredGamesData]);

  const handleTogglePress = toggle => {
    setActiveToggle(toggle);
    console.log(toggle);
    filterGameData(toggle, searchTerm);
  };

  const handleSearch = searchText => {
    console.log('on search: ' + searchText);
    setSearchTerm(searchText);
    filterGameData(activeToggle, searchText);
  };

  const filterGameData = (toggle, searchText) => {
    let filtered = RegisteredGamesData.filter(item => {
      console.log(item.isOwned);
      let matchesCategory = true;
      if (toggle === 'collection') {
        matchesCategory = item.isOwned === true;
      } else if (toggle === 'wishlist') {
        matchesCategory = item.isWished === true;
      } else if (toggle === 'played') {
        matchesCategory = item.isPlayed === true;
      }

      let matchesSearch = true;
      if (searchText !== '') {
        matchesSearch = item.BOARD_GAME.name
          .toLowerCase()
          .includes(searchText.toLowerCase());
      }

      return matchesCategory && matchesSearch;
    });
    setFilteredData(filtered);
  };

  return (
    <Screen>
      <ThreeChoiceButtons
        activeToggle={activeToggle}
        onPress={handleTogglePress}
      />
      <View
        style={{
          margin: 10,
          flexDirection: 'row',
          borderBottomColor: colors.mainOrange,
          borderBottomWidth: 2,
          alignItems: 'center',
        }}
      />
      <CustomSearchBar style={{}} onSearchPress={handleSearch} />
      <GameList data={filteredData} />
      <View style={styles.addButton}>
        <IconButton
          icon={() => <Icon name="plus" color={colors.mainWhite} size={18} />}
          mode="contained"
          containerColor={colors.mainOrange}
          onPress={() => navigation.navigate(routes.SCANSCREEN)}
          size={30}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  addButton: {
    alignSelf: 'flex-end',
    margin: 10,
    elevation: 10,
  },
  searchBar: {
    width: '500',
    margin: 10,
  },
});
export default CollectionScreen;
