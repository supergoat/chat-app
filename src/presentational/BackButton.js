// @flow
import React, { Component } from 'react';
import type { NavigationScreenProp } from 'react-navigation';
import {
  Image,
  TouchableOpacity
} from 'react-native';
import CAStyleSheet from "../common/CAStyleSheet";
import chevronLeft from '../assets/img/chevron_left.png';

/** ============================================================================
<BackButton
  navigation={object}
/>
--------------------------------------------------------------------------------
Button pressed to navigate viewer to the previous screen
@param { object } navigation - Navigation object to navigate the viewer
============================================================================= */
type Props = {
  navigation: NavigationScreenProp
};
class BackButton extends Component<Props> {
  static __cards__: Function

  render() {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.pop()}
        style={styles.back}
      >
        <Image source={chevronLeft} style={styles.backIcon} />
      </TouchableOpacity>
    )
  }
}

/* StyleSheet
============================================================================= */
const styles = CAStyleSheet.create({
  back: {
    paddingRight: 15
  },
  backIcon: {
    height: 20,
    width: 20,
  }
});

/* Playground Cards - the different states of BackButton
============================================================================= */
// BackButton.__cards__ = define => {
//   define("Simple", () => {
//     return <BackButton />
//   });
// };

/* Export
============================================================================= */
export default BackButton;
