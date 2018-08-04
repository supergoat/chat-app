// @flow

import React, {Component} from 'react';
import {
  View,
  StatusBar
} from 'react-native';
import type { NavigationState } from 'react-navigation';
import Playground from './src/Playground';
import RootStack from './RootStack';
import CAHeader from './src/presentational/CAHeader';
import CAColors from './src/common/CAColors';
import CAStyleSheet from "./src/common/CAStyleSheet";

type Props = {};
export default class App extends Component<Props> {

  state = {
    shouldAnimateHeader: false
  }

  /**
   * @param { object } prevState - The previous navigator state
   */
  onNavigationStateChange = (prevState?: NavigationState, currentState?: NavigationState): void => {
    this.setState({
      shouldAnimateHeader: true
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={CAColors.oxfordBlue}
        />
        <RootStack onNavigationStateChange={this.onNavigationStateChange}  />
        {/* <Playground /> */}
      </View>
    );
  }
}

const styles = CAStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CAColors.white
  }
});
