// @flow
import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import ProfilePhoto from './ProfilePhoto';
import TimeStamp from './TimeStamp';
import NotificationBadge from './NotificationBadge';
import CAColors from '../common/CAColors';
import CAStyleSheet from '../common/CAStyleSheet';
import profilePhotoPlaceholder from '../assets/img/profile_photo_placeholder.png';

/* Constants
============================================================================= */
const CHAT_CARD_HEIGHT = 80;

/** ============================================================================
<ChatCard
  [profilePhoto]={string}
  name={string}
  latestMessage={{
    text: string,
    createdAt: Date
  }}
  unRead={number}
/>
--------------------------------------------------------------------------------
Displays information about a chat
@param { string } [profilePhoto] - The photo of the person the user is talking
@param { string } name - The name of the person the user is talking to
@param { object } latestMessage - The latest message of the chat
@param { string } unRead - The number of unRead messages
============================================================================= */
type Props = {
  profilePhoto?: string,
  name: string,
  latestMessage: {
    text: string,
    createdAt: Date
  },
  unRead: number
};
class ChatCard extends Component<Props> {
  static __cards__: Function;

  static defaultProps = {
    unRead: 0
  };

  render() {
    const { profilePhoto, name, latestMessage, unRead } = this.props;
    return (
      <View style={styles.chatCard}>
        <ProfilePhoto
          profilePhoto={profilePhoto}
          name={name}
          style={styles.profilePhoto}
        />

        <View style={styles.chatInfo}>
          <View style={styles.heading}>
            <Text style={styles.name}>{name}</Text>

            <TimeStamp
              date={latestMessage.createdAt}
              style={unRead > 0 ? styles.timeStamp : {}}
            />
          </View>

          <View style={styles.body}>
            <Text
              style={styles.latestMessage}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {latestMessage.text}
            </Text>

            <NotificationBadge
              noOfNotifications={unRead}
              style={styles.notificationBadge}
            />
          </View>
        </View>
      </View>
    );
  }
}

/* StyleSheet
============================================================================= */
const styles = CAStyleSheet.create({
  chatCard: {
    height: CHAT_CARD_HEIGHT,
    backgroundColor: CAColors.white,
    alignItems: 'center',
    flexDirection: 'row'
  },
  profilePhoto: {
    marginLeft: 15
  },
  chatInfo: {
    height: CHAT_CARD_HEIGHT,
    flex: 1,
    margin: 10,
    borderBottomWidth: 1,
    borderColor: CAColors.gallery,
    justifyContent: 'center'
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold'
  },
  timeStamp: {
    color: CAColors.forestGreen
  },
  latestMessage: {
    color: CAColors.oxfordBlue,
    flex: 0.95
  }
});

/* Playground Cards - the different states of ChatCard
============================================================================= */
ChatCard.__cards__ = define => {
  let anHourAgo = new Date();
  anHourAgo.setHours(anHourAgo.getHours() - 1);

  let aDayAgo = new Date();
  aDayAgo.setDate(aDayAgo.getDate() - 1);

  let twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  define('Simple', () => {
    return (
      <ChatCard
        profilePhoto="https://placekitten.com/60/60"
        name="Alex Stone"
        latestMessage={{
          text: 'Hey whats up?',
          createdAt: aDayAgo
        }}
        unRead={10}
      />
    );
  });

  define('With notification over 99', () => {
    return (
      <ChatCard
        name="Alex Stone"
        latestMessage={{
          text: 'Hey man how is it going? Long time no see.',
          createdAt: anHourAgo
        }}
        unRead={100}
      />
    );
  });

  define('With truncated latest message text', () => {
    return (
      <ChatCard
        name="Alex Stone"
        latestMessage={{
          text: 'Hey man how is it going? Long time no see.',
          createdAt: aDayAgo
        }}
      />
    );
  });

  define('With the date as a timestamp and a notification', () => {
    return (
      <ChatCard
        name="Alex Stone"
        latestMessage={{
          text: 'Hey whats up?',
          createdAt: twoDaysAgo
        }}
        unRead={10}
      />
    );
  });
};

/* Export
============================================================================= */
export default ChatCard;
