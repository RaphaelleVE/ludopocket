/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import { nhostClient } from './src/services/nhostSDK/nhostInit'	
import { NhostApolloProvider } from "@nhost/react-apollo";
import { NhostProvider } from "@nhost/react";


function App(): React.JSX.Element {
  console.log(nhostClient);
  return (
    <NavigationContainer>
      <NhostProvider nhost={nhostClient}>
      <NhostApolloProvider nhost={nhostClient}>
        <AppNavigator />
      </NhostApolloProvider>
        </NhostProvider>
    </NavigationContainer>
  );
}
export default App;
