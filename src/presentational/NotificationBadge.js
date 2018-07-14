// @flow
import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import CAColors from '../common/CAColors';
import CAStyleSheet from '../common/CAStyleSheet';

/* Constants
============================================================================= */
const BADGE_HEIGHT = 24;
const BADGE_MIN_WIDTH = BADGE_HEIGHT;
const BADGE_BORDER_RADIUS = BADGE_HEIGHT / 2;

/** ============================================================================
<NotificationBadge
  noOfNotifications={number}
  [style]={object}
/>
--------------------------------------------------------------------------------
Displays the number of notifications to the user
@param { string } noOfNotifications - The number of notifications
@param { object } [style] - custom style
============================================================================= */
type Props = {
  noOfNotifications: number,
  style?: { [name: string]: any }
};
class NotificationBadge extends Component<Props> {
  static __cards__: Function;

  render() {
    const { noOfNotifications, style } = this.props;
    return (
      noOfNotifications > 0 && (
        <View style={[styles.badge, style]}>
          <Text style={styles.badgeNumber}>
            {noOfNotifications < 100 ? noOfNotifications : '+99'}
          </Text>
        </View>
      )
    );
  }
}

/* StyleSheet
============================================================================= */
const styles = CAStyleSheet.create({
  badge: {
    backgroundColor: CAColors.apple,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: BADGE_MIN_WIDTH,
    height: BADGE_HEIGHT,
    borderRadius: BADGE_BORDER_RADIUS,
    alignSelf: 'flex-start' // prevent expanding to fill space
  },
  badgeNumber: {
    color: CAColors.white,
    fontSize: 10,
    paddingRight: 5,
    paddingLeft: 5,
    fontWeight: 'bold'
  }
});

/* Playground Cards - the different states of NotificationBadge
============================================================================= */
NotificationBadge.__cards__ = define => {
  define('Number of notifications less than 1', () => {
    return <NotificationBadge noOfNotifications={0} />;
  });

  define('Number of notifications less than 100', () => {
    return <NotificationBadge noOfNotifications={10} />;
  });

  define('Number of notifications over 99', () => {
    return <NotificationBadge noOfNotifications={100} />;
  });
};

/* Export
============================================================================= */
export default NotificationBadge;
