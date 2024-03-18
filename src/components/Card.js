import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {SearchBar} from '@rneui/themed';

import colors from '../config/colors';
import AppButton from '../components/AppButton';
import AppText from './AppText';
import routes from '../navigation/routes';
import Icon from 'react-native-vector-icons/FontAwesome';

//component for chopping list
function Card({onPress, image, subTitle, title, id}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={image} />
        <View style={styles.detailContainer}>
          <Text style={styles.text}>{title}</Text>
          <Icon
            name="chevron-right"
            size={15}
            color={colors.mainOrange}
            style={styles.arrow}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    overflow: 'hidden',
  },
  detailContainer: {
    flexDirection: 'row',
    borderBottomColor: colors.mainOrange,
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  text: {
    maxWidth: 200,
    minWidth: 200,
    fontFamily: 'Marhey',
    margin: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
    resizeMode: 'contain',
    backgroundColor: colors.mainCream,
  },
  arrow: {
    marginEnd: 10,
  },
});
export default Card;
