// @flow

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import CAColors from './src/common/CAColors';
import Playground from './src/Playground';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Playground />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CAColors.alabaster
  },
});
