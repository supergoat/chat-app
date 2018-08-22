// @flow
import React, { Component } from 'react';
import type { NavigationScreenProp } from 'react-navigation';
import {
  Text,
  View
} from 'react-native';
import CAStyleSheet from "../common/CAStyleSheet";
import CAColors from "../common/CAColors";
import { formatTime } from '../common/CAHelpers';


/** ============================================================================
<ChatBubble />
--------------------------------------------------------------------------------
Displays a message
============================================================================= */
type Props = {
  isAlignedLeft: boolean,
  message: {
    id: string,
    text: string,
    createdAt: Date,
    createdBy: string
  }
};
class ChatBubble extends Component<Props> {
  static __cards__: Function

  render() {
    const { message, isAlignedLeft } = this.props;
    return (
      <View style={[
        styles.messageCard,
        { backgroundColor: isAlignedLeft ? CAColors.alabaster : CAColors.orinoco },
        { alignSelf: isAlignedLeft ? 'flex-start': 'flex-end' },
        this.props.style
      ]}>
        <Text style={styles.text}>
          {message.text}
          {/* HACK:  Add this to position the timeStamp correctly */}
          <Text style={styles.hide}>{'xxxxxx'}</Text>
        </Text>
        <Text style={styles.timeStamp}>{formatTime(message.createdAt)}</Text>
      </View>
    )
  }
}

/* StyleSheet
============================================================================= */
const styles = CAStyleSheet.create({
  messageCard: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginBottom: 3,
    marginHorizontal: 20,
    borderRadius: 6,
    maxWidth: '78%',
    ios: {
      shadowColor: CAColors.osloGrey,
      shadowOffset: {
        width: 0,
        height: 0.5
      },
      shadowOpacity: 1,
      shadowRadius: 0,
    },
    android: {
      elevation: 1
    }
  },
  text: {
    lineHeight: 19,
    fontSize: 15,
    color: CAColors.black
  },
  hide: {
    opacity: 0,
    color: 'transparent'
  },
  timeStamp: {
    position: 'absolute',
    right: 8,
    bottom: 3,
    color: CAColors.osloGrey,
    fontSize: 11
  }
});

/* Playground Cards - the different states of ChatBubble
============================================================================= */
// ChatBubble.__cards__ = define => {
//   define("Simple", () => {
//     return <ChatBubble />
//   });
// };

/* Export
============================================================================= */
export default ChatBubble;
