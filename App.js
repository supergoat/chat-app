// @flow

import React, {Component} from 'react';
import {
  View,
  StatusBar
} from 'react-native';
import Playground from './src/Playground';
import CAHeader from './src/presentational/CAHeader';
import ChatCard from './src/presentational/ChatCard';
import CAColors from './src/common/CAColors';
import CAStyleSheet from "./src/common/CAStyleSheet";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={CAColors.oxfordBlue}
        />
        <CAHeader />
        <ChatCard
          profilePhoto={''}
          name={'Manni Silas'}
          latestMessage={{
            text:'Hey man how is it going? Long time no see. We should catch up.',
            createdAt: new Date()
          }}
          unRead={10}
        />
        <ChatCard
          profilePhoto={''}
          name={'Nikita Chernovolenko'}
          latestMessage={{
            text: 'Yo dude',
            createdAt: new Date(2018, 6, 13, 11, 33, 0, 0)
          }}
          unRead={100}
        />
        <ChatCard
          profilePhoto={''}
          name={'Mariana Netto'}
          latestMessage={{
            text: 'Hey baby',
            createdAt: new Date(2018, 6, 12, 11, 33, 0, 0)
          }}
        />
        {/* <Playground /> */}
      </View>
    );
  }
}

const styles = CAStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CAColors.white
  },
});
