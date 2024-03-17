import * as React from 'react';
import {SearchBar} from '@rneui/themed';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';

function CustomSearchBAr({onPress}) {
  const [value, setValue] = React.useState('');

  const clearSearch = () => {
    console.log('CLEAR SEARCH'); //ERROR: not called when `onClearText`
    setValue('');
  };

  return (
    <SearchBar
      platform="default"
      containerStyle={styles.searchcontainer}
      inputContainerStyle={{backgroundColor: colors.mainWhite}}
      cancelIcon={() => <Icon name="remove" color={colors.mainOrange} />}
      clearIcon={() => <Icon name="remove" color={colors.mainOrange} />}
      searchIcon={() => <Icon name="search" color={colors.mainOrange} />}
      inputStyle={{}}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
      loadingProps={{}}
      onChangeText={newVal => setValue(newVal)}
      onClear={() => clearSearch}
      onCancel={() => clearSearch}
      placeholder="Rechercher"
      placeholderTextColor="#FFFEF7"
      round
      showCancel
      cancelButtonTitle="Cancel"
      cancelButtonProps={{}}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  searchcontainer: {
    backgroundColor: null,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
});

export default CustomSearchBAr;
