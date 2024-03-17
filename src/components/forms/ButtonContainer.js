import React from 'react';
import {StyleSheet, View} from 'react-native';

function ButtonContainer({children}) {
  return <View style={styles.container}>{children}</View>;
}

export default ButtonContainer;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
});
