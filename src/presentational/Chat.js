// @flow
import React, { Component } from 'react';
import type { NavigationScreenProp } from 'react-navigation';
import CAStyleSheet from "../common/CAStyleSheet";
import CAColors from "../common/CAColors";
import ChatBubble from "../presentational/ChatBubble";
import InvertedFlatList from 'react-native-inverted-flat-list';

/* Constants
============================================================================= */
const SAME_USER_MARGIN_BOTTOM = 3;
const DIFFERENT_USER_MARGIN_BOTTOM = 12;

/** ============================================================================
<Chat
  [messages]={Array},
  onLoadMoreMessages={() => void},
  refreshing={boolean},
  viewer={string},
/>
--------------------------------------------------------------------------------
Displays the chat messages
@param { array } messages - The list of messages in the chat
@param { function } onLoadMoreMessages - Function called to load more messages
@param { boolean } refreshing - When true more messages are being fetched
@param { string } viewer - The currently logged in user
============================================================================= */
type Props = {
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

  /**
   * @description Calculates how much margin each chatBubble should have.
   *              ChatBubbles that belong to the same author have a smaller
   *              margin between them.
   * @param { object } message - The current message
   * @param { number } index - The current index
   *
   * @returns { numbers } The chat bubble margin
   */
  getMarginBottom = (message, index) => {
    const { messages } = this.props;
    const isFirstMessage = index === 0

    let marginBottom = DIFFERENT_USER_MARGIN_BOTTOM;

    if (!isFirstMessage) {
      const previousMessageAuthor = messages[index - 1].createdBy;
      const currentMessageAuthor = message.createdBy;
      const isSameAuthor = currentMessageAuthor === previousMessageAuthor;
      if (isSameAuthor) marginBottom = SAME_USER_MARGIN_BOTTOM;
    }
    return marginBottom;
  }

  render() {
    const {
      messages,
      onLoadMoreMessages,
      refreshing,
      viewer
    } = this.props;

    return (
      <InvertedFlatList
        style={styles.chat}
        refreshing={refreshing}
        data={messages}
        keyExtractor={item => item.id}
        onPullToRefresh={onLoadMoreMessages}
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
  }
});

/* Export
============================================================================= */
export default Chat;
