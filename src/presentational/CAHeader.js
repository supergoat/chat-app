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
if (Platform.OS === "android" && Platform.Version && Platform.Version < 21) {
  STATUS_BAR_HEIGHT = 0;
}
const HEADER_HEIGHT = 90 + STATUS_BAR_HEIGHT;

/* =============================================================================
<CAHeader />
--------------------------------------------------------------------------------
View Header

============================================================================= */
class CAHeader extends Component<{}, {}> {

  static __cards__: (Function) => void

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
    backgroundColor: CAColors.gallery,
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 15,
    paddingTop: HEADER_HEIGHT / 2
  },
  title: {
    color: CAColors.oxfordBlue,
    fontSize: 28,
    fontWeight: 'bold'
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
