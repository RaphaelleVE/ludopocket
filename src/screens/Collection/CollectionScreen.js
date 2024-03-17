import React, {useState} from 'react';
import {View} from 'react-native';
import Screen from '../../components/Screen';
import CustomSearchBar from '../../components/CustomSearchBar';
import ThreeChoiceButtons from '../../components/ThreeChoiceButtons';
import GameList from '../../components/GameList';
import routes from '../../navigation/routes';
import colors from '../../config/colors';

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

function CollectionScreen({navigation}) {
  const [activeToggle, setActiveToggle] = useState('collection');
  const handleTogglePress = toggle => {
    setActiveToggle(toggle);
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
      <CustomSearchBar style={{}} onPress={() => console.log('oo')} />
      <GameList data={mockedData} />
    </Screen>
  );
}

export default CollectionScreen;
