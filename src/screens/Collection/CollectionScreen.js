import React, {useState} from 'react';
import {View} from 'react-native';
import Screen from '../../components/Screen';
import CustomSearchBar from '../../components/CustomSearchBar';
import ThreeChoiceButtons from '../../components/ThreeChoiceButtons';
import GameList from '../../components/GameList';
import routes from '../../navigation/routes';
import colors from '../../config/colors';
import mockedData from '../../data/mockedData';

function CollectionScreen({navigation}) {
  const [activeToggle, setActiveToggle] = useState('collection');
  const handleTogglePress = toggle => {
    setActiveToggle(toggle);
  };
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
    </Screen>
  );
}

export default CollectionScreen;
