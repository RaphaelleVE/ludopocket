import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  useCameraDevice,
  useCodeScanner,
  Camera,
} from 'react-native-vision-camera';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../config/colors';

const BarcodeScanner = props => {
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back');
  const [barcodes, setBarcodes] = useState([]);
  const {scanning, onBarcodeScanned} = props;

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13'],
    onCodeScanned: codes => {
      if (scanning) {
        const scannedValue = codes[0]?.value;
        if (scannedValue) {
          // console.log('Scanned code:', scannedValue);
          onBarcodeScanned(scannedValue);
        }
        setBarcodes(codes);
        props.setScanning(false);
      }
    },
  });

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status !== 'denied');
    })();
  }, []);

  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFillObject}
          device={device}
          isActive={scanning}
          codeScanner={codeScanner}
          enableZoomGesture={true}
        />
        <View style={styles.closeButton}>
          <IconButton
            icon={() => <Icon name="arrow-left" color={colors.mainWhite} />}
            size={30}
            onPress={props.onClose}
            mode="contained"
            containerColor={colors.mainOrange}
          />
        </View>
        <View
          style={{
            width: props.width ?? 300,
            height: props.height ?? 300,
            backgroundColor: 'transparent',
            borderColor: 'white',
            borderWidth: 2,
          }}
        />
      </>
    )
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
  },
  horizontalView: {
    flexDirection: 'row',
  },
});

export default BarcodeScanner;
