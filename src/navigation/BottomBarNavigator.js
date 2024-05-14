import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView, StatusBar, Platform} from 'react-native';
import TopAppBar from './TopAppBarNavigator';
import CollectionScreen from '../screens/Collection/CollectionScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import GameDetailScreen from '../screens/GameDetail/GameDetailScreen';
import AddGameScreen from '../screens/AddGame/AddGameScreen';
import ScanScreen from '../screens/Scan/ScanScreen';
import {UserProvider, useUser, updateUser} from '../data/contexts/UserContext';
import {useUserData} from '@nhost/react';
import {
  RegisteredGameProvider,
  updateRegisteredGames,
  useRegisteredGamesData,
} from '../data/contexts/RegisteredGameContext';
import {useQuery} from '@apollo/client';
import {GET_ALL_REGISTERED_BOARD_GAMES} from '../services/graphql/query/RegisteredGameQueries';
import LoadingPopup from '../components/popup/LoadingPopUp';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const userAuthData = useUserData();
  const {setUserData} = useUser();
  const {loading, error, data} = useQuery(GET_ALL_REGISTERED_BOARD_GAMES, {
    variables: {
      userID: userAuthData ? userAuthData.id : null,
    },
    skip: !userAuthData,
  });
  const {setRegisteredGamesData} = useRegisteredGamesData();

  useEffect(() => {
    updateUser(userAuthData, setUserData);
  }, [userAuthData, setUserData]);

  useEffect(() => {
    console.log('useeffect');
    if (data) {
      data.REGISTERED_GAME.forEach(registeredGame => {
        console.log('Nom du jeu enregistré : ', registeredGame.BOARD_GAME.name);
      });
      updateRegisteredGames(data.REGISTERED_GAME, setRegisteredGamesData);
    }
  }, [data, setRegisteredGamesData]);

  if (loading) {
    return <LoadingPopup />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.mainBlue,
        },
        tabBarActiveTintColor: colors.mainOrange,
        tabBarInactiveTintColor: colors.mainCream,
      }}>
      <Tab.Screen
        name="Collection"
        component={CollectionScreen}
        options={{
          title: 'Ma Collection',
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="remove"
              color={focused ? colors.mainOrange : colors.mainCream}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Recherche"
        component={SearchScreen}
        options={{
          title: 'Rechercher',
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="search"
              color={focused ? colors.mainOrange : colors.mainCream}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="user"
              color={focused ? colors.mainOrange : colors.mainCream}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="GameDetailScreen"
        component={GameDetailScreen}
        options={{
          title: 'Détails du Jeu',
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="gamepad"
              color={focused ? colors.mainOrange : colors.mainCream}
              size={size}
            />
          ),
          tabBarButton: () => null, // Cela masquera l'onglet GameDetailScreen dans la barre inférieure
        }}
      />
      <Tab.Screen
        name="AddGameScreen"
        component={AddGameScreen}
        options={{
          title: 'Détails du Jeu',
          tabBarIcon: ({focused, size}) => (
            <Icon
              name="gamepad"
              color={focused ? colors.mainOrange : colors.mainCream}
              size={size}
            />
          ),
          tabBarButton: () => null, // Cela masquera l'onglet GameDetailScreen dans la barre inférieure
        }}
      />
      <Tab.Screen
        name="ScanScreen"
        component={ScanScreen}
        options={{
          tabBarButton: () => null, // Cela masquera l'onglet GameDetailScreen dans la barre inférieure
        }}
      />
    </Tab.Navigator>
  );
};

function BottomBarNavigator() {
  return (
    <UserProvider>
      <RegisteredGameProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{
              header: () => (
                <SafeAreaView
                  style={{
                    paddingTop:
                      Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                  }}>
                  <TopAppBar title="Ludopocket" />
                </SafeAreaView>
              ),
            }}
          />
        </Stack.Navigator>
      </RegisteredGameProvider>
    </UserProvider>
  );
}

export default BottomBarNavigator;
