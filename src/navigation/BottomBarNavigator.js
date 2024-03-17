import React from 'react';
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
import routes from '../navigation/routes';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => (
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
  </Tab.Navigator>
);

const BottomBarNavigator = () => (
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
);

export default BottomBarNavigator;
