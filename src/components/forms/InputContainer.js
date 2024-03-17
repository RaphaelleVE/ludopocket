import React from 'react';
import {StyleSheet, View} from 'react-native';

function InputContainer({children}) {
  return <View style={styles.container}>{children}</View>;
}

export default InputContainer;

const styles = StyleSheet.create({
  container: {
    width: '80%',
  },
});
