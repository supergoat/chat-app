// @flow
import React, { Component } from 'react';
import { Text } from 'react-native';
import CAColors from "../common/CAColors";
import CAStyleSheet from "../common/CAStyleSheet";
import { getTimeStamp } from '../common/CAHelpers';

/** ============================================================================
<TimeStamp
  date={Date}
  [style]={object}
/>
--------------------------------------------------------------------------------
Displays the date of the latest message
@param { string } date - The date of the latest message
@param { object } [style] - custom style
============================================================================= */
class TimeStamp extends Component<{
  date: Date,
  style?: { [name: string]: any }
}, {}> {

  render() {
    const { date, style } = this.props;

    return (
      <Text style={[styles.timeStamp, style]}>
        {getTimeStamp(date)}
      </Text>
    )
  }
}

/* StyleSheet
============================================================================= */
const styles = CAStyleSheet.create({
  timeStamp: {
    color: CAColors.oxfordBlue,
    fontSize: 12
  },
});


/* Export
============================================================================= */
export default TimeStamp;
