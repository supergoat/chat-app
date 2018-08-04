// @flow
import React, {Component} from 'react';
import BackButton from '../presentational/BackButton';
import type { NavigationScreenProp } from 'react-navigation';
import {
  Text,
  View
} from 'react-native';
import CAHeader from '../presentational/CAHeader';
import CAColors from '../common/CAColors';
import CAStyleSheet from "../common/CAStyleSheet";

/** ============================================================================
<ChatScreen />
--------------------------------------------------------------------------------
The chat screen
@param { object } navigation - Navigation object to navigate the viewer
============================================================================= */
type Props = {
  navigation: NavigationScreenProp
};
class ChatScreen extends Component<Props> {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <CAHeader
          title={'ChatScreen'}
          leftItem={<BackButton navigation={navigation} />}
        />
        <Text>ChatScreen</Text>
      </View>
    );
  }
}

/* StyleSheet
============================================================================= */
const styles = CAStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CAColors.white
  }
});

/* Export
============================================================================= */
export default ChatScreen;
