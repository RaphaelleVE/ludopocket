import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import BarcodeScanner from '../../components/BarcodeScanner';
import {useQuery} from '@apollo/client';
import {GET_BOARD_GAME_BY_BARCODE} from '../../services/graphql/query/BoardGameQueries';

const ScanScreen = ({navigation}) => {
  const [scanning, setScanning] = useState(true);

  const handleBarcodeScanned = value => {
    console.log('Scanned code in ScanScreen:', value);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setScanning(true);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <BarcodeScanner
        onClose={() => navigation.goBack()}
        width={300}
        height={300}
        scanning={scanning}
        setScanning={setScanning}
        onBarcodeScanned={handleBarcodeScanned}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalView: {
    flexDirection: 'row',
  },
});

export default ScanScreen;
