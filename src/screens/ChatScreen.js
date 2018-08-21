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
import Chat from '../presentational/Chat';
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

  /**
   * FIXME: iOS issue
   * @description Potential issue with loading more data, when the
   * viewer scrolls to the top and the api request fails.
   * @example
   *  Viewer scrolls to the top. onPullToRefresh is called. Api request fails.
   *  onEndReached in <Chat /> has already being called and will not be called
   *  again. Viewer has no way to load more data
   */

  constructor(props: Props) {
    super(props);

    this.state = {
      refreshing: false,
      messages: messages,
      totalMessages: 13
    };
  }

  // Loads more messages when the viewer pulls to refresh
  onPullToRefresh = () => {

    if (this.state.messages.length === this.state.totalMessages) return;

    const { refreshing, messages } = this.state;
    // Return early if already refreshing
    if (refreshing) return;

    this.setState({refreshing: true});

    const moreMessages = [
      { id: '5', text: 'Yeah, I have so much to tell you. Things have been crazy this past few months.', createdAt: new Date(), createdBy: 'Alex'},
      { id: '4', text: 'I am great! how are you? Long time no see. I miss you. We should definitely hang out', createdAt: new Date(), createdBy: 'Panayiotis'},
      { id: '3', text: 'Hey!', createdAt: new Date(), createdBy: 'Panayiotis'},
      { id: '2', text: 'How Are you?', createdAt: new Date(), createdBy: 'Alex'},
      { id: '1', text: 'Hey man', createdAt: new Date(), createdBy: 'Alex'},
    ]


    const copyMessages = messages.slice();
    const newMessages = copyMessages.concat(moreMessages);

    setTimeout(() => {
      this.setState({
        refreshing: false,
        messages: newMessages
      });
    }, 1500)

  }

  render() {
    const { refreshing, messages } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <CAHeader
          title={'ChatScreen'}
          leftItem={<BackButton navigation={navigation} />}
        />
        <Chat
          isFirstMessage={this.state.messages.length === this.state.totalMessages}
          refreshing={refreshing}
          onPullToRefresh={this.onPullToRefresh}
          messages={messages}
        />
        <MessageInput onSend={(message) => console.log(message)} />
      </View>
    );
  }
}

/* StyleSheet
============================================================================= */
const styles = CAStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CAColors.bone
  }
});

/* Export
============================================================================= */
export default ChatScreen;

const messages = [
  { id: '13', text: ':D', createdAt: new Date(), createdBy: 'Panayiotis'},
  { id: '12', text: ':)', createdAt: new Date(), createdBy: 'Alex'},
  { id: '11', text: 'See you!', createdAt: new Date(), createdBy: 'Alex'},
  { id: '10', text: 'Awesome see you then!', createdAt: new Date(), createdBy: 'Panayiotis'},
  { id: '9', text: 'Yeah, that should be fine, we can meet on Tuesday :)', createdAt: new Date(), createdBy: 'Alex'},
  { id: '8', text: 'How about next Tuesday? I have a lot of free time, we can go for lunch?', createdAt: new Date(), createdBy: 'Panayiotis'},
  { id: '7', text: 'Oh damn! I cant this friday =( I have a meeting till late', createdAt: new Date(), createdBy: 'Panayiotis'},
  { id: '6', text: 'I finish work early on friday! We can go grab a coffee if you can?', createdAt: new Date(), createdBy: 'Alex'},
]
