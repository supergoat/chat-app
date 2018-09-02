// @flow
import React, { Component } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import CAColors from "../common/CAColors";
import CAStyleSheet from "../common/CAStyleSheet";
import { isIphoneX } from '../common/CAHelpers';
import sendMessageIcon from '../assets/img/send_message.png';

/* Constants
============================================================================= */
const INPUT_HEIGHT_ANDROID = 42;
const INPUT_HEIGHT_IOS = 35;
const IPHONE_X_FOOTER_HEIGHT_ADJUSTMENT = 30;

/** ============================================================================
<MessageInput
  onSend={(string) => void}
/>
--------------------------------------------------------------------------------
Enables the viewer to type and send a message
@param { function } onSendMessage - Function called when viewer sends message
@property { string } message - The message being send
============================================================================= */
type Props = { onSend: (string) => void }
type State = { message: string }
class MessageInput extends Component<Props, State> {

  // TODO: remove padding bottom for iphone X when keyboard is open
  static __cards__: Function

  constructor() {
    super();
    this.state = { message: '' };
  }

  onSendMessage = () => {
    const { onSend } = this.props;
    const { message } = this.state;

    const trimmedMessage = message.trim();

    // Return if message is empty
    if (trimmedMessage.length === 0) return;

    // Clear the text input
    this.setState({ message: '' });

    // call the send
    onSend(trimmedMessage);
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'default'}
        enabled
      >
        <View style={[
          styles.messageInput,
          { paddingBottom: isIphoneX() ? IPHONE_X_FOOTER_HEIGHT_ADJUSTMENT : 0 }
        ]}>
          <TextInput
            multiline
            maxHeight={100}
            placeholder='Type a message'
            value={this.state.message}
            onChangeText={message => this.setState({ message })}
            style={styles.textInput}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.sendMessage}
            onPress={this.onSendMessage}
          >
            <Image style={styles.sendMessageIcon} source={sendMessageIcon} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

/* StyleSheet
============================================================================= */
const styles = CAStyleSheet.create({
  container: {
    ios: {
      backgroundColor: CAColors.alabaster,
      borderTopWidth: 1,
      borderTopColor: CAColors.gallery,
    }
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
    android: {
      marginTop: 0
    }
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 15,
    backgroundColor: CAColors.white,
    fontSize: 16,
    ios: {
      borderWidth: 1.5,
      borderRadius: INPUT_HEIGHT_IOS / 2,
      borderColor: CAColors.gallery,
      minHeight: INPUT_HEIGHT_IOS
    },
    android: {
      borderRadius: INPUT_HEIGHT_ANDROID / 2,
      minHeight: INPUT_HEIGHT_ANDROID,
      elevation: 0.5
    }
  },
  sendMessage: {
    aspectRatio: 1,
    ios: {
      width: INPUT_HEIGHT_IOS,
      borderRadius: INPUT_HEIGHT_IOS / 2,
      padding: 10,
      backgroundColor: CAColors.mariner,
    },
    android: {
      padding: 12,
      width: INPUT_HEIGHT_ANDROID,
      borderRadius: INPUT_HEIGHT_ANDROID / 2,
      backgroundColor: CAColors.riverBed,
      elevation: 1
    }
  },
  sendMessageIcon: {
    width: '100%',
    height: '100%'
  }
});

/* Playground Cards - the different states of MessageInput
============================================================================= */
// MessageInput.__cards__ = define => {
//   define("Simple", () => <MessageInput />);
// };


/* Export
============================================================================= */
export default MessageInput;
