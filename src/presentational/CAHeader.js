// @flow
import React, { Component } from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import CAColors from "../common/CAColors";
import CAStyleSheet from "../common/CAStyleSheet";

/* Constants
============================================================================= */
const STATUS_BAR_HEIGHT = 20;
const IOS_HEADER_HEIGHT = 90 + STATUS_BAR_HEIGHT;
const ANDROID_HEADER_HEIGHT = 50 + STATUS_BAR_HEIGHT;

/** ============================================================================
<CAHeader
  [title]={string}
  [leftItem]={Component}
  [rightItem]={Component}
/>
--------------------------------------------------------------------------------
View Header
@param { string } title - The title of the header
@param { component } leftItem - The left item of the header
@param { component } rightItem - The right item of the header
============================================================================= */
type Props = {
  title: String,
  leftItem: Component,
  rightItem: Component
}
class CAHeader extends Component<Props> {

  static __cards__: Function
  static defaultProps = {
    title: 'ChatApp'
  }

  render() {
    const { title, leftItem, rightItem } = this.props;
    return (
      <View style={styles.header}>
        {leftItem && <View style={styles.leftItem}>{leftItem}</View>}
        {title && <Text style={styles.title}>{title}</Text>}
        {rightItem && <View style={styles.rightItem}>{rightItem}</View>}
      </View>
    )
  }
}

/* StyleSheet
============================================================================= */
const styles = CAStyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    zIndex: 1, // Removes the shadow header caused by react-navigation
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
    flex: 1, // Take remaining space
    color: CAColors.oxfordBlue,
    fontSize: 28,
    fontWeight: 'bold',
    android: {
      color: CAColors.white
    }
  },
  leftItem: {
    height: '100%',
    justifyContent: 'center'
  },
  rightItem: {
    height: '100%',
    justifyContent: 'center'
  }
});

/* Playground Cards
============================================================================= */
// CAHeader.__cards__ = define => {
//   define("Simple", () => <CAHeader />);
//
//   define("Left Item", () => <CAHeader
//     leftItem={
//       <View>
//         <Text>left item</Text>
//       </View>
//     }
//   />);
//
//   define("Right Item", () => <CAHeader
//     rightItem={
//       <View>
//         <Text>right item</Text>
//       </View>
//     }
//   />);
//
//   define("Left and Right Item", () => <CAHeader
//     leftItem={
//       <View>
//         <Text>left item</Text>
//       </View>
//     }
//     rightItem={
//       <View>
//         <Text>right item</Text>
//       </View>
//     }
//   />);
// };


/* Export
============================================================================= */
export default CAHeader;
