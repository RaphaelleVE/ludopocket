import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import BarcodeScanner from '../../components/BarcodeScanner';
import AppText from '../../components/AppText';
import {useLazyQuery} from '@apollo/client';
import {GET_BOARD_GAME_BY_BARCODE} from '../../services/graphql/query/BoardGameQueries';
import routes from '../../navigation/routes';
import WarningNoGamePopup from './WarningNoGamePopup';
import colors from '../../config/colors';

const ScanScreen = ({navigation}) => {
  const [scanning, setScanning] = useState(true);
  const [boardGameID, setBoardGameID] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [
    getBoardGameByBarcode,
    {data: boardGameData, loading: boardGameLoading, error: boardGameError},
  ] = useLazyQuery(GET_BOARD_GAME_BY_BARCODE, {
    onCompleted: data => {
      if (!data || !data.BOARD_GAME_by_pk) {
        setShowPopup(true);
      } else {
        console.log('Nom du jeu:', data.BOARD_GAME_by_pk.name);
        navigation.navigate('GameDetailScreen', {game: data.BOARD_GAME_by_pk});
      }
      //setBoardGameName(data.BOARD_GAME_by_pk.name);
    },
    onError: error => {
      console.error('Erreur lors de la récupération du jeu:', error);
      // Vous pouvez gérer les erreurs de requête ici
    },
  });

  const handleBarcodeScanned = async value => {
    console.log('Scanned code in ScanScreen:', value);
    if (value) {
      setBoardGameID(value);
      getBoardGameByBarcode({variables: {barcodeID: value}});
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setScanning(true);
    });

    return unsubscribe;
  }, [navigation]);

  const handleClosePopup = () => {
    setShowPopup(false);
    setScanning(true);
  };

  const handleAddGame = () => {
    setShowPopup(false);
    navigation.navigate(routes.ADDGAMESCREEN, {barcode: boardGameID});
  };

  const handleCloseScan = () => {
    setShowPopup(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <BarcodeScanner
        onClose={handleCloseScan}
        width={300}
        height={300}
        scanning={scanning}
        setScanning={setScanning}
        onBarcodeScanned={handleBarcodeScanned}
      />
      <AppText style={styles.hintText}>
          {'Scannez le code barre du jeu'}
        </AppText>
      {showPopup && (
        <View style={styles.popupContainer}>
          <WarningNoGamePopup
            onClose={handleClosePopup}
            onAdd={handleAddGame}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  hintText: {
    color: colors.mainWhite,
    fontStyle: 'italic',
  },
  popupContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
    zIndex: 1,
  },
});

export default ScanScreen;
