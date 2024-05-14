import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import colors from '../../config/colors';

const LoadingPopup = ({visible}) => {
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.popup}>
          <ActivityIndicator size="large" color={colors.bl} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  popup: {
    backgroundColor: colors.mainWhite, // White background for the popup
    padding: 20,
    borderRadius: 10,
  },
});

export default LoadingPopup;
