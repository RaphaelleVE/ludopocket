import React from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import colors from '../config/colors';

//component used as screen base
function Screen({children, style}) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: colors.whiteBackground,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
