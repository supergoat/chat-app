// @flow
import React, { Component } from 'react';
import type { NavigationScreenProp } from 'react-navigation';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View
} from 'react-native';
import CAStyleSheet from "../common/CAStyleSheet";
import CAColors from "../common/CAColors";
import ChatBubble from "../presentational/ChatBubble";

/** ============================================================================
<Chat
  [messages]={Array}
/>
--------------------------------------------------------------------------------
Displays the chat messages
@param { array } messages - The list of messages in the chat
@property { boolean } refreshing - When true more messages are being fetched
============================================================================= */
type Props = {
  messages: {
    id: string,
    text: string,
    createdAt: Date,
    createdBy: string
  }[]
};
class Chat extends Component<Props> {

  // TODO: Replace 'Panayiotis' in ChatBubble with the currentUser
  static __cards__: Function

  isCloseToTop = ({layoutMeasurement, contentOffset, contentSize}) => {

    const paddingToTop = 20;

    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToTop;
  };

  render() {
    const { messages, refreshing, onPullToRefresh } = this.props;

    return (
      <FlatList
        inverted
        style={styles.chat}
        data={messages}
        keyExtractor={item => item.id}
        onScroll={({nativeEvent}) => {
          if (!this.isCloseToTop(nativeEvent)) return;
          onPullToRefresh();
        }}
        ListFooterComponent={() => (
          <View style={styles.activityIndicator}>
            {!this.props.isFirstMessage && <ActivityIndicator animating={refreshing} />}
          </View>
        )}
        renderItem={({ item, index }) => {
          const lastMessage = index === 0

          let marginBottom = 12
          if (!lastMessage) {
            const isSameUser = item.createdBy === messages[index - 1].createdBy
            if (isSameUser) marginBottom = 3
          }

          return (
            <ChatBubble
              style={{ marginBottom }}
              isAlignedLeft={item.createdBy !== 'Panayiotis'}
              key={item.id}
              message={item}
            />
          )
        }}
      />
    )
  }
}

/* StyleSheet
============================================================================= */
const styles = CAStyleSheet.create({
  chat: {
    flex: 1
  },
  activityIndicator: {
    paddingVertical: 7.5
  }
});

/* Playground Cards - the different states of Chat
============================================================================= */
// Chat.__cards__ = define => {
//   define("Simple", () => {
//     return <Chat />
//   });
// };

/* Export
============================================================================= */
export default Chat;
