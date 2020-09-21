/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  StatusBar,
  View
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from './navigation';
import { FlashMessage } from './helper';
import config from '@config';

const styles = StyleSheet.create({
  container: {
    backgroundColor: config.colors.background,
    flex: 1
  }
})

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={styles.container}>
        <RootStackScreen />
      </View>
      {
        <FlashMessage
          // @ts-ignore
          icon="auto"
          titleProps={{ numberOfLines: 5 }}
        />
      }
    </NavigationContainer>


  );
};

export default App;
