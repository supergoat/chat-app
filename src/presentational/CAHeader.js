// @flow
import React, { Component } from 'react';
import {
  Platform,
  Text,
  View
} from 'react-native';
import CAColors from "../common/CAColors";
import CAStyleSheet from "../common/CAStyleSheet";

/* Config
============================================================================= */
let STATUS_BAR_HEIGHT = 20;

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
      paddingTop: (90 + STATUS_BAR_HEIGHT) / 2,
      height: 90 + STATUS_BAR_HEIGHT,
      backgroundColor: CAColors.gallery,
    },
    android: {
      paddingTop: (50 + STATUS_BAR_HEIGHT) / 2,
      height: 50 + STATUS_BAR_HEIGHT,
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
