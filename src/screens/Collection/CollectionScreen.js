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
import mockedData from '../../data/mockedData';

function CollectionScreen({navigation}) {
  const [activeToggle, setActiveToggle] = useState('collection');
  const [data, setData] = useState(mockedData);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    filterGameData(activeToggle, searchTerm);
  }, []); // Empty dependency array means this effect runs once when component mounts

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
    let filtered = mockedData.filter(item => {
      let matchesCategory = true;
      if (toggle === 'collection') {
        matchesCategory = item.owned === true;
      } else if (toggle === 'wishlist') {
        matchesCategory = item.wishlist === true;
      } else if (toggle === 'played') {
        matchesCategory = item.played === true;
      }

      let matchesSearch = true;
      if (searchText !== '') {
        matchesSearch = item.title
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
          onPress={() => navigation.navigate(routes.ADDGAMESCREEN)}
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
