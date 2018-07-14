// @flow
import React, { Component } from 'react';
import {
  Platform,
  Text,
  View
} from 'react-native';
import CAColors from "../common/CAColors";
import CAStyleSheet from "../common/CAStyleSheet";

/* Constants
============================================================================= */
const STATUS_BAR_HEIGHT = 20;
const IOS_HEADER_HEIGHT = 90 + STATUS_BAR_HEIGHT;
const ANDROID_HEADER_HEIGHT = 50 + STATUS_BAR_HEIGHT;

/* =============================================================================
<CAHeader />
--------------------------------------------------------------------------------
View Header

============================================================================= */
class CAHeader extends Component<{}, {}> {

  static __cards__: Function

  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>ChatApp</Text>
      </View>
    )
  }
}

/* StyleSheet
============================================================================= */
const styles = CAStyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 15,
    ios: {
      paddingTop: IOS_HEADER_HEIGHT / 2,
      height: IOS_HEADER_HEIGHT,
      backgroundColor: CAColors.alabaster,
      borderBottomWidth: 1,
      borderBottomColor: CAColors.gallery,
    },
    android: {
      paddingTop: ANDROID_HEADER_HEIGHT / 2,
      height: ANDROID_HEADER_HEIGHT,
      backgroundColor: CAColors.riverBed,
    }
  },
  title: {
    color: CAColors.oxfordBlue,
    fontSize: 28,
    fontWeight: 'bold',
    android: {
      color: CAColors.white
    }
  }
});

/* Playground Cards
============================================================================= */
CAHeader.__cards__ = define => {
  define("Simple", () => <CAHeader />);
};


/* Export
============================================================================= */
export default CAHeader;
