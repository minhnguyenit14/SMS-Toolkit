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
  View,
  Text
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from './navigation';
import { FlashMessage } from './helper';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
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
          position="bottom"
          titleProps={{ numberOfLines: 5 }}
        />
      }
    </NavigationContainer>


  );
};

export default App;
