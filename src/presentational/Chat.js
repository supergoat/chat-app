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

/* Constants
============================================================================= */
const SAME_USER_MARGIN_BOTTOM = 3;
const DIFFERENT_USER_MARGIN_BOTTOM = 12;
const REFRESH_OFFSET = 20;

/** ============================================================================
<Chat
  didLoadAllMessages={boolean}
  [messages]={Array},
  onLoadMoreMessages={() => void},
  refreshing={boolean},
  viewer={string},
/>
--------------------------------------------------------------------------------
Displays the chat messages
@param { boolean } didLoadAllMessages - True if all messages have been loaded
@param { array } messages - The list of messages in the chat
@param { function } onLoadMoreMessages - Function called to load more messages
@param { boolean } refreshing - When true more messages are being fetched
@param { string } viewer - The currently logged in user
============================================================================= */
type Props = {
  didLoadAllMessages: boolean,
  messages: {
    id: string,
    text: string,
    createdAt: Date,
    createdBy: string
  }[],
  onLoadMoreMessages: () => void,
  refreshing: boolean,
  viewer: string
};
class Chat extends Component<Props> {

  static __cards__: Function

  /**
   * @description Returns a boolean if the viewer scrolled to the top
   * @param { object } nativeEvent - The scroll Event
   *
   * @returns { boolean } True if the viewer is close to the top
   */
  isCloseToTop = ({layoutMeasurement, contentOffset, contentSize}) => {
    // The offset from the top, before we should load more messages
    const paddingToTop = REFRESH_OFFSET;

    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToTop;
  };

  /**
   * @description Calculates how much margin each chatBubble should have.
   *              ChatBubbles that belong to the same author have a smaller
   *              margin between them.
   * @param { object } items - The current chat bubble
   * @param { number } index - The current index
   *
   * @returns { numbers } The chat bubble margin
   */
  getMarginBottom = (item, index) => {
    const { messages } = this.props;
    const isFirstMessage = index === 0

    let marginBottom = DIFFERENT_USER_MARGIN_BOTTOM;

    if (!isFirstMessage) {
      const previousChatBubbleAuthor = messages[index - 1].createdBy;
      const currentChatBubbleAuthor = item.createdBy;
      const isSameAuthor = currentChatBubbleAuthor === previousChatBubbleAuthor;
      if (isSameAuthor) marginBottom = SAME_USER_MARGIN_BOTTOM;
    }
    return marginBottom;
  }

  onScroll = ({nativeEvent}) => {
    const { onLoadMoreMessages, didLoadAllMessages } = this.props;

    // Return if viewer didn't scroll to top
    if (!this.isCloseToTop(nativeEvent)) return;

    if (!didLoadAllMessages) onLoadMoreMessages();;
  }

  render() {
    const {
      didLoadAllMessages,
      messages,
      refreshing,
      viewer
    } = this.props;

    return (
      <FlatList
        inverted
        style={styles.chat}
        data={messages}
        keyExtractor={item => item.id}
        onScroll={this.onScroll}
        ListFooterComponent={() => (
          <View style={styles.activityIndicator}>
            {!didLoadAllMessages &&
              <ActivityIndicator animating={refreshing} />}
          </View>
        )}
        renderItem={({ item, index }) => (
          <ChatBubble
            style={{ marginBottom: this.getMarginBottom(item, index) }}
            isAlignedLeft={item.createdBy !== viewer}
            key={item.id}
            message={item}
          />
        )}
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
