/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigationParamList } from './types/navigation.types';
import HomeScreen from './screens/HomeScreen';
import CurrencyListScreen from './screens/CurrencyListScreen';
import ChartScreen from './screens/ChartScreen';


const RootStack = createNativeStackNavigator<RootNavigationParamList>() 

function App(): JSX.Element { 

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        <NavigationContainer theme={DefaultTheme}>
          <RootStack.Navigator initialRouteName='Home'>
            <RootStack.Screen  name='Home' component={HomeScreen}  />
            <RootStack.Screen  name='CurrencyList' component={CurrencyListScreen}  />
            <RootStack.Screen  name='Chart' component={ChartScreen}  />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});

export default App;
