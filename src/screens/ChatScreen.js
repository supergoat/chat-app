// @flow
import React, {Component} from 'react';
import BackButton from '../presentational/BackButton';
import type { NavigationScreenProp } from 'react-navigation';
import {
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import CAHeader from '../presentational/CAHeader';
import MessageInput from '../presentational/MessageInput';
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <CAHeader
            title={'ChatScreen'}
            leftItem={<BackButton navigation={navigation} />}
          />
          <Text style={{flex: 1}}>ChatScreen</Text>
          <MessageInput onSend={(message) => console.log(message)} />
        </View>
      </TouchableWithoutFeedback>
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
