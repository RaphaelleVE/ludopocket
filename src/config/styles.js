import {Platform} from 'react-native';

import colors from './colors';

export default {
  colors,
  defText: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
  squareImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
    resizeMode: 'contain',
    backgroundColor: colors.mainCream,
  },
};
