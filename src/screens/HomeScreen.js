// @flow
import React, {Component} from 'react';
import {
  StatusBar,
  View
} from 'react-native';
import type { NavigationScreenProp } from 'react-navigation';
import CAHeader from '../presentational/CAHeader';

import ChatCard from '../presentational/ChatCard';
import CAColors from '../common/CAColors';
import CAStyleSheet from "../common/CAStyleSheet";

/** ============================================================================
<HomeScreen />
--------------------------------------------------------------------------------
The home screen
============================================================================= */
type Props = {
  navigation: NavigationScreenProp
};
class HomeScreen extends Component<Props> {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <CAHeader />
        <ChatCard
          profilePhoto={''}
          name={'Manni Silas'}
          latestMessage={{
            text:'Hey man how is it going? Long time no see. We should catch up.',
            createdAt: new Date()
          }}
          unRead={10}
          onPress={() => navigation.navigate('Chat')}
        />
        <ChatCard
          profilePhoto={''}
          name={'Nikita Chernovolenko'}
          latestMessage={{
            text: 'Yo dude',
            createdAt: new Date(2018, 6, 13, 11, 33, 0, 0)
          }}
          unRead={100}
          onPress={() => navigation.navigate('Chat')}
        />
        <ChatCard
          profilePhoto={''}
          name={'Mariana Netto'}
          latestMessage={{
            text: 'Hey baby',
            createdAt: new Date(2018, 6, 12, 11, 33, 0, 0)
          }}
          onPress={() => navigation.navigate('Chat')}
        />
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
  },
});

/* Export
============================================================================= */
export default HomeScreen;
